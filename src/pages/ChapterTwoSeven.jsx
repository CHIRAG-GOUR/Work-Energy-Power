// ChapterTwoSeven.jsx Imports
import React from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import SimRace3D from '../components/SimRace3D';
import SimCyclist3DContainer from '../components/SimCyclist3D';

const ChapterTwoSeven = () => {

  return (
    <div className="ui-grid" id="view-chapter-2.7">
        <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
            <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem', background: '#ea580c', color: 'white', border: 'none' }}>Module 2</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2, color: '#9a3412' }}>Chapter 7: Rate of Doing Work</h1>
            <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', color: '#7c2d12' }}>
                All About Power
            </p>
        </header>

      {/* Intro & Video */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'linear-gradient(145deg, #ffffff, #f8fafc)', border: '1px solid #cbd5e1' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <CustomVideoPlayer src="/videos/rate_of_work.mp4" title="Rate of Doing Work" />
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e3a8a', marginBottom: '1rem' }}>Speeding Up Work</h2>
          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.7', marginBottom: '1rem' }}>
            Think about two kids, Alex and Ben, who both have to carry a heavy box up a flight of stairs. They are doing the exact same amount of work because the boxes weigh the same and the stairs are the same height.
          </p>
          <ul style={{ background: '#e0e7ff', padding: '1rem 2rem', borderRadius: '1rem', color: '#3730a3', fontSize: '1.1rem', marginBottom: '1rem' }}>
             <li style={{ marginBottom: '0.5rem' }}><strong>Alex</strong> runs up the stairs in 10 seconds.</li>
             <li><strong>Ben</strong> walks up slowly in 30 seconds.</li>
          </ul>
          <p style={{ fontSize: '1.1rem', color: '#334155' }}>
            Even though they did the same work, Alex was "stronger" or "faster" at doing it. In science, we call this <strong>Power</strong>.
          </p>
        </div>
      </article>

      {/* Formula & Watts */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #fefce8, #fef08a)', border: '2px solid #fde047', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: '1 1 100%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#a16207', marginBottom: '1rem', textAlign: 'center' }}>What is Power?</h2>
          <p style={{ color: '#713f12', fontSize: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>Power is simply a measure of how fast work is being done. It’s like a "speedometer" for energy.</p>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '2px dashed #eab308', marginBottom: '1.5rem' }}>
             <span style={{ fontSize: '2rem', color: '#854d0e', fontWeight: 'bold', fontFamily: 'monospace' }}>Power = Work / Time</span>
          </div>
          <p style={{ color: '#713f12', marginBottom: '1rem', textAlign: 'center' }}>We measure power in units called <strong>Watts (W)</strong> (1 W = 1 J/s).</p>
        </div>
      </article>

      {/* Full Width Sim 14 Replacement */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.35s', gridColumn: '1 / -1' }}>
        <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem' }}>Experiential Activity: The Stair Race (3D)</h2>
        <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '2rem' }}>Same Work, Different Times. Watch how Power is affected by speed as Alex and Ben race to the top!</p>
        <SimRace3D />
      </article>

      {/* Math Examples */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f1f5f9, #cbd5e1)', border: '2px solid #94a3b8' }}>
        <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1.5rem' }}>Average Power & Examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ background: 'white' }}>
             <h3 style={{ color: '#334155', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Example 1: Climbing Girls</h3>
             <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>Two girls (A & B), each with a mass of 40 kg, climb a rope 8 m high. Girl A takes 20s, Girl B takes 50s. (Assume g = 10 m/s²)</p>
             <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: '#1e293b' }}>
               <strong>Weight (Force)</strong> = m × g = 40 kg × 10 m/s² = 400 N<br/>
               <strong>Work Done (both)</strong> = Force × h = 400 N × 8 m = 3200 J<br/><br/>
               <strong>Girl A Power</strong> = 3200 J / 20 s = 160 W<br/>
               <strong>Girl B Power</strong> = 3200 J / 50 s = 64 W
             </div>
          </div>

          <div className="glass-card" style={{ background: 'white' }}>
             <h3 style={{ color: '#334155', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Example 2: Stairs</h3>
             <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>A 50 kg boy runs up 45 steps (15 cm each) in 9s. Find power (g = 10 m/s²).</p>
             <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: '#1e293b' }}>
               <strong>Weight (mg)</strong> = 50 × 10 = 500 N<br/>
               <strong>Height (h)</strong> = 45 × 0.15 m = 6.75 m<br/><br/>
               <strong>Work</strong> = 500 × 6.75 = 3375 J<br/>
               <strong>Power</strong> = W/t = 3375 / 9 = 375 W
             </div>
          </div>

        </div>
      </article>

      {/* Power Interactive Activities */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
         <SimCyclist3DContainer />
      </div>

      {/* Summary (What you have learnt) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1', background: 'rgba(255, 255, 255, 0.95)', color: '#1e293b', border: '8px solid #fbfbb2', borderRadius: '3rem', padding: '3rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#fbbf24', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>What You Have Learnt</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', lineHeight: '1.8', fontSize: '1.2rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '1rem', fontWeight: '600' }}>
          <li><strong>Work</strong> done on an object is force multiplied by distance (W = F × s). Unit is Joule (J).</li>
          <li>Work done is <strong>zero</strong> if displacement is zero.</li>
          <li>An object capable of doing work possesses <strong>Energy</strong>.</li>
          <li><strong>Kinetic Energy</strong> is energy of motion: KE = ½mv².</li>
          <li><strong>Potential Energy</strong> is energy of position/shape: PE = mgh.</li>
          <li><strong>Law of Conservation of Energy:</strong> Energy can only transform, never be created or destroyed.</li>
          <li><strong>Mechanical Energy</strong> is the sum of KE and PE.</li>
          <li><strong>Power</strong> is the rate of doing work (P = W/t). The unit is Watt (1 W = 1 J/s).</li>
        </ul>
      </article>

    </div>
  );
};

export default ChapterTwoSeven;
