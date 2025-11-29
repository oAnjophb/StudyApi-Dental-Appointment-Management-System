import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`
        w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm 
        text-lg font-medium text-white bg-purple-700 hover:bg-purple-800 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
        transition duration-150 ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
