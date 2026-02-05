interface InputProps {
  placeholder: string;
  reference?: any;
}

export const Input = ({ placeholder, reference }: InputProps) => {
  return (
    <div>
      <input
        type="text"
        ref={reference}
        placeholder={placeholder}
        className="m-2 rounded border px-4 py-2"
      />
    </div>
  );
};
