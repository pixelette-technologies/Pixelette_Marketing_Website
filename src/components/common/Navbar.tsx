"use client";

import React, { useEffect, useRef } from "react";
import { LogoBlack } from "@/assets/common";
import Container from "./Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, NavbarDropDown } from "../feature";
import {
  navCta,
  whatWeDoGroups,
  type NavGroup
} from "@/data/navigation";
import { IoIosArrowDown } from "react-icons/io";

function DrawerGroup({
  label,
  hub,
  hubLabel,
  groups,
  onNavigate
}: {
  label: string;
  hub: string;
  hubLabel: string;
  groups: NavGroup[];
  onNavigate: () => void;
}) {
  const firstHref = groups[0]?.items[0]?.href;
  const showHub = firstHref !== hub;

  return (
    <details className='navDrawer__group' name='pm-nav-mobile'>
      <summary className='navDrawer__groupSummary'>
        {label}
        <IoIosArrowDown className='navDrawer__chev' aria-hidden='true' />
      </summary>
      <div className='navDrawer__groupBody'>
        {showHub ? (
          <Link href={hub} className='navDrawer__hub' onClick={onNavigate}>
            {hubLabel}
          </Link>
        ) : null}
        {groups.map((group, groupIndex) => (
          <div
            className='navDrawer__sub'
            key={group.label || `drawer-group-${groupIndex}`}
          >
            {group.label ? <p className='eyebrow'>{group.label}</p> : null}
            <ul className='navDrawer__list'>
              {group.items.map(item => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onNavigate}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}

export default function Navbar() {
  const drawer = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  const closeDrawer = () => {
    if (drawer.current) drawer.current.open = false;
  };

  useEffect(closeDrawer, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && drawer.current?.open) {
        closeDrawer();
        drawer.current?.querySelector<HTMLElement>("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className='site-header'>
      <Container className='main'>
        <div className='main_nav'>
          <nav className='site-nav'>
            <Link href={"/"}>
              <LogoBlack />
            </Link>
            <div>
              <NavbarDropDown
                name='What We Do'
                mainRoute='services'
                groups={whatWeDoGroups}
              />
              <Link href={"/industries"} className='flink'>
                Sectors
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
              <Button to={navCta.to} className='primary site-nav__cta'>
                {navCta.label}
              </Button>
            </div>
            <details className='navDrawer' ref={drawer}>
              <summary className='navDrawer__toggle'>
                Menu
                <IoIosArrowDown className='navDrawer__chev' aria-hidden='true' />
              </summary>

              <div className='navDrawer__panel'>
                <DrawerGroup
                  label='What We Do'
                  hub='/services'
                  hubLabel='What We Do overview'
                  groups={whatWeDoGroups}
                  onNavigate={closeDrawer}
                />

                <Link
                  href='/industries'
                  className='navDrawer__link'
                  onClick={closeDrawer}
                >
                  Sectors
                </Link>
                <Link
                  href='/blog-list'
                  className='navDrawer__link'
                  onClick={closeDrawer}
                >
                  Insights
                </Link>
                <Link
                  href='/aboutus'
                  className='navDrawer__link'
                  onClick={closeDrawer}
                >
                  About
                </Link>
                <Link
                  href='/contactus'
                  className='navDrawer__link'
                  onClick={closeDrawer}
                >
                  Contact
                </Link>

                <Button
                  to={navCta.to}
                  className='primary navDrawer__cta'
                  onClick={closeDrawer}
                >
                  {navCta.label}
                </Button>
              </div>
            </details>
          </nav>
        </div>
      </Container>
    </div>
  );
}
