const Input = (
  props:
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.InputHTMLAttributes<HTMLInputElement>,
) => {
  return (
    <input
      {...props}
      className="autoline-none h-8.5 w-87.5 rounded-md border-2 bg-gray-50 px-2 py-4.5 text-sm text-[#32343E] placeholder-[#32343E]"
    />
  );
};

export default Input;
