import React, { useState } from "react";

const SelectInput = ({ label, name, value, onChange, options, disabled }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);


  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`absolute left-2 text-slate-700 font-poppins font-light text-xs transition-all duration-200 ${
          isFocused || value?.length > 0
            ? "top-0 text-xs"
            : "top-1/2 transform -translate-y-1/2"
        }`}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className="border-b border-slate-300 p-2 pt-6 appearance-none disabled:cursor-not-allowed"
      >
        <option value="" disabled hidden></option>
        {options?.map((option) => (
          <option
            key={option}
            value={option}
            className="font-poppins font-light text-xs"
          >
            {handleCourtName(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
