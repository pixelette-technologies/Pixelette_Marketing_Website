"use client";

import React, { useState } from "react";
import { LogoBlack } from "@/assets/common";
import Container from "./Container";
import Link from "next/link";
import { Button, NavbarDropDown } from "../feature";
import {
  navCta,
  whatWeDoGroups,
  whoWeHelpGroups
} from "@/data/navigation";
import { IoMenuOutline, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

// The outer wrapper used to be <div style={{ position: "sticky", zIndex: 9999 }}>.
// It had no `top`, so it never actually stuck — the bar scrolled away like any
// other element. Because a sticky element IS a containing block for absolutely
// positioned descendants, .main_nav takes position: relative so the mobile
// drawer keeps anchoring where it did.
//
// The drawer's inline zIndex: 999999999999 is gone too; it lives in the
// stylesheet on a sane scale now.
//
// --- 8 Sep 2026 brief -------------------------------------------------------
// The brief's navigation: Home | What We Do | Who We Help | Results | Insights
// | About | Contact, plus a primary button.
//
// LABELS CHANGE, URLS DO NOT. The brief specifies labels and never paths, and
// renaming /services and /industries would mean redirects, canonicals, sitemap
// and breadcrumb changes across thirteen indexed pages to buy nothing a
// visitor can see.
//
// Results is the new /results page. It replaces the Portfolio link that was
// hidden on 2 Jun 2026 because /success_stories serves legacy Pixelette
// Technologies content — that route stays hidden and stays out of the sitemap.

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
              <LogoBlack />
            </Link>
            <div>
              <Link href={"/"} className='flink'>
                Home
              </Link>
              <NavbarDropDown
                name='What We Do'
                mainRoute='services'
                groups={whatWeDoGroups}
              />
              <NavbarDropDown
                name='Who We Help'
                mainRoute='industries'
                groups={whoWeHelpGroups}
              />
              <Link href={"/results"} className='flink'>
                Results
              </Link>
              <Link href={"/blog-list"} className='flink'>
                Insights
              </Link>
              <Link href={"/aboutus"} className='flink'>
                About
              </Link>
              <Link href={"/contactus"} className='flink'>
                Contact
              </Link>
              <Link href={navCta.to} className='site-nav__cta'>
                <Button className='primary'>{navCta.label}</Button>
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
                  name='What We Do'
                  mainRoute='services'
                  groups={whatWeDoGroups}
                  onLinkClick={toggleMenu}
                />
                <NavbarDropDown
                  name='Who We Help'
                  mainRoute='industries'
                  groups={whoWeHelpGroups}
                  onLinkClick={toggleMenu}
                />
                {/* The drawer used to omit Insights deliberately, alongside the
                    hidden Portfolio link. The brief puts both Results and
                    Insights in the top level, so the asymmetry goes: the
                    drawer now carries exactly what the bar carries. */}
                <Link href='/results' onClick={toggleMenu} className='flink'>
                  Results
                </Link>
                <Link href='/blog-list' onClick={toggleMenu} className='flink'>
                  Insights
                </Link>
                <Link href='/aboutus' onClick={toggleMenu} className='flink'>
                  About
                </Link>
                <Link href='/contactus' onClick={toggleMenu} className='flink'>
                  Contact
                </Link>
                <Link
                  href={navCta.to}
                  onClick={toggleMenu}
                  className='site-nav__cta'
                >
                  <Button className='primary'>{navCta.label}</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
}
