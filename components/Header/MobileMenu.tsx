import React from "react";
import Link from "next/link";
import UnderlineLink from "../Links/UnderlineLink";

type Link = {
  text: string;
  label: string;
  path: string;
  icon: string;
};

interface MobileMenuProps {
  /** Determines if the mobile menu (hamburger menu) is visible or not */
  visibility: boolean;
  /** Function to toggle the mobile menu */
  toggle: () => void;
  /** Determines if user is logged in. TRUE = LOGGED IN | FALSE = NOT LOGGED IN */
  user: boolean;
  /** Navigation links */
  links: Link[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  visibility = false,
  toggle = () => {},
  user = false,
  links = [],
}: MobileMenuProps) => {
  return (
    <nav
      aria-hidden={!visibility}
      className={`transition-300 absolute bottom-0 left-0 top-header_height z-50 flex w-full items-stretch overflow-hidden bg-dark-200 lg:hidden ${
        visibility
          ? "visibility max-w-full opacity-100"
          : "invisibility max-w-0 opacity-0"
      }`}
    >
      <ul className="w-full overflow-auto">
        {links.map((link, index) => {
          return (
            <li
              key={`mobile-menu-link-${index}`}
              className="flex justify-between"
            >
              <UnderlineLink
                toggle={toggle}
                icon={link.icon}
                text={link.text}
                path={link.path}
                showIcon={true}
                direction="right"
                label={link.label}
                variant="hamburger-link"
              />
            </li>
          );
        })}
        <li>
          <UnderlineLink
            toggle={toggle}
            icon={user ? "logout" : "login"}
            text={user ? "Logout" : "Login"}
            path="/login"
            showIcon={true}
            direction="right"
            label={user ? "Log out" : "Log in"}
            variant="hamburger-link"
          />
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
