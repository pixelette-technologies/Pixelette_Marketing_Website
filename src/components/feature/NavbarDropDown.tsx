"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Text from "./Text";

interface SubMenus {
  route: string;
  title: string;
}

interface NavbarDropDownProps {
  name: string;
  mainRoute: string;
  data: SubMenus[];
  onLinkClick?: (route: string) => void; // Optional function prop
}

const NavbarDropDown: React.FC<NavbarDropDownProps> = ({
  name,
  data,
  mainRoute,
  onLinkClick
}) => {
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className='navdropDown'>
      <section onClick={() => setActive(!active)}>
        <Text className='secondry color_white'>{name}</Text>
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
          initial={{ y: "-6rem", opacity: 0 }}
          animate={{ y: "0rem", opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {data.map((el, index) => (
            <Link
              key={index}
              href={`/${mainRoute}/${el.route}`}
              passHref
              onClick={() => {
                setActive(false);
                if (onLinkClick) {
                  onLinkClick(el.route); // Call the function if provided
                }
              }}
            >
              {el.title}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default NavbarDropDown;
