"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <>
      <div>Verify {email}</div>
      <Button variant={"link"} onClick={() => router.back()}>
        change email
      </Button>
    </>
  );
};

export default Verify;
