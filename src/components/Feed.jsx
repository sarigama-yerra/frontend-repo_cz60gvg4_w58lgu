import { useEffect, useState } from 'react'
import ClipCard from './ClipCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Feed() {
  const [clips, setClips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchClips = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/clips`)
      if (!res.ok) throw new Error('Failed to load clips')
      const data = await res.json()
      setClips(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClips()
  }, [])

  const handleLike = async (clip, delta) => {
    try {
      await fetch(`${API_BASE}/api/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clip_id: clip._id || clip.id || clip.__id || '', delta }),
      })
    } catch (e) {
      // noop
    }
  }

  const handleBookmark = async (clip, delta) => {
    try {
      await fetch(`${API_BASE}/api/bookmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clip_id: clip._id || clip.id || clip.__id || '', delta }),
      })
    } catch (e) {
      // noop
    }
  }

  const seed = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/seed`, { method: 'POST' })
      if (res.ok) fetchClips()
    } catch (e) {}
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-slate-950/60 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">SysTok</h1>
          <div className="flex items-center gap-2">
            <button onClick={seed} className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm">Load examples</button>
            <button onClick={fetchClips} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm">Refresh</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        {loading && <p className="text-blue-300">Loading feed…</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && clips.length === 0 && (
          <div className="text-center py-20 text-blue-200/80">
            <p>No clips yet. Click Load examples.</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {clips.map((clip, i) => (
            <ClipCard key={i} clip={clip} onLike={handleLike} onBookmark={handleBookmark} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Feed
