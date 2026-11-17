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
  publicSectorGroups,
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
  // Public sector's first menu item is already the overview — skip the
  // separate hub row so the drawer does not list it twice.
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
                name='What we do'
                mainRoute='services'
                groups={whatWeDoGroups}
              />
              <NavbarDropDown
                name='Public sector'
                mainRoute='public-sector'
                groups={publicSectorGroups}
              />
              <Link href={"/industries"} className='flink'>
                Industries
              </Link>
              <Link href={"/insights"} className='flink'>
                Insights
              </Link>
              <Link href={"/about"} className='flink'>
                About
              </Link>
              <Link href={"/contactus"} className='flink'>
                Contact
              </Link>
              <Link href={navCta.to} className='site-nav__cta'>
                <Button className='primary'>{navCta.label}</Button>
              </Link>
            </div>
            <details className='navDrawer' ref={drawer}>
              <summary className='navDrawer__toggle'>
                Menu
                <IoIosArrowDown className='navDrawer__chev' aria-hidden='true' />
              </summary>

              <div className='navDrawer__panel'>
                <DrawerGroup
                  label='What we do'
                  hub='/services'
                  hubLabel='What we do overview'
                  groups={whatWeDoGroups}
                  onNavigate={closeDrawer}
                />
                <DrawerGroup
                  label='Public sector'
                  hub='/public-sector'
                  hubLabel='Public and civic overview'
                  groups={publicSectorGroups}
                  onNavigate={closeDrawer}
                />

                <Link
                  href='/industries'
                  className='navDrawer__link'
                  onClick={closeDrawer}
                >
                  Industries
                </Link>
                <Link
                  href='/insights'
                  className='navDrawer__link'
                  onClick={closeDrawer}
                >
                  Insights
                </Link>
                <Link
                  href='/about'
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

                <Link
                  href={navCta.to}
                  className='navDrawer__cta'
                  onClick={closeDrawer}
                >
                  <Button className='primary'>{navCta.label}</Button>
                </Link>
              </div>
            </details>
          </nav>
        </div>
      </Container>
    </div>
  );
}
