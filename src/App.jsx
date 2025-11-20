import React, { useState } from 'react'
import Hero from './components/Hero'
import ProfileForm from './components/ProfileForm'
import WeekView from './components/WeekView'
import BirthModes from './components/BirthModes'

function App() {
  const [profile, setProfile] = useState(null)
  const start = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative">
        <Hero onStart={start} />

        <div className="max-w-5xl mx-auto px-6 pb-24 grid gap-8">
          <ProfileForm onSaved={setProfile} />

          {profile?.email && (
            <>
              <WeekView email={profile.email} />
              <BirthModes />
            </>
          )}

          {!import.meta.env.VITE_BACKEND_URL && (
            <div className="text-center text-red-300">
              Missing backend URL. Please set VITE_BACKEND_URL.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
