'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tracks } from '@/lib/tracks';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTracks.length / pageSize);
  const visibleTracks = filteredTracks.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const playSong = (index: number) => {
    localStorage.setItem('player-track-index', String(index));
    router.push('/player');
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0015, #1a0533, #0a1045, #2d0a4e, #1a0533)',
      fontFamily: 'Georgia, serif',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Galaxy stars effect */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          radial-gradient(1px 1px at 10% 20%, rgba(255,182,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 30% 60%, rgba(180,180,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.9) 0%, transparent 100%),
          radial-gradient(1px 1px at 70% 40%, rgba(255,182,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 85% 70%, rgba(180,180,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 20% 80%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 90%, rgba(255,182,255,0.7) 0%, transparent 100%),
          radial-gradient(2px 2px at 40% 30%, rgba(255,105,180,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 15%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 15% 50%, rgba(180,180,255,0.7) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px'
      }}>

        <h1 style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 0 20px rgba(255,105,180,0.5)',
          marginBottom: '20px',
          letterSpacing: '2px'
        }}>
          🎵 Playlist 🎵
        </h1>

        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          paddingBottom: '12px'
        }}>
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              borderRadius: '30px',
              border: '2px solid rgba(255,105,180,0.5)',
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              outline: 'none',
              backdropFilter: 'blur(10px)',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {visibleTracks.map((track) => (
            <li
              key={track.id}
              onClick={() => playSong(filteredTracks.indexOf(track))}
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                borderRadius: '10px',
                marginBottom: '4px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(5px)',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{track.title}</div>
              <div style={{ fontSize: '13px', color: '#ff69b4', marginTop: '4px' }}>{track.artist}</div>
            </li>
          ))}
        </ul>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <button
            onClick={previousPage}
            disabled={currentPage === 0}
            style={{
              background: currentPage === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              color: currentPage === 0 ? '#555' : 'white',
              padding: '10px 20px',
              borderRadius: '30px',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              fontSize: '13px'
            }}>
            ← Previous
          </button>

          <span style={{ color: '#b39ddb', fontSize: '13px', letterSpacing: '1px' }}>
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            style={{
              background: currentPage === totalPages - 1 ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #ff69b4, #9333ea)',
              border: 'none',
              color: currentPage === totalPages - 1 ? '#555' : 'white',
              padding: '10px 20px',
              borderRadius: '30px',
              cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
              fontSize: '13px'
            }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}