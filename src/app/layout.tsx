import type { Metadata } from "next";
import "../scss/main.scss";
import { AnimationsLayout, Footer, Navbar } from "@/components/common";

export const metadata: Metadata = {
  title: "Pixelette Marketing",
  description: "Pixelette Marketing Website"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' />
      </head>
      <body>
        <AnimationsLayout>
          <div
            style={{
              display: "flex",
              // position: "relative",
              flexDirection: "column"
            }}
          >
            <Navbar />
            <div>{children}</div>
            <Footer />
          </div>
        </AnimationsLayout>
      </body>
    </html>
  );
}
