import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  // eslint-disable-next-line react/prop-types
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block font-medium sm:text-lg text-base text-white mb-1 pl-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg outline-none border-2 border-cyan-400 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
