import { FC } from "react";

interface FormGroupProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  placeholder?: string;
}

const FormGroup: FC<FormGroupProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  className,
  placeholder,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className="formControl"
        value={value}
        onChange={onChange}
        id={name}
        placeholder={placeholder}
      />
      {error && <div className="textDanger">{error}</div>}
    </div>
  );
};

export default FormGroup;
