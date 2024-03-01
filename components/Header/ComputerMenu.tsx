import React from "react";
import UnderlineLink from "../Links/UnderlineLink";

type Link = {
  text: string;
  label: string;
  path: string;
  icon: string;
};

interface ComputerMenuProps {
  /** Determines if user is logged in. TRUE = LOGGED IN | FALSE = NOT LOGGED IN */
  user: boolean;
  /** Navigation links */
  links: Link[];
  /** Functionality to close the menu when a link is clicked */
  toggle: () => void;
}

const ComputerMenu: React.FC<ComputerMenuProps> = ({
  user = false,
  links = [],
  toggle = () => {},
}) => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-8">
        {links.map((link, index) => {
          return (
            <li key={`computer-menu-link-${index}`}>
              <UnderlineLink
                toggle={toggle}
                icon={link.icon}
                text={link.text}
                path={link.path}
                showIcon={true}
                direction="right"
                label={link.label}
              />
            </li>
          );
        })}
        {/* To make sure the login/lougout stays at all times, it's been hardcoded here. */}
        <li>
          <UnderlineLink
            toggle={toggle}
            icon={user ? "logout" : "login"}
            text={user ? "Logout" : "Login"}
            path="/login"
            showIcon={true}
            direction="right"
            label={user ? "Log out" : "Log in"}
          />
        </li>
      </ul>
    </nav>
  );
};

export default ComputerMenu;
