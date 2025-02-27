import { Facebook, Github, Insta, Twitter } from "@/assets/common";
import { Text } from "../feature";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className='bg_primary py-4'>
      <Container className='main flex justify-between items-center'>
        <Text className='secondry color_white'>
          © 2024 Pixelette Marketing. All rights reserved.
        </Text>
        <div className='flex gap-4'>
          <a href='https://instagram.com' aria-label='Instagram'>
            <Insta />
          </a>
          <a href='https://twitter.com' aria-label='Twitter'>
            <Twitter />
          </a>
          <a href='https://facebook.com' aria-label='Facebook'>
            <Facebook />
          </a>
          <a href='https://github.com' aria-label='Github'>
            <Github />
          </a>
        </div>
      </Container>
    </footer>
  );
}
