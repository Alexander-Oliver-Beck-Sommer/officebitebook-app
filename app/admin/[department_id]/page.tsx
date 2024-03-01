import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Calendar from "@/components/Calendar";
import ErrorModal from "@/components/Modals/ErrorModal";

export default async function AdminDashboard({
  params,
}: {
  params: { department_id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userDate, error: userError } = await supabase
      .from("users")
      .select("user_role")
      .eq("user_id", user.id)
      .single();

    const { data: departmentData, error: departmentError } = await supabase
      .from("departments")
      .select("owner_id")
      .eq("department_id", params.department_id)
      .single();

    if (
      userDate &&
      departmentData &&
      userDate.user_role === "admin" &&
      user.id === departmentData.owner_id
    ) {
      return <Calendar userId={user.id} departmentId={params.department_id} />;
    }
  }

  return (
    <section className="fill-body pattern flex items-center justify-center px-5 py-10">
      <ErrorModal variant={403} />
    </section>
  );
}
