export default function VerificationPending() {
  return (
    <section className="pattern fill-body flex items-center justify-center p-10 px-5 py-10  md:p-10">
      <div className="w-full max-w-screen-md animate-fade-up rounded border-2 border-dark-500 bg-dark-100 px-5 py-10 animate-ease-in-out md:p-10">
        <div>
          <h2>Verification Pending</h2>
          <p className="pt-2.5 text-sm text-grey">
            So close! We've sent you an email to verify your account. Please
            check your inbox and click the link to complete the process.
          </p>
        </div>
      </div>
    </section>
  );
}
