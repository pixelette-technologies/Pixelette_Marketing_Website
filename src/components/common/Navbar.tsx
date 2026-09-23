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
  whoWeHelpGroups,
  type NavGroup
} from "@/data/navigation";
import { IoIosArrowDown } from "react-icons/io";

// The outer wrapper used to be <div style={{ position: "sticky", zIndex: 9999 }}>.
// It had no `top`, so it never actually stuck — the bar scrolled away like any
// other element. Because a sticky element IS a containing block for absolutely
// positioned descendants, .main_nav took position: relative so the mobile
// drawer kept anchoring where it did. That is REVERSED as of 23 Sep 2026: the
// drawer is meant to span the screen, so it anchors to .site-header instead and
// .main_nav is static again. See _navbar.scss.
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

// --- 23 Sep 2026: the drawer is native HTML -----------------------------------
// Rebuilt to the Pixelette Technologies drawer, which is what it was asked to
// match. The whole thing is <details>/<summary> and carries NO JavaScript state:
// the panel opens because a <summary> was activated, and the groups behave as an
// accordion because they share a `name`, which is the HTML spec's own exclusive
// -disclosure mechanism. The previous drawer was useState + framer-motion.
//
// WHAT THAT BUYS BEYOND LESS CODE. <summary> is focusable and responds to Enter
// and Space with no handler, so the drawer is keyboard-operable by construction
// rather than by a rule somebody has to remember. It also renders open-able
// before hydration, which the state version could not.
//
// THE ONE THING HTML DOES NOT DO is close on navigation. Theirs is served
// per-page so a click reloads the document; ours routes on the client, which
// would leave the panel open over the new page. Hence the ref and the effect
// below, and nothing else.
//
// The five capabilities stay LABELS inside the What We Do panel rather than
// becoming rows of their own. Theirs are three pillars that each own a page;
// ours are five capabilities over eight service pages, and promoting them would
// have made three rows that open to a single link each. Settled on instruction
// 23 Sep, against the row-for-row alternative.
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
  // A single group whose label only repeats the row above it earns no
  // subheading — Who We Help is the case today. The rule is the house one:
  // ship the pattern without the missing element rather than draw furniture.
  const showLabels = groups.length > 1;

  return (
    <details className='navDrawer__group' name='pm-nav-mobile'>
      <summary className='navDrawer__groupSummary'>
        {label}
        <IoIosArrowDown className='navDrawer__chev' aria-hidden='true' />
      </summary>
      <div className='navDrawer__groupBody'>
        {/* The hub link first, as theirs does with "<Group> overview". Ours
            are real pages — /services and /industries — and the reason they
            are here is the same reason the desktop trigger became a link:
            without it both hubs are in the sitemap and reachable from nowhere
            in the navigation. */}
        <Link href={hub} className='navDrawer__hub' onClick={onNavigate}>
          {hubLabel}
        </Link>
        {groups.map(group => (
          <div className='navDrawer__sub' key={group.label}>
            {showLabels && <p className='eyebrow'>{group.label}</p>}
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

  // Close on a completed client-side navigation. The onClick on each link
  // closes it on the way out, which covers the ordinary case; this covers the
  // rest — the back button, a redirect, and a link to the route already open,
  // where onClick fires but no navigation follows.
  useEffect(closeDrawer, [pathname]);

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
            {/* A LABELLED PILL, NOT A HAMBURGER, which is the reference's own
                choice and the better one: "Menu" needs no learning and the
                bordered box gives the control an edge to aim at. The 44px
                minimum is the tap target the rest of the site already uses. */}
            <details className='navDrawer' ref={drawer}>
              <summary className='navDrawer__toggle'>
                Menu
                <IoIosArrowDown className='navDrawer__chev' aria-hidden='true' />
              </summary>

              <div className='navDrawer__panel'>
                <DrawerGroup
                  label='What We Do'
                  hub='/services'
                  hubLabel='What we do overview'
                  groups={whatWeDoGroups}
                  onNavigate={closeDrawer}
                />
                <DrawerGroup
                  label='Who We Help'
                  hub='/industries'
                  hubLabel='Who we help overview'
                  groups={whoWeHelpGroups}
                  onNavigate={closeDrawer}
                />

                {/* Plain rows, at the same level as the groups and without a
                    chevron — theirs does exactly this with Work and About. */}
                <Link href='/results' className='navDrawer__link' onClick={closeDrawer}>
                  Results
                </Link>
                <Link href='/blog-list' className='navDrawer__link' onClick={closeDrawer}>
                  Insights
                </Link>
                <Link href='/aboutus' className='navDrawer__link' onClick={closeDrawer}>
                  About
                </Link>
                <Link href='/contactus' className='navDrawer__link' onClick={closeDrawer}>
                  Contact
                </Link>

                {/* No Home row. The wordmark is the link home, as it is on the
                    reference and on every page of this site; a Home row under a
                    logo that already goes home is the duplicate the drawer had
                    and the bar never did. */}
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
