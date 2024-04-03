import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "HiFind",
    description: "Developed By Xplode LLC",
};

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const messages = useMessages();

    return (
        <html
            lang={locale}
            suppressHydrationWarning={true}
        >
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
