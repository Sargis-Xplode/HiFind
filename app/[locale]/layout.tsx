import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

const roboto = Montserrat({ weight: "400", subsets: ["latin"] });

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
            <body className={roboto.className}>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
