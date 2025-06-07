"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/config/supabse/supabase-browser-client";

const Dashboard = () => {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <>
      <div>Dashboard</div>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default Dashboard;
