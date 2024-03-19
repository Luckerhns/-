import { FC } from "react";

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ onSubmit, children, className, ...props }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
      className={className}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
