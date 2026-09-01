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

// The outer wrapper used to be <div style={{ position: "sticky", zIndex: 9999 }}>.
// It had no `top`, so it never actually stuck — the bar scrolled away like any
// other element. Removing it matches both the guide, whose header is not
// sticky, and what the site already did. Because a sticky element IS a
// containing block for absolutely positioned descendants, .main_nav now takes
// position: relative so the mobile drawer keeps anchoring where it did.
//
// The drawer's inline zIndex: 999999999999 is gone too; it lives in the
// stylesheet on a sane scale now.

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='site-header'>
      <Container className='main'>
        <div className='main_nav'>
          <nav className='site-nav'>
            <Link href={"/"}>
              <Logo />
            </Link>
            <div>
              <Link href={"/"} className='flink'>
                Home
              </Link>
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
              {/* Portfolio hidden 2 Jun 2026: /success_stories currently serves legacy Pixelette Technologies content. Restore this link when real Pixelette Marketing case studies are published. */}
              <Link href={"/blog-list"} className='flink'>
                Blogs
              </Link>
              <Link href={"/aboutus"} className='flink'>
                About Us
              </Link>
              <Link href={"/contactus"} className='flink'>
                Contact Us
              </Link>
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
              className='navbarMobileMenu'
            >
              <div className=''>
                <Link href='/' onClick={toggleMenu} className='flink'>
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
                {/* The drawer deliberately omits Blogs. It sits in this
                    commented-out block alongside the hidden Portfolio link,
                    and the desktop/mobile asymmetry is a content difference,
                    not a styling one. Do not "fix" it here. */}
                {/* <Link href={"/success_stories"} onClick={toggleMenu}>
                    Portfolio
                  </Link>
                  <Link href={"/blogs"} onClick={toggleMenu}>
                    Blogs
                  </Link> */}
                <Link href='/aboutus' onClick={toggleMenu} className='flink'>
                  About Us
                </Link>
                <Link href='/contactus' onClick={toggleMenu} className='flink'>
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}
