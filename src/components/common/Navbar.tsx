import { Logo } from "@/assets/common";
import Container from "./Container";
import Link from "next/link";
import { NavbarDropDown } from "../feature";
import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";

export default function Navbar() {
  return (
    <div className='bg_secondry'>
      <Container className='main'>
        <nav>
          <Link href={"/"}>
            <Logo />
          </Link>
          <div>
            <Link href={"/"}>Home</Link>
            <NavbarDropDown
              name='Services'
              mainRoute='services'
              data={servicesData}
            />
            <NavbarDropDown
              name='Industries'
              mainRoute='industries'
              data={industriesData}
            />
            <Link href={"/aboutus"}>About Us</Link>
            <Link href={"/contactus"}>Contact Us</Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
