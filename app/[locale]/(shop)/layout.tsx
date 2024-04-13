"use client";
import "../globals.scss";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { createContext, useState } from "react";

export const SearchContext = createContext({
    submittedSearchText: "",
    searchActive: false,
});

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
            <SearchContext.Provider value={{ submittedSearchText, searchActive }}>
                <Header
                    searchText={searchText}
                    setSearchText={setSearchText}
                    setSearchActive={setSearchActive}
                    setSubmittedSearchText={setSubmittedSearchText}
                ></Header>
                {children}
                <Footer></Footer>
            </SearchContext.Provider>
        </>
    );
}
