"use client"

import { getSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Home() {
  const [session, setSession] = useState(false)
  async function getSessions() {
    const session = await getSession()
    if(session) setSession(true)
  }
  useEffect(() => {
    getSessions()
  }, [])
  return (
    <>
      <button type="button" onClick={() => {
        if(session) {
          signOut()
        } else {
          signIn()
        }
      }}>{session ? "logout" : "login"}</button>
    </>
  )
}
