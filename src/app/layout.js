import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Easwar R | Web Developer",
  description: "Web Developer Portfolio showcasing Full-Stack Web Applications and MERN Stack Systems.",
  keywords: ["Easwar R", "Web Developer", "Full Stack Developer", "Next.js", "React", "Node.js", "MongoDB", "Portfolio"],
  authors: [{ name: "Easwar R" }],
  openGraph: {
    title: "Easwar R | Web Developer",
    description: "Explore interactive full-stack projects, responsive web platforms, and verified technical credentials.",
    url: "https://portfolio-website-eight-sage-16.vercel.app",
    siteName: "Easwar R Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-teal-500/20 selection:text-teal-900">
        {children}
      </body>
    </html>
  );
}