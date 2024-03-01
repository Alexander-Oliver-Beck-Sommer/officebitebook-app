import ImageButton from "../Buttons/ImageButton";

type HeaderProps = {
  fileRef?: React.MutableRefObject<HTMLInputElement>;
  changeAvatar?: (file: File) => void;
  avatarToggle?: () => void;
  avatarURL?: string;
  originalUserName?: string;
};

const Header = ({
  fileRef = React.createRef<HTMLInputElement>(),
  changeAvatar = () => {},
  avatarToggle = () => {},
  avatarURL = "",
  originalUserName = "",
}: HeaderProps) => {
  return (
    <header className="flex justify-center border-b border-dark-400 bg-dark-200 p-4 md:px-12 md:py-6">
      <div className="grid w-full max-w-screen-xl grid-cols-autoX1 gap-4 md:gap-6">
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileRef}
          onChange={changeAvatar}
          className="hidden"
        />
        <ImageButton
          toggle={avatarToggle}
          url={avatarURL}
          label="Change avatar"
          size="responsive"
          showHover={true}
        />
        <div className="flex flex-col justify-end overflow-hidden">
          <h4 className="text-sm text-grey md:text-base">Welcome back,</h4>
          <h2 className="w-full truncate font-semibold md:text-2xl">
            {originalUserName ? originalUserName : "Unnamed account"}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
