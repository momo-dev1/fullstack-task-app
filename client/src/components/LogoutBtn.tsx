"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const LogOutBtn = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("token");
    router.push("/auth");
    router.refresh();
  };
  return (
    <div
      onClick={handleLogout}
      className="block rounded-md bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-70 cursor-pointer"
    >
      Logout
    </div>
  );
};

export default LogOutBtn;
