import React, { useEffect, useState } from 'react'

export default function BirthModes() {
  const API = import.meta.env.VITE_BACKEND_URL
  const [mode, setMode] = useState('vaginal')
  const [data, setData] = useState(null)

  useEffect(() => {
    const run = async () => {
      const res = await fetch(`${API}/content/birth?mode=${mode}`)
      const json = await res.json()
      setData(json)
    }
    run()
  }, [mode])

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={()=>setMode('vaginal')} className={`px-4 py-2 rounded-lg ${mode==='vaginal'?'bg-blue-500 text-white':'bg-slate-900/60 text-blue-200 border border-white/10'}`}>Natural birth</button>
        <button onClick={()=>setMode('cesarean')} className={`px-4 py-2 rounded-lg ${mode==='cesarean'?'bg-blue-500 text-white':'bg-slate-900/60 text-blue-200 border border-white/10'}`}>Cesarean</button>
      </div>
      {data && (
        <div className="space-y-2">
          <h3 className="text-white text-lg font-semibold">{data.title}</h3>
          {data.overview && <p className="text-blue-200/90">{data.overview}</p>}
          {data.stages && (
            <div>
              <p className="text-white font-medium mt-2">Stages</p>
              <ul className="list-disc list-inside text-blue-200/90">
                {data.stages.map((s, i) => (
                  <li key={i}><span className="text-white/90 font-medium">{s.name}:</span> {s.info}</li>
                ))}
              </ul>
            </div>
          )}
          {data.what_to_expect && (
            <div>
              <p className="text-white font-medium mt-2">What to expect</p>
              <ul className="list-disc list-inside text-blue-200/90">
                {data.what_to_expect.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {data.when_to_seek_help && (
            <div>
              <p className="text-white font-medium mt-2">When to seek help</p>
              <ul className="list-disc list-inside text-blue-200/90">
                {data.when_to_seek_help.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {data.aftercare && <p className="text-blue-200/90"><span className="text-white font-medium">Aftercare:</span> {data.aftercare}</p>}
          {data.recovery_timeline && <p className="text-blue-200/90"><span className="text-white font-medium">Recovery timeline:</span> {data.recovery_timeline}</p>}
        </div>
      )}
    </div>
  )
}
