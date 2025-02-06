"use client";

import React, { useState } from "react";
import { Logo } from "@/assets/common";
import Container from "./Container";
import Link from "next/link";
import { NavbarDropDown } from "../feature";
import { servicesData } from "@/data/services/servicesData";
import { industriesData } from "@/data/industries/industriesData";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ position: "sticky", zIndex: 9999 }}>
      <div className='bg_secondry' data-aos='fade-down'>
        <Container className='main'>
          <div className='main_nav'>
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
                <Link href={"/success_stories"}>Portfolio</Link>
                <Link href={"/blogs"}>Blogs</Link>
                <Link href={"/aboutus"}>About Us</Link>
                <Link href={"/contactus"}>Contact Us</Link>
              </div>
              {isMenuOpen ? (
                <figure onClick={toggleMenu} style={{ cursor: "pointer" }}>
                  <IoClose />
                </figure>
              ) : (
                <figure onClick={toggleMenu} style={{ cursor: "pointer" }}>
                  <IoMenuOutline />
                </figure>
              )}
            </nav>

            {isMenuOpen && (
              <motion.div
                initial={{ x: "0rem", opacity: 0 }}
                animate={{ x: "0rem", opacity: 1 }}
                className='navbarMobileMenu bg_secondry'
                style={{ zIndex: 999999999999 }}
              >
                <div className=''>
                  <Link href={"/"} onClick={toggleMenu}>
                    Home
                  </Link>
                  <NavbarDropDown
                    name='Services'
                    mainRoute='services'
                    data={servicesData}
                    onLinkClick={toggleMenu}
                  />
                  <NavbarDropDown
                    name='Industries'
                    mainRoute='industries'
                    data={industriesData}
                    onLinkClick={toggleMenu}
                  />
                  <Link href={"/success_stories"} onClick={toggleMenu}>
                    Portfolio
                  </Link>
                  <Link href={"/blogs"} onClick={toggleMenu}>
                    Blogs
                  </Link>
                  <Link href={"/aboutus"} onClick={toggleMenu}>
                    About Us
                  </Link>
                  <Link href={"/contactus"} onClick={toggleMenu}>
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
