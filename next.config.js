const intercept = require("intercept-stdout")


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', '127.0.0.1'],
    }
}

function interceptStdout(text) {
    if (text.includes("Duplicate atom key")) {
        return ""
    }
    return text
}

if (process.env.NODE_ENV === "development") {
    intercept(interceptStdout)
}

module.exports = nextConfig
