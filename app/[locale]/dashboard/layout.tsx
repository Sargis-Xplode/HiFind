"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import checkAuth from "../middleware/auth";
import { useLocale } from "next-intl";

import { Roboto } from "next/font/google";

import "../globals.scss";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { push } = useRouter();
    const localActive = useLocale();

    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            push(`/${localActive}/admin`);
        } else {
            checkAuth(token).then((data) => {
                console.log(data);
                if (data.success) {
                    setIsPending(false);
                } else {
                    push(`/${localActive}/admin`);
                }
            });
        }
    }, []);
    return (
        <html lang="en">
            <body className={roboto.className}>
                {isPending && <p>Loading</p>}
                {!isPending && children}
            </body>
        </html>
    );
}
