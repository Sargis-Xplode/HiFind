"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, CSSProperties } from "react";
import checkAuth from "../middleware/auth";
import { useLocale } from "next-intl";

import { Roboto } from "next/font/google";

import "../globals.scss";

import ClipLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { push } = useRouter();
    const localActive = useLocale();
    // const messages = useMessages();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);

        if (!token) {
            push(`/${localActive}/admin`);
        } else {
            checkAuth(token).then((data) => {
                if (data.success) {
                    setLoading(false);
                } else {
                    setLoading(true);
                    push(`/${localActive}/admin`);
                }
            });
        }
    }, []);

    return (
        <>
            {loading && (
                <div className="sweet-loading">
                    <ClipLoader
                        color={"#ec008b"}
                        loading={loading}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        speedMultiplier={1}
                    />
                </div>
            )}
            {/* <NextIntlClientProvider messages={messages}>{!loading && children}</NextIntlClientProvider> */}
            {!loading && children}
        </>
    );
}
