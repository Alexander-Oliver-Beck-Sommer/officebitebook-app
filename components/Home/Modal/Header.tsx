import IconButton from "@/components/Buttons/IconButton";

type HeaderProps = {
  title?: string;
  toggle: () => void;
};

const Header = ({ title = "", toggle = () => {} }: HeaderProps) => {
  return (
    <header className="grid grid-cols-1Xauto items-center gap-4 bg-dark-300 p-4 md:px-8">
      <h3 className="truncate">{title}</h3>
      <IconButton
        toggle={toggle}
        toolTip={true}
        label="Close menu"
        icon="close"
      />
    </header>
  );
};

export default Header;
