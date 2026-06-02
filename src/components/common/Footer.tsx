import { Insta, LinkedIn } from "@/assets/common";
import { Text } from "../feature";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className='bg_primary py-4'>
      <Container className='main flex justify-between items-center'>
        <Text className='secondry color_white'>
          © 2026 Pixelette Marketing. All rights reserved.
        </Text>
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
            <LinkedIn />
          </a>
        </div>
      </Container>
    </footer>
  );
}
