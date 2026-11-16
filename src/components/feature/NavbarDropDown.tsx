"use client";

import React, { useState, useRef, useEffect } from "react";
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

// Opens on focus and hover. Escape closes. Empty group labels render no eyebrow
// (Public sector is a flat list per the 12 Nov 2026 brief).
const NavbarDropDown: React.FC<NavbarDropDownProps> = ({
  name,
  groups,
  mainRoute,
  onLinkClick
}) => {
  const [active, setActive] = useState(false);
  // After Escape, focusing the trigger would re-fire onFocus and reopen.
  const ignoreNextFocusRef = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Five labelled capability groups → desktop columns (§4.3). Flat menus
  // (Public sector) stay a single list.
  const useColumns = groups.filter(group => group.label).length >= 5;

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
        ignoreNextFocusRef.current = true;
        const label = dropdownRef.current?.querySelector<HTMLElement>(
          ".navdropDown__label"
        );
        label?.blur();
        label?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Keep the five-column panel inside the viewport (brief §8 / §10).
  useEffect(() => {
    if (!active || !useColumns) return;
    const panel = dropdownRef.current?.querySelector<HTMLElement>(
      ".dropdown-content--columns"
    );
    if (!panel) return;

    const clamp = () => {
      // marginLeft — do not touch transform; framer-motion owns it for enter.
      panel.style.marginLeft = "0px";
      const rect = panel.getBoundingClientRect();
      const edge = 12;
      let shift = 0;
      if (rect.right > window.innerWidth - edge) {
        shift -= rect.right - (window.innerWidth - edge);
      }
      if (rect.left + shift < edge) {
        shift += edge - (rect.left + shift);
      }
      if (shift !== 0) {
        panel.style.marginLeft = `${shift}px`;
      }
    };

    // After the open animation paints.
    const frame = window.requestAnimationFrame(clamp);
    window.addEventListener("resize", clamp);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", clamp);
      panel.style.marginLeft = "";
    };
  }, [active, useColumns]);

  return (
    <div
      ref={dropdownRef}
      className='navdropDown'
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => {
        if (ignoreNextFocusRef.current) {
          ignoreNextFocusRef.current = false;
          return;
        }
        setActive(true);
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setActive(false);
        }
      }}
    >
      <section>
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
          className={
            useColumns
              ? "dropdown-content dropdown-content--columns"
              : "dropdown-content"
          }
        >
          {groups.map((group, groupIndex) => (
            <div
              key={group.label || `group-${groupIndex}`}
              className='navdropDown__group'
            >
              {group.label ? <p className='eyebrow'>{group.label}</p> : null}
              {group.items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  passHref
                  onClick={() => {
                    setActive(false);
                    if (onLinkClick) {
                      onLinkClick(item.href);
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
