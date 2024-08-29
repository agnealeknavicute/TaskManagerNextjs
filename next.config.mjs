import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['tsx', 'ts'],
};

export default withNextIntl(nextConfig);
