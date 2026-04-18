export default function ProgressControl({ progress, duration, onSeek }) {
  return (
    <div style={{ width: '100%', maxWidth: '320px', marginBottom: '16px', zIndex: 1 }}>
      <label style={{ fontSize: '11px', letterSpacing: '2px', color: '#b39ddb', textTransform: 'uppercase' }}>
        Progress
      </label>
      <input
        type="range"
        min={0}
        max={duration}
        value={progress}
        onChange={onSeek}
        style={{ width: '100%', accentColor: '#ff69b4' }}
      />
    </div>
  );
}