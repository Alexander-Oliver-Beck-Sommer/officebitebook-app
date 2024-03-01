import Link from "next/link";
import ArrowIcon from "@/components/Icons/ArrowIcon";

export default function VerificationSuccess() {
  return (
    <section className="pattern fill-body flex items-center justify-center p-10 px-5 py-10  md:p-10">
      <div className="w-full max-w-screen-md animate-fade-up rounded border-2 border-dark-500 bg-dark-100 px-5 py-10 animate-ease-in-out md:p-10">
        <div>
          <h2>Account verified! 🎊</h2>
          <p className="pt-2.5 text-sm text-grey">
            All set! Click the button below to log in and start using
            OfficeBiteBook.
          </p>
          <Link
            href="/login"
            aria-label="Go to login"
            className="mt-6 flex items-center justify-center gap-2 rounded border-2 border-dark-500 bg-dark-100 fill-grey px-5 py-2.5 text-grey outline-0 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:fill-dark-100 hover:text-dark-100 focus-visible:border-primary focus-visible:bg-primary focus-visible:fill-dark-100 focus-visible:text-dark-100"
          >
            <h4>Log in</h4>
            <ArrowIcon variant="right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
