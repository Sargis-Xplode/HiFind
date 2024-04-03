import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    // A list of all locales that are supported
    locales: ["hy", "en"],

    // Used when no locale matches
    defaultLocale: "hy",
});

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(hy|en)/:path*"],
};
