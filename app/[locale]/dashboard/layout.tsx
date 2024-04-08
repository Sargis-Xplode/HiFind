"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import checkAuth from "../middleware/auth";
import { useLocale } from "next-intl";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { push } = useRouter();
    const localActive = useLocale();

    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            push(`/${localActive}/admin`);
        } else {
            const res = checkAuth(token);
            console.log(res);

            if (!res.success) {
                // push(`/${localActive}/admin`);
            }
        }
    }, []);
    return (
        <html lang="en">
            <body>
                {isPending && <p>Loading</p>}
                {!isPending && children}
            </body>
        </html>
    );
}
