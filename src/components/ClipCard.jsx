import { useState } from 'react'

function ClipCard({ clip, onLike, onBookmark }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleLike = () => {
    setLiked((v) => !v)
    onLike?.(clip, !liked ? 1 : -1)
  }

  const handleBookmark = () => {
    setBookmarked((v) => !v)
    onBookmark?.(clip, !bookmarked ? 1 : -1)
  }

  return (
    <div className="relative h-[80vh] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
      <video
        className="h-full w-full object-cover"
        src={clip.video_url}
        poster={clip.thumbnail_url}
        controls
        playsInline
        loop
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="mb-2">
          <span className="text-xs uppercase tracking-wider text-blue-300/80">{clip.topic}</span>
          <h3 className="text-lg font-semibold leading-tight">{clip.title}</h3>
          {clip.description && <p className="text-sm text-blue-200/80">{clip.description}</p>}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleLike} className={`px-3 py-1 rounded-full text-sm font-medium transition ${liked ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}`}>
            ❤ {clip.likes + (liked ? 1 : 0)}
          </button>
          <button onClick={handleBookmark} className={`px-3 py-1 rounded-full text-sm font-medium transition ${bookmarked ? 'bg-emerald-600' : 'bg-white/10 hover:bg-white/20'}`}>
            ☆ {clip.bookmarks + (bookmarked ? 1 : 0)}
          </button>
          {clip.difficulty && (
            <span className="ml-auto px-2 py-1 rounded-full text-xs bg-white/10">
              {clip.difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClipCard
