// src/components/TabsSwitcher.tsx
import { Button } from "reactstrap";

interface TabsSwitcherProps<T extends string> {
  options: { label: string; value: T; color: string }[];
  abaAtiva: T;
  setAbaAtiva: (value: T) => void;
  btnClassName?: string;
}

const TabsSwitcher = <T extends string>({ options, abaAtiva, setAbaAtiva, btnClassName }: TabsSwitcherProps<T>) => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          className={btnClassName}
          color={abaAtiva === option.value ? option.color : "secondary"}
          onClick={() => setAbaAtiva(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default TabsSwitcher;
