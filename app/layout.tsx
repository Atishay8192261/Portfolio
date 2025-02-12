import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Atishay Jain - Entrepreneur | Software Engineer & AI Enthusiast | Portfolio",
  description:
    "Explore Atishay Jain's portfolio - an SJSU Computer Science student with expertise in software engineering, AI, full-stack development, and genomics research. View projects, experience, and technical skills.",
  keywords: [
    "Atishay Jain",
    "Software Engineer",
    "AI Enthusiast",
    "Full-Stack Developer",
    "Genomics Research",
    "B2B Software",
    "Next.js Developer",
    "Spring Boot Developer",
    "Kotlin Developer",
    "Machine Learning Engineer",
    "LLM Projects",
    "Tech Portfolio",
    "Open Source Contributor",
    "GitHub Projects",
    "San Jose State University",
    "SJSU Computer Science",
    "AI in Genomics",
    "Software Engineering Intern",
    "Veena Agencies",
    "Atishay Jain Portfolio",
    "Software Development Blog",
  ],
  authors: [{ name: "Atishay Jain" }],
  robots: "index, follow",
  openGraph: {
    title: "Atishay Jain - Software Engineer & AI Enthusiast | Portfolio",
    description:
      "A passionate software engineer and AI enthusiast from San Jose State University, building innovative solutions in full-stack development, AI, and genomics research.",
    type: "website",
    url: "https://www.atie.dev",
    images: [{ url: "https://www.atie.dev/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atishay Jain - Software Engineer & AI Enthusiast",
    description:
      "Portfolio of Atishay Jain, a software engineer with expertise in AI, full-stack development, and genomics research. View projects, skills, and experience.",
    images: [{ url: "https://www.atie.dev/twitter-image.jpg" }],
    creator: "@AtishayJain19",
  },
  alternates: {
    canonical: "https://www.atie.dev",
  },
  metadataBase: new URL("https://www.atie.dev"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
