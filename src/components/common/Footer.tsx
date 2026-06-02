import { Facebook, Insta, LinkedInIcon } from "@/assets/common";
import { Text } from "../feature";
import Container from "./Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg_primary py-4'>
      <Container className='main flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <Text className='secondry color_white'>
            © 2026 Pixelette Marketing. All rights reserved.
          </Text>
          <Link
            href='/cookie-policy'
            className='secondry color_white'
            style={{ textDecoration: "underline" }}
          >
            Cookie Policy
          </Link>
        </div>
        <div className='flex gap-4'>
          <a
            href='https://www.instagram.com/pixelettemarketing'
            aria-label='Instagram'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Insta />
          </a>
          <a
            href='https://www.linkedin.com/company/pixelette-marketing-uk/'
            aria-label='LinkedIn'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkedInIcon />
          </a>
          <a
            href='https://www.facebook.com/p/Pixelette-Marketing-100095390971622/'
            aria-label='Facebook'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Facebook />
          </a>
        </div>
      </Container>
    </footer>
  );
}
