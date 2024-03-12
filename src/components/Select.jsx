/* eslint-disable react/prop-types */
import React, { useId } from "react";

// eslint-disable-next-line react/prop-types
const Select = React.forwardRef(function Select(
  { options, label, className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg text-white outline-none duration-200 border w-full hover:bg-gray-500 focus:bg-slate-500 ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});
export default Select;
