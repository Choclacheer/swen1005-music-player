'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { tracks } from '@/lib/tracks';
import AlbumCoverButton from '@/components/AlbumCoverButton';
import ProgressControl from '@/components/ProgressControl';
import VolumeControl from '@/components/VolumeControl';
import PlayerActions from '@/components/PlayerActions';

export default function PlayerPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const touchStartX = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const currentTrack = tracks[currentTrackIndex];

 useEffect(() => {
  const savedVolume = localStorage.getItem('player-volume');
  const savedTrack = localStorage.getItem('player-track-index');
  if (savedVolume !== null) setVolume(Number(savedVolume));
  if (savedTrack !== null) setCurrentTrackIndex(Number(savedTrack));
}, []);

  

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setProgress(audio.currentTime || 0);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrackIndex]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      await audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);
    if (!audio) return;
    audio.currentTime = nextTime;
    setProgress(nextTime);
  };

  const handleVolumeChange = (event) => {
    const audio = audioRef.current;
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (audio) audio.volume = nextVolume;
  };

  const goToNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const goToPreviousTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    );
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 30) goToNextTrack();
    else if (diff < -30) goToPreviousTrack();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0015, #1a0533, #0a1045, #2d0a4e, #1a0533)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Georgia, serif',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>

      <div style={{
        position: 'absolute',
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
        pointerEvents: 'none'
      }} />

      <Link href="/" style={{
        alignSelf: 'flex-start',
        color: '#ff69b4',
        textDecoration: 'none',
        fontSize: '14px',
        marginBottom: '20px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        zIndex: 1
      }}>
        ← Back to Playlist
      </Link>

      <audio ref={audioRef} src={currentTrack.src} />

      <AlbumCoverButton
        cover={currentTrack.cover}
        title={currentTrack.title}
        onToggle={togglePlayPause}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      <h2 style={{
        fontSize: '22px',
        fontWeight: 'bold',
        margin: '0 0 6px 0',
        color: 'white',
        textAlign: 'center',
        zIndex: 1,
        textShadow: '0 0 20px rgba(255,105,180,0.5)'
      }}>
        {currentTrack.title}
      </h2>

      <p style={{
        fontSize: '14px',
        color: '#ff69b4',
        margin: '0 0 24px 0',
        letterSpacing: '1px',
        zIndex: 1
      }}>
        {currentTrack.artist}
      </p>

      <ProgressControl
        progress={progress}
        duration={duration}
        onSeek={handleSeek}
      />

      <VolumeControl
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />

      <PlayerActions
        isPlaying={isPlaying}
        onToggle={togglePlayPause}
        onNext={goToNextTrack}
        onPrevious={goToPreviousTrack}
      />

    </div>
  );
}