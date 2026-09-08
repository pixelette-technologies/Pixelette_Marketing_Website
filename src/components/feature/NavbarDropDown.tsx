"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import type { NavGroup } from "@/data/navigation";

interface NavbarDropDownProps {
  name: string;
  mainRoute: string;
  groups: NavGroup[];
  onLinkClick?: (route: string) => void;
}

// The 8 Sep 2026 brief groups the pages under capability headings rather than
// listing them flat, so this takes GROUPS now. The group labels are not links:
// the five capabilities are parents in the information architecture, not pages,
// and a heading that looks clickable but is not is worse than one that plainly
// is not.
//
// THE TRIGGER IS A LINK NOW. "Services" and "Industries" were plain text, so
// /services and /industries were in the sitemap but reachable from nowhere in
// the navigation. The brief puts "What We Do" and "Who We Help" in the top
// level as destinations, which resolves that.
//
// It also opens ON FOCUS, not on hover alone. The panel is conditionally
// rendered in JavaScript, so no CSS :focus-within can reach it, and a hover-only
// dropdown cannot be opened from a keyboard at all — the links inside were
// unreachable without a mouse. React's onFocus/onBlur bubble, so one pair on
// the wrapper covers the trigger and every link in the panel; the blur guard
// checks the new focus target is outside before closing, or tabbing INTO the
// panel would close it.
const NavbarDropDown: React.FC<NavbarDropDownProps> = ({
  name,
  groups,
  mainRoute,
  onLinkClick
}) => {
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dropdownRef}
      className='navdropDown'
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setActive(false);
        }
      }}
    >
      <section>
        {/* color_white dropped in D3: the header ground moved from the dark
            bar to the guide's page ground, and the label would have been white
            on white. */}
        <Link href={`/${mainRoute}`} className='navdropDown__label'>
          {name}
        </Link>
        <motion.div
          animate={
            active
              ? {
                  rotate: -180
                }
              : { rotate: 0 }
          }
        >
          <IoIosArrowDown />
        </motion.div>
      </section>
      {active && (
        <motion.div
          initial={{ y: "-3.75rem", opacity: 0 }}
          animate={{ y: "0rem", opacity: 1 }}
          exit={{ opacity: 0 }}
          className='dropdown-content'
        >
          {groups.map(group => (
            <div key={group.label} className='navdropDown__group'>
              <p className='eyebrow'>{group.label}</p>
              {group.items.map(item => (
                <Link
                  key={item.route}
                  href={`/${mainRoute}/${item.route}`}
                  passHref
                  onClick={() => {
                    setActive(false);
                    if (onLinkClick) {
                      onLinkClick(item.route);
                    }
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default NavbarDropDown;
