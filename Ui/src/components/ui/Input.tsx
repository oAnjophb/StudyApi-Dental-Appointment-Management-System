import type { ComponentProps, ReactNode } from "react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  icon?: ReactNode;
}

function Input({ label, icon, ...props }: InputProps) {
  return (
    <>
      <div className=" w-full">
        <label className=" text-sm font-medium text-gray-700 block-mb-1">
          {label}
        </label>

        <div className="relative">
          {icon && (
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {icon}
            </div>
          )}

          <input
            className={`
            w-full py-3 border border-transparent rounded-lg bg-blue-50 text-gray-800 
            focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400
            ${icon ? "pl-10" : "pl-4"} pr-4 /* Ajusta padding se tiver ícone */
          `}
            {...props}
          />
        </div>
      </div>
    </>
  );
}

export default Input
