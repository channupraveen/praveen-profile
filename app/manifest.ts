import type { MetadataRoute } from "next";

// Lets visitors "Add to Home Screen" and open the site like an app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Praveen Kumar — Software Engineer & AI Engineer",
    short_name: "Praveen Kumar",
    description: "Software Engineer building AI-powered products and scalable systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f5f7",
    theme_color: "#f4f5f7",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
