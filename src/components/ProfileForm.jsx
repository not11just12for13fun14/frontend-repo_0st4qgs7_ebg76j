import React, { useState } from 'react'

export default function ProfileForm({ onSaved }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [lmp, setLmp] = useState('')
  const [due, setDue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, last_period_date: lmp || null, due_date: due || null })
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      onSaved?.({ name, email, last_period_date: lmp, due_date: due, id: data.id })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-white text-xl font-semibold mb-4">Your basics</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input className="px-4 py-3 rounded-xl bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="px-4 py-3 rounded-xl bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-blue-200 text-sm">First day of last period (optional)</label>
            <input className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" value={lmp} onChange={e=>setLmp(e.target.value)} />
          </div>
          <div>
            <label className="text-blue-200 text-sm">Estimated due date (optional)</label>
            <input className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" value={due} onChange={e=>setDue(e.target.value)} />
          </div>
        </div>
        {error && <p className="text-red-300 text-sm">{error}</p>}
        <button disabled={loading} className="mt-2 inline-flex justify-center px-5 py-3 rounded-xl bg-blue-500 text-white font-medium shadow hover:bg-blue-400 transition disabled:opacity-60">
          {loading ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </div>
  )
}
