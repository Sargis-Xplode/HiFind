"use client";
import "../globals.scss";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header
            // setFilteredShops={setFilteredShops}
            // allShops={shops}
            // setSearchActive={setSearchActive}
            ></Header>
            {children}
            <Footer></Footer>
        </>
    );
}
