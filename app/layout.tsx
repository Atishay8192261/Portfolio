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
  title: {
    default: "Atishay Jain — Software Engineer | atie.dev",
    template: "%s | Atishay Jain",
  },
  description:
    "Atishay Jain (atie) is a software engineer and SSD Firmware Intern at Micron, working on simulation and analysis in the storage stack. CS grad student at Santa Clara University, BS in CS from San Jose State. Based in the Bay Area.",
  keywords: [
    "Atishay Jain",
    "Atishay Jain portfolio",
    "Atishay Jain software engineer",
    "Atishay Jain Micron",
    "Atishay Jain Santa Clara University",
    "Atishay Jain SCU",
    "Atishay Jain SJSU",
    "Atishay Jain San Jose State",
    "atie",
    "atie.dev",
    "software engineer Bay Area",
    "SSD firmware engineer",
  ],
  authors: [{ name: "Atishay Jain", url: "https://www.atie.dev" }],
  creator: "Atishay Jain",
  publisher: "Atishay Jain",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Atishay Jain — Software Engineer",
    description:
      "Software engineer and SSD Firmware Intern at Micron. CS grad student at Santa Clara University. Based in the Bay Area.",
    type: "profile",
    url: "https://www.atie.dev",
    siteName: "Atishay Jain",
    locale: "en_US",
    images: [
      {
        url: "https://www.atie.dev/profile.jpg",
        width: 512,
        height: 640,
        alt: "Atishay Jain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atishay Jain — Software Engineer",
    description:
      "Software engineer and SSD Firmware Intern at Micron. CS grad student at Santa Clara University.",
    images: ["https://www.atie.dev/profile.jpg"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Atishay Jain",
    alternateName: "atie",
    url: "https://www.atie.dev",
    image: "https://www.atie.dev/profile.jpg",
    sameAs: [
      "https://github.com/Atishay8192261",
      "https://linkedin.com/in/atishayjain19",
      "https://medium.com/@atishayjain8192261",
    ],
    jobTitle: "SSD Firmware Intern",
    worksFor: {
      "@type": "Organization",
      name: "Micron Technology",
      sameAs: "https://www.micron.com",
    },
    homeLocation: {
      "@type": "Place",
      name: "San Francisco Bay Area, California",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Santa Clara University",
        sameAs: "https://www.scu.edu",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "San Jose State University",
        sameAs: "https://www.sjsu.edu",
      },
    ],
    knowsAbout: [
      "Software Engineering",
      "SSD Firmware",
      "Storage Systems",
      "Distributed Systems",
      "Machine Learning",
      "Java",
      "Python",
      "TypeScript",
    ],
    email: "mailto:atishayjain@atie.dev",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
