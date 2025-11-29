import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-white px-6">
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout