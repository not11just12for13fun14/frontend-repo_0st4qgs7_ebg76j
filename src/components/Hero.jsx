import React from 'react'

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_55%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          Gentle companion for pregnancy and newborn days
        </h1>
        <p className="text-blue-200/90 text-lg mb-8">
          Simple, supportive guidance week by week, with clear info for natural and cesarean births.
        </p>
        <button onClick={onStart} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500 text-white font-medium shadow hover:bg-blue-400 transition">
          Get started
        </button>
      </div>
    </section>
  )
}
