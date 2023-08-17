/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
	swcMinify: true,
	images: {
    domains: [
			'lh5.googleusercontent.com',
			'yusjougmsdnhcsksadaw.supabase.co'
		],
  },
	pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
	async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
