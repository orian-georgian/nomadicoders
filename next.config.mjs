import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const distDir =
  process.env.NEXT_DIST_DIR ||
  (process.env.NODE_ENV === "production" ? ".next-build" : undefined);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(distDir
    ? {
        distDir,
        typescript: {
          tsconfigPath: "tsconfig.next-build.json"
        }
      }
    : {})
};

export default withNextIntl(nextConfig);
