// ChapterTwoSeven.jsx Imports
import React, { useState } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import SimRace3D from '../components/SimRace3D';

const ChapterTwoSeven = () => {
  // Power Lifter State
  const [liftState, setLiftState] = useState('idle'); // 'idle', 'lifting-slow', 'lifting-fast'
  const [elapsedTime, setElapsedTime] = useState('?');
  const [powerGenerated, setPowerGenerated] = useState('?');

  const startLift = (speed) => {
    setLiftState(`lifting-${speed}`);
    setElapsedTime(speed === 'slow' ? '10 s' : '2 s');
    setPowerGenerated(speed === 'slow' ? '200 W' : '1000 W');
  };

  const resetLift = () => {
    setLiftState('idle');
    setElapsedTime('?');
    setPowerGenerated('?');
  };

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
             <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>Two girls (A & B), each weighing 400 N climb a rope 8 m high. Girl A takes 20s, Girl B takes 50s.</p>
             <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: '#1e293b' }}>
               <strong>Work Done (both)</strong> = mgh = 400 × 8 = 3200 J<br/><br/>
               <strong>Girl A Power</strong> = 3200 / 20 = 160 W<br/>
               <strong>Girl B Power</strong> = 3200 / 50 = 64 W
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

      {/* Power Race Simulation */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '4px solid #10b981', color: 'white' }}>
         <h2 style={{ textAlign: 'center', color: '#34d399', marginBottom: '2rem' }}>⚡ Interactive Mod: The Power Lifter</h2>
         <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '2rem' }}>Select a speed to lift the 200kg mass to a height of 1 meter. Performing <strong>2000 Joules</strong> of work. Watch the Power output change depending on speed!</p>

         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
            <div style={{ flex: '1 1 40%', background: '#334155', padding: '2rem', borderRadius: '1rem', border: 'inset 4px #475569', display: 'flex', flexDirection: 'column' }}>
               <h3 style={{ margin: 0, color: '#fbbf24', textAlign: 'center' }}>Lift the weight!</h3>
               <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>Work = Force (2000N) × Height (1m) = 2000J</p>
               
               <div style={{ position: 'relative', height: '250px', background: '#0f172a', borderRadius: '1rem', marginTop: '1rem', border: '2px solid #475569', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                   
                   {/* Visual Lift Scene */}
                   <div style={{ flex: 1, position: 'relative' }}>
                       {/* Hook/Crane line */}
                       <div style={{ position: 'absolute', top: 0, left: '50%', width: '4px', background: '#64748b', transform: 'translateX(-50%)', 
                           height: liftState === 'idle' ? '200px' : '40px',
                           transition: liftState === 'lifting-slow' ? 'height 10s linear' : liftState === 'lifting-fast' ? 'height 2s linear' : 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
                       }}></div>
                       {/* Weight Box */}
                       <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '60px', background: '#eab308', borderRadius: '8px', border: '4px solid #ca8a04', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#713f12', fontWeight: 'bold', fontSize: '1.2rem',
                           top: liftState === 'idle' ? '200px' : '40px',
                           transition: liftState === 'lifting-slow' ? 'top 10s linear' : liftState === 'lifting-fast' ? 'top 2s linear' : 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                       }}>200kg</div>
                       {/* Ground */}
                       <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '20px', background: '#334155', borderTop: '4px solid #475569' }}></div>
                   </div>
               </div>

               <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                   <button onClick={() => startLift('slow')} disabled={liftState !== 'idle'} style={{ flex: 1, padding: '1rem', background: liftState !== 'idle' ? '#64748b' : '#3b82f6', color: 'white', borderRadius: '8px', border: 'none', cursor: liftState !== 'idle' ? 'not-allowed' : 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }}>SLOW LIFT (10s)</button>
                   <button onClick={() => startLift('fast')} disabled={liftState !== 'idle'} style={{ flex: 1, padding: '1rem', background: liftState !== 'idle' ? '#64748b' : '#ef4444', color: 'white', borderRadius: '8px', border: 'none', cursor: liftState !== 'idle' ? 'not-allowed' : 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }}>FAST LIFT (2s)</button>
               </div>
               <button onClick={resetLift} style={{ marginTop: '1rem', padding: '0.8rem', background: 'transparent', color: '#94a3b8', border: '2px solid #475569', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }} onMouseOver={(e) => {e.target.style.background='#334155'; e.target.style.color='white'}} onMouseOut={(e) => {e.target.style.background='transparent'; e.target.style.color='#94a3b8'}}>Drop Weight (Reset)</button>
            </div>

            <div style={{ flex: '1 1 40%', background: '#1e293b', padding: '2rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid #334155' }}>
                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', border: '2px solid #3b82f6', transition: 'all 0.3s' }}>
                    <div style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Time Taken (t)</div>
                    <div style={{ color: elapsedTime === '?' ? '#64748b' : '#60a5fa', fontSize: '3rem', fontWeight: 'bold', transition: 'color 0.3s' }}>{elapsedTime}</div>
                </div>

                <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', border: '2px solid #10b981', transition: 'all 0.3s' }}>
                    <div style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Power Generated (P = W/t)</div>
                    <div style={{ color: powerGenerated === '?' ? '#64748b' : '#34d399', fontSize: '3rem', fontWeight: 'bold', transition: 'color 0.3s' }}>{powerGenerated}</div>
                </div>
            </div>
         </div>
      </article>

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
