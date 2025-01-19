"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Text from "./Text";

interface SubMenus {
  route: string;
  title: string;
  id: number;
}

interface NavbarDropDownProps {
  name: string;
  data: SubMenus[];
}

const NavbarDropDown: React.FC<NavbarDropDownProps> = ({ name, data }) => {
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
    <div ref={dropdownRef} className='dropdown-container'>
      <section onClick={() => setActive(!active)}>
        <Text>{name}</Text>
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
          {data.map(el => (
            <Link
              key={el.id}
              href={el.route}
              passHref
              onClick={() => setActive(false)}
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
