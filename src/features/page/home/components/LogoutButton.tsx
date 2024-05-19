"use client";

import { useCallback } from "react";

import { logout } from "@/action/auth";

export const LogoutButton = () => {
  const handleLogout = useCallback(async () => {
    await logout();
  }, []);
  return <button onClick={handleLogout}>Logout</button>;
};
