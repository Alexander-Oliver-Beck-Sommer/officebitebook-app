import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ErrorModal from "@/components/Modals/ErrorModal";
import Department from "@/components/Department";

export default async function Departments() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <Department userEmail={user.email} userId={user.id} />;
  }

  return (
    <section
      className="fill-body pattern flex items-center justify-center px-5 py-10"
      aria-label="Not logged in"
    >
      <ErrorModal variant={401} />
    </section>
  );
}
