import React, { useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { ref, onValue } from "firebase/database"
import { auth, db } from "./firebase" // make sure firebase.js exports auth & db
import DarkModeToggle from "./components/DarkModeToggle"
import Auth from "./components/Auth"
import SubscriptionGate from "./components/SubscriptionGate"
import  ChatRoom  from "./components/ChatRoom"

// --- Theme helpers ---
function getInitialTheme() {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) return storedTheme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    return prefersDark ? "dark" : "light"
  }
  return "light"
}

function persistTheme(theme) {
  localStorage.setItem("theme", theme)
}

function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(getInitialTheme())
  const [user, setUser] = useState(null)
  const [isSub, setIsSub] = useState(false)

  // --- Auth state listener ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // --- Theme effect ---
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    persistTheme(theme)
  }, [theme])

  // --- Subscription listener ---
  useEffect(() => {
    if (!user) { setIsSub(false); return }
    const r = ref(db, `subscriptions/${user.uid}`)
    return onValue(r, snap => {
      const val = snap.val()
      setIsSub(Boolean(val) && (val === true || val === "true"))
    })
  }, [user])

  const header = useMemo(() => (
    <header className="h-16 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">Mini Chat App</div>
      <div className="flex items-center gap-2">
        <DarkModeToggle theme={theme} setTheme={setTheme} />
        {user ? (
          <button
            onClick={() => signOut(auth)}
            className="px-3 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 hover:opacity-90"
          >Sign out</button>
        ) : null}
      </div>
    </header>
  ), [user, theme])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {header}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4">
        {!user && <Auth />}
        {user && !isSub && <SubscriptionGate user={user} />}
        {user && isSub && <ChatRoom user={user} />}
      </main>
      <footer className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400">
        Built with React + Firebase • Dark Mode • Subscription Gate (simulated)
      </footer>
    </div>
  )
}

export default App
