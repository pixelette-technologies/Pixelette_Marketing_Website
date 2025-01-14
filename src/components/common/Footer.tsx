import { Facebook, Github, Insta, Twitter } from "@/assets/common";
import { Text } from "../feature";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className='bg_primary'>
      <Container className='main'>
        <section>
          <Text className='secondry color_white'>
            © 2024 Pixelette Marketing. All rights reserved.
          </Text>
          <div>
            <Insta />
            <Twitter />
            <Facebook />
            <Github />
          </div>
        </section>
      </Container>
    </footer>
  );
}
