const fs = require('fs');
const content = \import React, { useEffect } from 'react';
import { initSim1, initSim3 } from '../lib/simulations';

const ChapterOneThree = () => {
  useEffect(() => {
    const t1 = setTimeout(() => initSim1(), 100);
    const t3 = setTimeout(() => initSim3(), 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="ui-grid" id="view-chapter-1.3">
      
      <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1' }}>
        <div className="header-content">
          <span className="module-badge">Module 1</span>
          <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>Chapter 3: Work Done by a Constant Force</h1>
        </div>
      </header>

      {/* VIDEO AND IMAGE CONTAINER - Combined vertically */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Work Done</h2>
        
        <div className="video-container" style={{ width: '100%', maxWidth: '800px', marginBottom: '2.5rem', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--card-shadow), var(--inset-shadow)' }}>
          <iframe width="100%" height="450" src="https://www.youtube.com/embed/d6MhIBpmJnE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ display: 'block' }}></iframe>
        </div>

        <div className="image-container" style={{ width: '100%', maxWidth: '800px', background: 'var(--glass-bg)', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--inner-well)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Figure 11.1 Work Done</h3>
          <img src="./fig11_1.png" alt="Force applied on a block" style={{ width: '100%', borderRadius: '1rem', boxShadow: 'var(--card-shadow)' }}/>
          <p style={{ marginTop: '1.5rem', fontStyle: 'italic', textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-light)' }}>Work is done when a force produces motion.</p>
        </div>
      </article>

      {/* KEY CHARACTERISTICS - Horizontal card (full width) */}
      <article className="glass-card highlight-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1' }}>
        <div className="icon-circle" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>W</div>
        <h3>Key Characteristics of Work</h3>
        <div className="info-block" style={{ marginTop: '1.5rem', padding: '2rem', background: 'var(--glass-bg)', borderRadius: '20px', boxShadow: 'var(--inner-well)' }}>
          <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', lineHeight: '1.8', fontSize: '1.15rem', color: 'var(--text-light)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Work is done when an object moves a distance in the direction of the applied force.</li>
            <li style={{ marginBottom: '0.5rem' }}>Work equation: <strong style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>Work (W) = Force (F) × displacement (s)</strong></li>
            <li>When force is applied in the direction of motion, work is positive.</li>
          </ul>
        </div>
      </article>

      {/* SIMULATION 1: PEBBLE VS WALL */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1' }}>
        <h2>Interactive Mod 1: Force vs Displacement</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', marginBottom: '2rem' }}>Try pushing the wall compared to the pebble. Notice how exerting force without displacement results in zero work!</p>
        
        <div className="simulation-container" style={{ position: 'relative', width: '100%', aspectRatio: '21/9', minHeight: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--inner-well)' }}>
          <canvas id="sim1-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          
          <div className="sim-ui" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button id="sim1-btn-wall" className="btn primary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', background: 'var(--accent-color)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Push Wall</button>
            <button id="sim1-btn-pebble" className="btn accent-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', background: '#f59e0b', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Push Pebble</button>
            <button id="sim1-btn-reset" className="btn secondary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Reset</button>
          </div>
          
          <div className="sim-stats glass-card" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', minWidth: '200px' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Force: <strong id="sim1-stat-force" style={{ color: 'var(--accent-color)' }}>0 N</strong></p>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Displacement: <strong id="sim1-stat-disp" style={{ color: 'var(--accent-color)' }}>0 m</strong></p>
            <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', margin: '0.8rem 0' }}></div>
            <p style={{ margin: 0, fontSize: '1.2rem' }}>Work Done: <strong id="sim1-stat-work" style={{ color: '#10b981', fontSize: '1.4rem' }}>0 J</strong></p>
          </div>
        </div>
      </article>

      {/* ANOTHER SCENARIO - Horizontal Cards layout */}
      <article className="glass-card highlight-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1' }}>
        <div className="icon-circle" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white' }}>S</div>
        <h3>Consider a different scenario:</h3>
        
        <div className="side-by-side-cards" style={{ marginTop: '2.5rem', gridColumn: '1 / -1' }}>
          <div className="info-block" style={{ padding: '2.5rem', background: 'var(--glass-bg)', borderRadius: '24px', boxShadow: 'var(--inner-well)' }}>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--heading-color)', marginBottom: '1rem', borderBottom: '2px solid rgba(139, 92, 246, 0.3)', paddingBottom: '0.5rem' }}>1. The Pulling Force</h4>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text-light)' }}>Suppose a girl is pulling a trolley and the trolley moves through a distance <em>S</em>. The force is applied and displacement takes place. Work is done.</p>
          </div>
          
          <div className="info-block" style={{ padding: '2.5rem', background: 'var(--glass-bg)', borderRadius: '24px', boxShadow: 'var(--inner-well)' }}>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--heading-color)', marginBottom: '1rem', borderBottom: '2px solid rgba(139, 92, 246, 0.3)', paddingBottom: '0.5rem' }}>2. The Lifting Force</h4>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text-light)' }}>When you lift a book, you apply a force upward, and the book moves upward. Since the force and displacement are in the same direction, work is done by your lifting force.</p>
          </div>
        </div>
      </article>

      {/* SIMULATION 3: LIFTING LUGGAGE */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.6s', gridColumn: '1 / -1' }}>
        <h2>Interactive Mod 2: The Lifting Force</h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', marginBottom: '2rem' }}>When lifting luggage, you must exert a force equal to its weight (mg). The work done increases with height!</p>

        <div className="simulation-container" style={{ position: 'relative', width: '100%', aspectRatio: '21/9', minHeight: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--inner-well)' }}>
          <canvas id="sim3-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          
          <div className="sim-ui" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button id="sim3-btn-lift" className="btn primary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', background: 'var(--accent-color)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Lift Luggage</button>
            <button id="sim3-btn-drop" className="btn secondary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Drop/Reset</button>
          </div>
          
          <div className="sim-stats glass-card" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', minWidth: '200px' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Mass: <strong>15 kg</strong></p>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Gravity: <strong>9.8 m/s²</strong></p>
            <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', margin: '0.8rem 0' }}></div>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Lift Force: <strong id="sim3-stat-force" style={{ color: 'var(--accent-color)' }}>0 N</strong></p>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Height (h): <strong id="sim3-stat-disp" style={{ color: 'var(--accent-color)' }}>0 m</strong></p>
            <p style={{ margin: 0, fontSize: '1.2rem', marginTop: '0.5rem' }}>Work (mgh): <strong id="sim3-stat-work" style={{ color: '#10b981', fontSize: '1.4rem' }}>0 J</strong></p>
          </div>
        </div>
      </article>

    </div>
  );
};

export default ChapterOneThree;
\;
fs.writeFileSync('src/pages/ChapterOneThree.jsx', content);
