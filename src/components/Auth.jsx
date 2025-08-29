import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password)
        if (displayName.trim()) {
          await updateProfile(cred.user, { displayName: displayName.trim() })
        }
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }
      // ✅ Success: here you could redirect or close modal if needed
    } catch (err) {
      // Clean up Firebase error messages a bit
      let msg = err.message
      if (msg.includes('auth/invalid-email')) msg = 'Invalid email format.'
      if (msg.includes('auth/email-already-in-use')) msg = 'This email is already registered.'
      if (msg.includes('auth/wrong-password')) msg = 'Incorrect password.'
      if (msg.includes('auth/user-not-found')) msg = 'No account found with this email.'
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
      <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {isSignup ? 'Create account' : 'Welcome back'}
      </h1>
      <form onSubmit={submit} className="space-y-3">
        {isSignup && (
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Display Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="e.g. Favour"
            />
          </div>
        )}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="e.g. user@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          disabled={busy}
        >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>
        <div className="text-center mt-3">
          <button
            type="button"
            className="text-blue-600 dark:text-blue-400 underline"
            onClick={() => setIsSignup(!isSignup)}
            disabled={busy}
          >
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  )
}
