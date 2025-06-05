"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { supabase } from '@/config/supabse/client'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter();
  const logout = async() => {
      await supabase.auth.signOut();
      router.refresh()
  }
  return (
    <>
    <div>Dashboard</div>
    <Button onClick={logout}>Logout</Button>
    </>
  )
}

export default Dashboard