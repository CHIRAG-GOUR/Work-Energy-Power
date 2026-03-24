import React, { useState, useRef, useEffect } from 'react';

const CustomVideoPlayer = ({ src, poster, title }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  let controlsTimeout = useRef(null);

  // Helper: Format time (sec to MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTo = (e.target.value / 100) * duration;
    videoRef.current.currentTime = seekTo;
    setProgress(e.target.value);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      if (vol === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const changePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  // SVGs for custom look
  const PlayIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
  const PauseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
  const VolumeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
  const MuteIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;
  const FullscreenIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>;
  const ExitFullscreenIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>;

  return (
    <div 
      ref={containerRef} 
      className="custom-video-wrapper"
      style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        backgroundColor: '#111', 
        borderRadius: isFullscreen ? '0' : '2rem', 
        border: isFullscreen ? 'none' : '6px solid #fbbf24', 
        boxShadow: isFullscreen ? 'none' : '0 12px 0px #b45309',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        aspectRatio: '16/9'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }}
      />

      {/* Title Overlay (Fades out when playing) */}
      {!isPlaying && title && currentTime === 0 && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', color: 'white', zIndex: 10,  pointerEvents: 'none' }}>
           <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: "'Nunito', sans-serif", fontWeight: 'bold' }}>{title}</h2>
        </div>
      )}

      {/* Large Center Play Button (Fades out when playing) */}
      {!isPlaying && (
         <button 
            onClick={togglePlay} 
            style={{ 
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
              width: '80px', height: '80px', borderRadius: '50%', 
              background: '#facc15', border: '4px solid #b45309', 
              boxShadow: '0 8px 0 #b45309', display: 'flex', justifyContent: 'center', alignItems: 'center',
              cursor: 'pointer', zIndex: 10, transition: 'transform 0.1s', color: '#713f12'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translate(-50%, -46%)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%)'}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
         </button>
      )}

      {/* Squishy Bottom Controls Pill */}
      <div 
        style={{ 
          position: 'absolute', bottom: isFullscreen ? '20px' : '20px', left: '50%', transform: 'translateX(-50%)',
          width: '90%', background: '#fff', borderRadius: '2rem', padding: '0.8rem 1.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
          border: '4px solid #cbd5e1', boxShadow: '0 6px 0 #94a3b8',
          opacity: showControls || !isPlaying ? 1 : 0,
          visibility: showControls || !isPlaying ? 'visible' : 'hidden',
          transition: 'opacity 0.3s, visibility 0.3s',
          zIndex: 20
        }}
      >
        <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b', display: 'flex' }}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Progress Bar Container */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', minWidth: '45px' }}>{formatTime(currentTime)}</span>
          
          <input 
            type="range" min="0" max="100" value={progress} onChange={handleSeek}
            style={{ 
               flex: 1, height: '12px', WebkitAppearance: 'none', background: '#e2e8f0', borderRadius: '10px', outline: 'none', cursor: 'pointer' 
            }}
            className="squishy-slider"
          />
          {/* Custom style injected via style tag for the slider thumbs */}
          <style>{`
            .squishy-slider::-webkit-slider-thumb {
               -webkit-appearance: none; appearance: none;
               width: 20px; height: 20px; border-radius: 50%;
               background: #ec4899; cursor: pointer; border: 2px solid #be185d; box-shadow: 0 3px 0 #be185d;
               margin-top: -1px;
            }
            .squishy-slider::-moz-range-thumb {
               width: 20px; height: 20px; border-radius: 50%;
               background: #ec4899; cursor: pointer; border: 2px solid #be185d; box-shadow: 0 3px 0 #be185d;
            }
          `}</style>
          
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', minWidth: '45px' }}>{formatTime(duration)}</span>
        </div>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
           <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b', display: 'flex' }}>
             {isMuted ? <MuteIcon /> : <VolumeIcon />}
           </button>
           <input 
              type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange}
              style={{ width: '60px', height: '8px', WebkitAppearance: 'none', background: '#e2e8f0', borderRadius: '10px', cursor: 'pointer' }}
              className="squishy-slider"
           />
        </div>

        {/* Playback Speed */}
        <button 
           onClick={changePlaybackRate} 
           style={{ background: '#bfdbfe', border: '2px solid #3b82f6', borderRadius: '0.5rem', padding: '0.2rem 0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#1d4ed8', cursor: 'pointer', boxShadow: '0 3px 0 #3b82f6' }}
        >
          {playbackRate}x
        </button>

        {/* Fullscreen */}
        <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b', display: 'flex' }}>
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>

      </div>
    </div>
  );
};

export default CustomVideoPlayer;
