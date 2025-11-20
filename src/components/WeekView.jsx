import React, { useEffect, useState } from 'react'

export default function WeekView({ email }) {
  const API = import.meta.env.VITE_BACKEND_URL
  const [week, setWeek] = useState(12)
  const [data, setData] = useState(null)
  const [notes, setNotes] = useState([])
  const [noteText, setNoteText] = useState('')

  const fetchWeek = async () => {
    const res = await fetch(`${API}/content/weeks?week=${week}`)
    const json = await res.json()
    setData(json)
    const nres = await fetch(`${API}/notes?email=${encodeURIComponent(email)}&week=${week}`)
    const njson = await nres.json()
    setNotes(njson.items || [])
  }

  useEffect(() => { if (email) fetchWeek() }, [week, email])

  const addNote = async () => {
    if (!noteText.trim()) return
    await fetch(`${API}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, week, text: noteText })
    })
    setNoteText('')
    fetchWeek()
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold">Week {week}</h2>
        <input type="range" min={1} max={42} value={week} onChange={e=>setWeek(parseInt(e.target.value))} className="w-48" />
      </div>
      {data && (
        <div className="grid gap-2">
          <p className="text-blue-200"><span className="text-white font-medium">{data.title}:</span> {data.mother_tips}</p>
          <p className="text-blue-200"><span className="text-white font-medium">Baby:</span> {data.baby_development}</p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-white font-medium mb-2">Your notes</h3>
        <div className="flex gap-2">
          <input value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Add a quick note" className="flex-1 px-4 py-3 rounded-xl bg-slate-900/60 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={addNote} className="px-4 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-400">Save</button>
        </div>
        <ul className="mt-3 space-y-2">
          {notes.map(n => (
            <li key={n.id} className="text-blue-200/90 bg-slate-900/50 border border-white/5 px-3 py-2 rounded-lg">{n.text}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
