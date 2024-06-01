/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
}

const nextConfig = {
  reactStrictMode: true,
}

export default withPWA(pwaConfig)(nextConfig)
