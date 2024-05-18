"use client";

import { logout } from "@/action/auth";

export const LogoutButton = () => {
  const hoge = async () => {
    await logout();
  };
  return <button onClick={hoge}>Logout</button>;
};
