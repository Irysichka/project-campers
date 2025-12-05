const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        // optional:
        // pathname: "/img/campers-test-task/**",
      },
    ],
  },
};

export default nextConfig;
