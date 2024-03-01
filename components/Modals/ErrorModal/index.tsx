import React from "react";
import ShieldIcon from "@/components/Icons/ShieldIcon";
import FileDamagedIcon from "@/components/Icons/FileDamagedIcon";
import LogIcon from "@/components/icons/LogIcon";
import HomeIcon from "@/components/Icons/HomeIcon";
import Link from "next/link";

type Variant = 401 | 403 | 404;

interface ErrorModalProps {
  /** Supported: 401, 403, 404. */
  variant?: Variant;
}

const variants = (variant: Variant): number => {
  switch (variant) {
    case 401:
      return {
        landmark: "unauthenticated",
        title: "401",
        message: "Account required!",
        icon: <ShieldIcon variant="user" className="h-8 w-8 fill-red" />,
        description:
          "Sorry, you must be logged in to access this page. Please login or try a different page.",
        link: {
          href: "/login",
          text: "Login",
          label: "Navigate to the login page",
        },
      };
    case 403:
      return {
        landmark: "forbidden",
        title: "403",
        message: "Access Denied!",
        icon: <ShieldIcon variant="keyhole" className="h-8 w-8 fill-red" />,
        description:
          "Sorry, you don't have permission to access this page. Please check with your administrator or try a different page.",
        link: {
          href: "/",
          text: "Go Back",
          label: "Navigate to the home page",
        },
      };
    case 404:
      return {
        landmark: "not-found",
        title: "404",
        message: "Page not found!",
        icon: <FileDamagedIcon className="h-8 w-8 fill-red" />,
        description:
          "We're sorry, but the page you're looking for doesn't exist. You can head back to the home page, or try again.",
        link: {
          href: "/",
          text: "Go Back",
          label: "Navigate to the home page",
        },
      };
    default:
      return {
        landmark: "default",
        title: "",
        message: "",
        icon: null,
        description: "",
        link: {
          href: "/",
          text: "",
          label: "",
        },
      };
  }
};

const ErrorModal: React.FC<ErrorModalProps> = ({ variant = 404 }) => {
  const { landmark, title, message, icon, description, link } =
    variants(variant);

  return (
    <section className="flex w-full max-w-screen-md animate-fade-up flex-col gap-2.5 rounded border-2 border-dark-500 bg-dark-100 px-5 py-10 animate-delay-1000 animate-ease-in-out md:p-10">
      <div className="flex items-center justify-between border-b-2 border-red pb-2.5">
        <div className="flex items-end gap-2.5">
          <h1>{title}</h1>
          <h4 className="text-grey">{message}</h4>
        </div>
        {icon}
      </div>
      <p className="text-grey">{description}</p>
      <div className="flex justify-end">
        <Link
          aria-label={link.label}
          title={link.label}
          href={link.href}
          className="w-full rounded border-2 border-dark-500 bg-dark-100 px-5 py-2.5 text-center transition-colors duration-300 ease-in-out hover:bg-dark-500 md:w-fit"
        >
          <h4>{link.text}</h4>
        </Link>
      </div>
    </section>
  );
};

export default ErrorModal;
