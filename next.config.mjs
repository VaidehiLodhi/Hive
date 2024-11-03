/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "img.clerk.com"
            },
            {
                protocol : "https",
                hostname : "images.unsplash.com"
            }
        ]
    }
};

export default nextConfig;
