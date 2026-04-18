export default function PlayerActions({ isPlaying, onToggle, onNext, onPrevious }) {
  return (
    <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
      <button
        onClick={onPrevious}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          cursor: 'pointer',
          letterSpacing: '1px',
          fontSize: '13px',
          backdropFilter: 'blur(10px)'
        }}>
        ⏮ Prev
      </button>

      <button
        onClick={onToggle}
        style={{
          background: 'linear-gradient(135deg, #ff69b4, #9333ea)',
          border: 'none',
          color: 'white',
          padding: '12px 28px',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '15px',
          boxShadow: '0 0 30px rgba(255,105,180,0.6), 0 0 60px rgba(147,51,234,0.3)'
        }}>
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>

      <button
        onClick={onNext}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          cursor: 'pointer',
          letterSpacing: '1px',
          fontSize: '13px',
          backdropFilter: 'blur(10px)'
        }}>
        Next ⏭
      </button>
    </div>
  );
}