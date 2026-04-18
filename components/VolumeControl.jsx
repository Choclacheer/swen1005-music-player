export default function VolumeControl({ volume, onVolumeChange }) {
  return (
    <div style={{ width: '100%', maxWidth: '320px', marginBottom: '32px', zIndex: 1 }}>
      <label style={{ fontSize: '11px', letterSpacing: '2px', color: '#b39ddb', textTransform: 'uppercase' }}>
        Volume
      </label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={onVolumeChange}
        style={{ width: '100%', accentColor: '#ff69b4' }}
      />
    </div>
  );
}