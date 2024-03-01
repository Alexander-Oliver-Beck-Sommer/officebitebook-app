"use client";
import useUser from "@/hooks/useUser";
import InputField from "@/components/InputField";
import UnderlineButton from "@/components/Buttons/UnderlineButton";
import TextButton from "@/components/Buttons/TextButton";
import Link from "next/link";

export default function SignUp() {
  const { createUser } = useUser();

  return (
    <section className="pattern fill-body flex items-center justify-center p-10 px-5 py-10 md:p-10">
      <div className="grid w-full max-w-screen-md">
        <div className="flex w-full animate-fade-up flex-col gap-8 rounded border-2 border-dark-500 bg-dark-100 px-5 py-10 animate-ease-in-out md:p-10">
          <div>
            <h2>Sign up</h2>
            <h4 className="pt-2.5 text-grey">
              To start using OfficeBiteBook, sign up for an account.
            </h4>
          </div>
          <form onSubmit={createUser}>
            <ul className="flex flex-col gap-5">
              <li>
                <InputField
                  id="emailField"
                  label="Enter email"
                  name="Email"
                  type="email"
                  placeholder="name@email.com"
                  autoComplete="on"
                  required
                />
              </li>
              <li>
                <InputField
                  id="passwordField"
                  label="Enter password"
                  name="Password"
                  type="password"
                  placeholder="123456789"
                  autoComplete="on"
                  required
                />
              </li>
              <li className="mt-5">
                <TextButton
                  type="submit"
                  className="w-full"
                  text="Sign up"
                  label="Sign up"
                  icon="arrow-right"
                />
              </li>
            </ul>
          </form>
          <div className="flex justify-center gap-1 text-grey">
            <p className="text-sm">Already have an account?</p>
            <Link href="/login" aria-label="Go to sign up">
              <p className="border-b-2 pb-0.5 text-sm font-medium">
                Log in here
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
