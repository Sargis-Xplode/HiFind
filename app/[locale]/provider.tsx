"use client";
import React, { createContext } from "react";

export const SearchContext = createContext({
    submittedSearchText: "",
    searchActive: false,
});

export default function ThemeProvider({ children, submittedSearchText, searchActive }: any) {
    return <SearchContext.Provider value={{ submittedSearchText, searchActive }}>{children}</SearchContext.Provider>;
}
