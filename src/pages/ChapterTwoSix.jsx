import React, { useEffect, useRef } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import { initSim13 } from '../lib/simulations';

const ChapterTwoSix = () => {
  const sim13Ref = useRef(null);

  useEffect(() => {
    let unmount13 = () => {};
    if (sim13Ref.current) {
        unmount13 = initSim13(sim13Ref.current);
    }
    return () => unmount13();
  }, []);

  return (
    <div className="ui-grid" id="view-chapter-2.6">
        <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
            <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem', background: '#ea580c', color: 'white', border: 'none' }}>Module 2</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2, color: '#9a3412' }}>Chapter 6: Law of Conservation</h1>
            <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', color: '#7c2d12' }}>
                Energy Never Disappears
            </p>
        </header>

      {/* Intro & Video */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start', background: 'linear-gradient(145deg, #ffffff, #fdf2f8)', border: '1px solid #fbcfe8' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#831843', marginBottom: '1rem' }}>The Building Blocks of the Universe</h2>
          <p style={{ fontSize: '1.1rem', color: '#4c1d95', lineHeight: '1.7', marginBottom: '1rem', background: '#fdf2f8', padding: '1rem', borderRadius: '1rem', borderLeft: '6px solid #ec4899' }}>
            Think of energy like a collection of building blocks. You can build a tall tower or a long bridge, but no matter what you build, you still have the exact same number of blocks. You didn't create new ones, and none of them vanished—they just changed their "look."
          </p>
          <div style={{ background: '#831843', color: 'white', padding: '1.5rem', borderRadius: '1rem', marginTop: '1rem' }}>
             <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#fbcfe8' }}>The Law of Conservation of Energy</h3>
             <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', lineHeight: '1.6', color: 'white' }}>
                <li style={{ color: 'white' }}>Energy cannot be created from nothing.</li>
                <li style={{ color: 'white' }}>Energy cannot be destroyed.</li>
                <li style={{ color: 'white' }}>It can only change forms (like switching from "stored" energy to "moving" energy).</li>
             </ul>
          </div>
        </div>

        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <CustomVideoPlayer src="/videos/t0ShHdtB8jA.mp4" title="Law of Conservation of Energy" />
        </div>
      </article>

      {/* The Falling Ball Experiment */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f0fdf4, #bbf7d0)', border: '2px solid #86efac' }}>
        <h2 style={{ fontSize: '2rem', color: '#166534', marginBottom: '1.5rem', textAlign: 'center' }}>The "Falling Ball" Experiment</h2>
        <p style={{ color: '#14532d', fontSize: '1.1rem', textAlign: 'center', marginBottom: '2rem' }}>Imagine you are holding a ball high in the air. Let’s look at what happens to its energy as it falls:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ background: '#ffffff', borderTop: '8px solid #3b82f6' }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '1.3rem', marginBottom: '0.5rem' }}>1. At the Top (Ready)</h3>
            <p style={{ color: '#334155', marginBottom: '1rem', fontSize: '0.95rem' }}>Sitting still: No Kinetic Energy. High up: High Potential Energy.</p>
            <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '0.5rem', color: '#2563eb', fontWeight: 'bold', textAlign: 'center' }}>Total = All Potential</div>
          </div>
          
          <div className="glass-card" style={{ background: '#ffffff', borderTop: '8px solid #a855f7' }}>
            <h3 style={{ color: '#581c87', fontSize: '1.3rem', marginBottom: '0.5rem' }}>2. During the Fall</h3>
            <p style={{ color: '#334155', marginBottom: '1rem', fontSize: '0.95rem' }}>Moving faster (gaining KE), getting lower (losing PE). Energy is "trading places."</p>
            <div style={{ background: '#faf5ff', padding: '0.5rem', borderRadius: '0.5rem', color: '#9333ea', fontWeight: 'bold', textAlign: 'center' }}>Total = Potential + Kinetic</div>
          </div>

          <div className="glass-card" style={{ background: '#ffffff', borderTop: '8px solid #ef4444' }}>
            <h3 style={{ color: '#7f1d1d', fontSize: '1.3rem', marginBottom: '0.5rem' }}>3. Just Before Impact</h3>
            <p style={{ color: '#334155', marginBottom: '1rem', fontSize: '0.95rem' }}>Lowest point (0 PE), fastest speed (Max KE).</p>
            <div style={{ background: '#fef2f2', padding: '0.5rem', borderRadius: '0.5rem', color: '#dc2626', fontWeight: 'bold', textAlign: 'center' }}>Total = All Kinetic</div>
          </div>
        </div>
      </article>

      {/* The Golden Rule & Interactive Sim */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #ffedd5, #fed7aa)', border: '2px solid #fdba74', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#9a3412', marginBottom: '1rem' }}>The Golden Rule</h2>
          <p style={{ fontSize: '1.2rem', color: '#7c2d12', marginBottom: '1rem' }}>
            If you add the Potential Energy (mgh) and the Kinetic Energy (½mv²) together at any point during the fall, the answer is always the same number!
          </p>
          <div style={{ background: '#ea580c', color: 'white', padding: '1rem', borderRadius: '1rem', textAlign: 'center', fontSize: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <span style={{ fontFamily: 'monospace' }}>Total Energy = PE + KE</span>
          </div>
          <p style={{ color: '#7c2d12', marginTop: '1rem', lineHeight: '1.6' }}>
            We call this sum the <strong>Total Mechanical Energy</strong>. Even though the ball is falling and speeding up, the "bank account" of total energy stays exactly the same from start to finish.
          </p>

          {/* Activity Section */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', marginTop: '2rem', border: '2px dashed #f97316' }}>
             <h3 style={{ color: '#c2410c', fontSize: '1.2rem', marginBottom: '1rem' }}>Activity Table (Given g = 10 m/s²)</h3>
             <p style={{ color: '#431407', marginBottom: '1rem', fontSize: '0.9rem' }}>A 20 kg object dropped from 4 m. Notice how Total Energy stays at 800 J!</p>
             <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.9rem' }}>
               <thead>
                 <tr style={{ background: '#fed7aa', color: '#9a3412' }}>
                   <th style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>Height (m)</th>
                   <th style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>PE = mgh (J)</th>
                   <th style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>KE (J)</th>
                   <th style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>Total E (J)</th>
                 </tr>
               </thead>
               <tbody>
                 <tr><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>4</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>800</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>0</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74', fontWeight: 'bold' }}>800</td></tr>
                 <tr><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>3</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>600</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>200</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74', fontWeight: 'bold' }}>800</td></tr>
                 <tr><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>2</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>400</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>400</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74', fontWeight: 'bold' }}>800</td></tr>
                 <tr><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>1</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>200</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>600</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74', fontWeight: 'bold' }}>800</td></tr>
                 <tr><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>0</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>0</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74' }}>800</td><td style={{ padding: '0.5rem', border: '1px solid #fdba74', fontWeight: 'bold' }}>800</td></tr>
               </tbody>
             </table>
          </div>
        </div>

        <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#9a3412', marginBottom: '1rem' }}>Simulation: Falling Ball (PE vs KE)</h3>
           <div id="sim13-canvas" className="sim-container" ref={sim13Ref} style={{ width: '100%', height: '450px', background: '#334155', borderRadius: '1rem', border: '4px solid #ea580c', position: 'relative', overflow: 'hidden' }}>
             {/* Canvas injected here */}
           </div>
           <p style={{ color: '#9a3412', marginTop: '0.5rem', fontSize: '0.9rem', textAlign: 'center' }}>Watch the bars as the ball falls! The Total Energy never shrinks.</p>
        </div>
      </article>

    </div>
  );
};

export default ChapterTwoSix;
