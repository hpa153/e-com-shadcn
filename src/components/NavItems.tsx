"use client";

import { useState, useEffect, useRef } from "react";

import { PRODUCT_CATEGORIES } from "@/config";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const NavItems = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
      }
    };

    document.addEventListener("keydown", closeHandler);

    return () => {
      document.removeEventListener("keydown", closeHandler);
    };
  }, []);

  useOnClickOutside(navRef, () => setActiveIdx(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, idx) => {
        const handleOpen = () => {
          if (activeIdx === idx) {
            setActiveIdx(null);
          } else {
            setActiveIdx(idx);
          }
        };

        const isOpen = activeIdx === idx;

        return (
          <NavItem
            key={idx}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={activeIdx !== null}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
