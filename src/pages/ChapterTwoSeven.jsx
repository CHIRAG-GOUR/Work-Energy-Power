import React, { useEffect, useRef } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import { initSim14 } from '../lib/simulations';

const ChapterTwoSeven = () => {
  const sim14Ref = useRef(null);

  useEffect(() => {
    let unmount14 = () => {};
    if (sim14Ref.current) {
        unmount14 = initSim14(sim14Ref.current);
    }
    return () => unmount14();
  }, []);

  return (
    <div className="ui-grid fade-in" id="view-chapter-2.7">
      <header className="glass-card header-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #e0e7ff, #bfdbfe)', border: '2px solid #93c5fd' }}>
        <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#3730a3', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module 2</h2>
          <h1 className="bouncy-header" style={{ color: '#1e3a8a', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
             <span>Chapter</span> <span>2.7</span> <span>:</span> <span>Rate</span> <span>of</span> <span>Doing</span> <span>Work</span>
          </h1>
          <p className="subtitle" style={{ textAlign: 'center', fontSize: '1.2rem', color: '#2563eb', marginTop: '0.5rem', fontWeight: 'bold' }}>All About Power</p>
        </div>
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
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#a16207', marginBottom: '1rem' }}>What is Power?</h2>
          <p style={{ color: '#713f12', fontSize: '1.1rem', marginBottom: '1rem' }}>Power is simply a measure of how fast work is being done. It’s like a "speedometer" for energy.</p>
          <div style={{ textAlign: 'center', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '2px dashed #eab308', marginBottom: '1.5rem' }}>
             <span style={{ fontSize: '2rem', color: '#854d0e', fontWeight: 'bold' }}>{"$Power = \\frac{Work}{Time}$"}</span>
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#a16207', marginBottom: '0.5rem' }}>Measuring Power: The "Watt"</h3>
          <p style={{ color: '#713f12', marginBottom: '1rem' }}>We measure power in units called <strong>Watts (W)</strong>, named after James Watt (inventor of the steam engine).</p>
          <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#854d0e', fontWeight: 'bold' }}>
             <li>1 Watt = Doing 1 Joule of work every second (1 J/s)</li>
             <li>1 Kilowatt (kW) = 1,000 Watts.</li>
          </ul>
        </div>

        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
           <h3 style={{ fontSize: '1.5rem', color: '#a16207', marginBottom: '1rem' }}>Simulation: The Stair Race</h3>
           <p style={{ color: '#713f12', marginBottom: '1rem' }}>Same Work, Different Times. Watch how Power is affected by speed!</p>
           <div id="sim14-canvas" className="sim-container" ref={sim14Ref} style={{ width: '100%', height: '300px', background: '#334155', borderRadius: '1rem', border: '4px solid #ca8a04', position: 'relative', overflow: 'hidden' }}>
             {/* Canvas injected here */}
           </div>
        </div>
      </article>

      {/* Math Examples */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f1f5f9, #cbd5e1)', border: '2px solid #94a3b8' }}>
        <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1.5rem' }}>Average Power & Examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ background: 'white' }}>
             <h3 style={{ color: '#334155', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Example 1: Climbing Girls</h3>
             <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>Two girls (A & B), each weighing 400 N climb a rope 8 m high. Girl A takes 20s, Girl B takes 50s.</p>
             <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: '#1e293b' }}>
               <strong>Work Done (both)</strong> = {"$mgh = 400 \\times 8 = 3200\\text{ J}$"}<br/><br/>
               <strong>Girl A Power</strong> = {"$3200 / 20 = 160\\text{ W}$"}<br/>
               <strong>Girl B Power</strong> = {"$3200 / 50 = 64\\text{ W}$"}
             </div>
          </div>

          <div className="glass-card" style={{ background: 'white' }}>
             <h3 style={{ color: '#334155', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>Example 2: Stairs</h3>
             <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1rem' }}>A 50 kg boy runs up 45 steps (15 cm each) in 9s. Find power ($g=10\text{ m/s}^2$).</p>
             <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem', color: '#1e293b' }}>
               <strong>Weight ({"$mg$"})</strong> = {"$50 \\times 10 = 500\\text{ N}$"}<br/>
               <strong>Height ({"$h$"})</strong> = {"$45 \\times 0.15\\text{ m} = 6.75\\text{ m}$"}<br/><br/>
               <strong>Work</strong> = {"$500 \\times 6.75 = 3375\\text{ J}$"}<br/>
               <strong>Power</strong> = {"$W/t = 3375 / 9 = 375\\text{ W}$"}
             </div>
          </div>

        </div>
      </article>

      {/* Summary (What you have learnt) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', border: '2px solid #334155' }}>
        <h2 style={{ fontSize: '2rem', color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>What You Have Learnt</h2>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', lineHeight: '1.8', fontSize: '1.1rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li><strong>Work</strong> done on an object is force multiplied by distance ({"$W = F \\times s$"}). Unit is Joule ({"$J$"}).</li>
          <li>Work done is <strong>zero</strong> if displacement is zero.</li>
          <li>An object capable of doing work possesses <strong>Energy</strong>.</li>
          <li><strong>Kinetic Energy</strong> is energy of motion: {"$KE = \\frac{1}{2}mv^2$"}.</li>
          <li><strong>Potential Energy</strong> is energy of position/shape: {"$PE = mgh$"}.</li>
          <li><strong>Law of Conservation of Energy:</strong> Energy can only transform, never be created or destroyed.</li>
          <li><strong>Mechanical Energy</strong> is the sum of KE and PE.</li>
          <li><strong>Power</strong> is the rate of doing work ({"$P = W/t$"}). The unit is Watt ({"$1 \\text{ W} = 1 \\text{ J/s}$"}).</li>
        </ul>
      </article>

    </div>
  );
};

export default ChapterTwoSeven;
