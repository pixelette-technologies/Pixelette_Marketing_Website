import { Logo } from "@/assets/common";
import Container from "./Container";

export default function Navbar() {
  return (
    <>
      <Container className='main'>
        <nav>
          <Logo />
        </nav>
      </Container>
    </>
  );
}
