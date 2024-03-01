"use client";
import { Slant } from "hamburger-react";
import Link from "next/link";
import ComputerMenu from "./ComputerMenu";
import MobileMenu from "./MobileMenu";
import useHeader from "./useHeader";

const Header = () => {
  const { visibility, handleBurgerMenu, user, links } = useHeader();

  return (
    <header className="flex h-header_height items-center justify-center bg-dark-100 px-4 md:px-12">
      <section className="flex w-full max-w-screen-xl items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Go to departments"
          title="Go to departments"
          className="transition-300 text-white outline-0 hover:text-grey focus-visible:text-grey"
        >
          <h3 className="font-semibold">OfficeBiteBook</h3>
        </Link>
        <div className="lg:hidden">
          <Slant
            toggled={visibility}
            toggle={handleBurgerMenu}
            rounded
            label="Show menu"
          />
        </div>
        <ComputerMenu user={user} links={links} />
      </section>
      <MobileMenu
        user={user}
        visibility={visibility}
        toggle={handleBurgerMenu}
        links={links}
      />
    </header>
  );
};

export default Header;
