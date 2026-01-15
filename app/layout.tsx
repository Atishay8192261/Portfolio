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
  title: "Atishay Jain - Software Engineer & AI Enthusiast | Portfolio",
  description:
    "Explore Atishay Jain's portfolio - a Software Engineer and AI Enthusiast currently pursuing MS in CS from Santa Clara University (expected graduation June 2027) with BS in CS from SJSU. Expertise in software engineering, AI, full-stack development, and machine learning. View projects, experience, and technical skills.",
  keywords: [
    "Atishay Jain",
    "Software Engineer",
    "AI Enthusiast",
    "Full-Stack Developer",
    "Machine Learning Engineer",
    "B2B Software",
    "Next.js Developer",
    "Spring Boot Developer",
    "Kotlin Developer",
    "LLM Projects",
    "Tech Portfolio",
    "Open Source Contributor",
    "GitHub Projects",
    "Santa Clara University",
    "SCU Computer Science",
    "San Jose State University",
    "SJSU Computer Science",
    "Atishay Jain Portfolio",
    "Software Engineering",
    "AI Solutions",
  ],
  authors: [{ name: "Atishay Jain" }],
  robots: "index, follow",
  openGraph: {
    title: "Atishay Jain - Software Engineer & AI Enthusiast | Portfolio",
    description:
      "A passionate software engineer and AI enthusiast currently pursuing Master's in Computer Science from Santa Clara University (expected graduation June 2027) with Bachelor's from San Jose State University. Building innovative solutions in full-stack development and AI.",
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
