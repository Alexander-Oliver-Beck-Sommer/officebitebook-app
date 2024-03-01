import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Calendar from "@/components/Calendar";
import ErrorModal from "@/components/Modals/ErrorModal";

export default async function CalendarTest() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("users")
      .select("user_role")
      .eq("user_id", user.id)
      .single();

    if (data && data.user_role === "admin") {
      return <Calendar userId={user.id} />;
    }
  }

  return (
    <section className="fill-body pattern flex items-center justify-center px-5 py-10">
      <ErrorModal variant={403} />
    </section>
  );
}
