/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    GITHUB_CLIENT_ID: '4470e9957350b5081c34',
    GITHUB_CLIENT_SECRET: 'c05ac76e92a7bce2a1ee412fb11439539471a083',
    SECRET: 'some secret',
    NEXT_BASE_URL: 'http://localhost:3000',
  },
}

module.exports = nextConfig
