/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    headers: [
        {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_APP_URL,
        },
    ],
};

module.exports = nextConfig;
