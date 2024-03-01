import { useEffect, useState } from "react";
import useDepartments from "@/hooks/useDepartments";
import { DepartmentProps } from "@/types/DepartmentProps";
import useUser from "@/hooks/useUser";

type Mode = "create" | "edit" | "";

const useDepartment = (userEmail: string, userId: string) => {
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [departmentId, setDepartmentId] = useState<string>(""); // Only really used for the view button inside the edit modal.
  // Data that is displayed in the department card & edit modal.
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string>("");
  const [usersAmount, setUsersAmount] = useState<number>(0);

  const [description, setDescription] = useState<string>("");

  const { getUsersDepartments, addDepartment } = useDepartments();

  const { getUserFromId } = useUser();

  // Fetches the departments that the user is apart of and inserts them into departments state.
  const fetchDepartments = async () => {
    const fetchedDepartments = await getUsersDepartments(userId);
    setDepartments(fetchedDepartments);
  };

  const createDepartment = async (department: DepartmentProps) => {
    setMode("create");
    setVisibility(true);
  };

  const saveDepartment = async (form) => {
    setLoading(true);
    form.preventDefault();
    const nameData = form.target.departmentName.value.trim();
    const descData = form.target.departmentDescription.value.trim();
    const statusData = form.target.departmentStatus.value;

    if (!nameData || !descData || !statusData) {
      alert("Please fill in all fields.");
      form.target.departmentName.value = "";
      form.target.departmentDescription.value = "";
      setLoading(false);
    } else {
      const newDepartment: DepartmentProps = {
        owner_id: userId,
        name: nameData,
        description: descData,
        status: statusData,
        users_collection: [userId],
        users_count: 1,
      };
      await addDepartment(newDepartment);
      setVisibility(false);
    }
  };

  const editDepartment = async (department: DepartmentProps) => {
    setMode("edit");
    setVisibility(true);
    setDepartmentId(department.department_id);
    setName(department.name);
    setDescription(department.description);
    setStatus(department.status);
    const user = await getUserFromId(department.owner_id);
    setOwnerName(user[0].user_name);
    setOwnerId(department.owner_id);
    setUsersAmount(department.users_count);
  };

  const closeModal = () => {
    setVisibility(false);
  };

  useEffect(() => {
    if (visibility === false) {
      fetchDepartments();
      setMode("");
      setLoading(false);
      setDepartmentId("");
      setOwnerName("");
      setName("");
      setDescription("");
      setStatus("");
      setUsersAmount(0);
    }
  }, [visibility]);

  return {
    departments,
    visibility,
    loading,
    closeModal,
    departmentId,
    ownerName,
    name,
    createDepartment,
    editDepartment,
    description,
    status,
    usersAmount,
    mode,
    saveDepartment,
    ownerId,
  };
};

export default useDepartment;
