export default function AlbumCoverButton({ cover, title, onToggle, onTouchStart, onTouchEnd }) {
  return (
    <div style={{
      border: '3px solid #ff69b4',
      borderRadius: '12px',
      padding: '4px',
      marginBottom: '24px',
      boxShadow: '0 0 40px rgba(255, 105, 180, 0.5), 0 0 80px rgba(147, 51, 234, 0.3)',
      zIndex: 1
    }}>
      <img
        src={cover}
        alt={title}
        onClick={onToggle}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          width: '220px',
          height: '220px',
          cursor: 'pointer',
          borderRadius: '10px',
          display: 'block'
        }}
      />
    </div>
  );
}