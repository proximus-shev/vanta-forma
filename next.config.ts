import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localDevOrigins = Object.values(networkInterfaces())
  .flat()
  .filter(
    (network): network is NonNullable<typeof network> =>
      Boolean(network && network.family === "IPv4" && !network.internal),
  )
  .map((network) => network.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: localDevOrigins,
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
