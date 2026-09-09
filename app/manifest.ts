import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hemisphere",
    short_name: "Hemisphere",
    description:
      "Personal Hemi-Sync lab: binaural sessions, Gateway-style practice, and local progress.",
    start_url: "/",
    display: "standalone",
    background_color: "#15202b",
    theme_color: "#15202b",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
