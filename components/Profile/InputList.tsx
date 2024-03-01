import TextInput from "@/components/Inputs/TextInput";

type InputListProps = {
  name?: string;
  changeName?: (name: string) => void;
  phone?: string;
  changePhone?: (phone: string) => void;
  birthday?: Date;
  changeBirthday?: (birthday: Date) => void;
  diet?: string;
  changeDiet?: (diet: string) => void;
  allergies?: string;
  changeAllergies?: (allergies: string) => void;
  email?: string;
};

const InputList = ({
  name = "",
  changeName = () => {},
  phone = "",
  changePhone = () => {},
  birthday = new Date(),
  changeBirthday = () => {},
  diet = "",
  changeDiet = () => {},
  allergies = "",
  changeAllergies = () => {},
  email = "",
}: InputListProps) => {
  return (
    <section className="flex flex-1 justify-center px-4 pb-12 pt-6 md:px-12">
      <div className="w-full max-w-screen-xl">
        <ul className="grid h-fit auto-rows-max gap-6 lg:grid-cols-2">
          <li>
            <TextInput
              placeholder="Name"
              variant="text"
              label="Change your username"
              name="Name"
              value={name}
              valueChange={changeName}
            />
          </li>
          <li>
            <TextInput
              placeholder="Phone number"
              variant="tel"
              label="Change your phone number"
              name="Phone"
              value={phone}
              valueChange={changePhone}
            />
          </li>
          <li>
            <TextInput
              placeholder="Birthday"
              variant="date"
              label="Change your birthday"
              name="Birthday"
              value={birthday}
              valueChange={changeBirthday}
            />
          </li>
          <li>
            <TextInput
              placeholder="Diet preference"
              variant="text"
              label="Change your diet preference"
              name="Diet"
              value={diet}
              valueChange={changeDiet}
            />
          </li>
          <li>
            <TextInput
              placeholder="Allergies"
              variant="text"
              label="Change your allergies"
              name="Allergies"
              value={allergies}
              valueChange={changeAllergies}
            />
          </li>
          <li>
            <TextInput
              placeholder="Email"
              variant="email"
              label="Email"
              name="Email"
              value={email}
              disabled
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default InputList;
