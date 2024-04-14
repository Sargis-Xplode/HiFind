"use client";
import "../globals.scss";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useState } from "react";
import ThemeProvider from "../provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [searchText, setSearchText] = useState("");
    const [submittedSearchText, setSubmittedSearchText] = useState("");
    const [searchActive, setSearchActive] = useState(false);

    return (
        <>
            <ThemeProvider
                submittedSearchText={submittedSearchText}
                searchActive={searchActive}
            >
                <Header
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setSearchActive={setSearchActive}
                    setSubmittedSearchText={setSubmittedSearchText}
                ></Header>
                {children}
                <Footer></Footer>
            </ThemeProvider>
        </>
    );
}
