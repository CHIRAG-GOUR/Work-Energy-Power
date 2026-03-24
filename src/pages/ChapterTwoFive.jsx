import React, { useEffect, useRef } from 'react';
import { initSim11, initSim12 } from '../lib/simulations';

const PREFIX = 'https://login.skillizee.io';

const ChapterTwoFive = () => {
  const sim11Ref = useRef(null);
  const sim12Ref = useRef(null);

  useEffect(() => {
    let unmount11 = () => {};
    let unmount12 = () => {};

    if (sim11Ref.current) {
        unmount11 = initSim11(sim11Ref.current);
    }
    if (sim12Ref.current) {
        unmount12 = initSim12(sim12Ref.current);
    }

    return () => {
      unmount11();
      unmount12();
    };
  }, []);

  return (
    <div className="ui-grid fade-in" id="view-chapter-2.5">
      <header className="glass-card header-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '2px solid #93c5fd' }}>
        <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#2563eb', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module 2</h2>
          <h1 className="bouncy-header" style={{ color: '#1e3a8a', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
             <span>Chapter</span> <span>2.5</span> <span>:</span> <span>PE</span> <span>at</span> <span>a</span> <span>Height</span>
          </h1>
          <p className="subtitle" style={{ textAlign: 'center', fontSize: '1.2rem', color: '#1d4ed8', marginTop: '0.5rem', fontWeight: 'bold' }}>Formula and Roller Coasters!</p>
        </div>
      </header>

      {/* Intro and Formula */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start', background: 'linear-gradient(145deg, #ffffff, #f8fafc)', border: '1px solid #cbd5e1' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem' }}>Gravitational Potential Energy</h2>
          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            When discussing an object at Earth's surface, the most common type of Potential Energy is <strong>Gravitational.</strong> This is the energy an object has stored inside it simply by being lifted off the ground (Work was done against gravity).
          </p>

          <div style={{ background: '#1e293b', color: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '4px solid #475569', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' }}>
             <h3 style={{ fontSize: '1.4rem', color: '#60a5fa', marginBottom: '1rem', borderBottom: '2px solid #334155', paddingBottom: '0.5rem' }}>The Magic Formula</h3>
             <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', fontSize: '1.2rem', lineHeight: '1.8' }}>
               <li><strong>Mass ($m$):</strong> How heavy it is (Joules love mass).</li>
               <li><strong>Gravity ($g$):</strong> $9.8$ m/s² (Earth's constant pull).</li>
               <li><strong>Height ($h$):</strong> How high it was lifted.</li>
             </ul>
             <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '2.5rem', background: '#334155', borderRadius: '1rem', padding: '1rem', color: '#38bdf8' }}>
               $E_p = m \times g \times h$
             </div>
             <p style={{ textAlign: 'center', marginTop: '1rem', color: '#94a3b8' }}>Unit = Joules (J)</p>
          </div>
        </div>

        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
           <h3 style={{ fontSize: '1.5rem', color: '#334155', marginBottom: '1rem' }}>Interactive Sandbox: Gravity Box</h3>
           <p style={{ color: '#475569', marginBottom: '1rem' }}>Raise the mass higher to increase its $E_p$. The higher they are, the harder they fall!</p>
           {/* Simulation 11 Container */}
           <div id="sim11-canvas" className="sim-container" ref={sim11Ref} style={{ width: '100%', height: '350px', background: '#e2e8f0', borderRadius: '1rem', border: '2px dashed #94a3b8', position: 'relative', overflow: 'hidden' }}>
             {/* Canvas injected here */}
           </div>
        </div>
      </article>

      {/* Examples Section */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #fefce8, #fef08a)', border: '2px solid #fde047' }}>
        <h2 style={{ fontSize: '2rem', color: '#854d0e', marginBottom: '1rem' }}>Real World Math Examples</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          
          {/* Example 1 */}
          <div className="glass-card" style={{ background: 'white', border: '2px solid #facc15' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#a16207', marginBottom: '0.5rem' }}>Lifting Apples</h3>
            <p style={{ color: '#713f12', marginBottom: '1rem' }}>Find the energy possessed by an object of mass 10 kg when it is at a height of 6 m above the ground. ($g$ = $9.8$ m/s²)</p>
            <div style={{ background: '#fefce8', padding: '1rem', borderRadius: '0.5rem', color: '#ca8a04', fontWeight: 'bold' }}>
              $m$ = 10, $h$ = 6<br/>
              $E_p$ = 10 × 9.8 × 6<br/>
              <span style={{ fontSize: '1.2rem', marginTop: '0.5rem', display: 'block' }}>Answer: 588 Joules</span>
            </div>
          </div>

          {/* Example 2 */}
          <div className="glass-card" style={{ background: 'white', border: '2px solid #facc15' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#a16207', marginBottom: '0.5rem' }}>Finding Mass</h3>
            <p style={{ color: '#713f12', marginBottom: '1rem' }}>An object at a height of 5 m has a potential energy of 400 J. Find its mass ($g=10$ m/s²).</p>
            <div style={{ background: '#fefce8', padding: '1rem', borderRadius: '0.5rem', color: '#ca8a04', fontWeight: 'bold' }}>
              $E_p$ = 400, $h$ = 5<br/>
              400 = $m$ × 10 × 5<br/>
              400 = 50$m$<br/>
              <span style={{ fontSize: '1.2rem', marginTop: '0.5rem', display: 'block' }}>Answer: $m$ = 8 kg</span>
            </div>
          </div>
        </div>
      </article>

      {/* Roller Coaster */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f1f5f9, #cbd5e1)', border: '2px solid #94a3b8', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem' }}>The Roller Coaster: Pure Physics</h2>
          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.7', marginBottom: '1rem' }}>
            At the top of the ramp, the cart is "waiting." The motor pulls it up high, doing <strong>Work</strong>. This work turns into <strong>Potential Energy</strong> ($mgh$). 
          </p>
          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: '1.7', background: 'white', padding: '1rem', borderRadius: '1rem' }}>
            When the cart drops over the top edge... boom! The "waiting energy" instantly converts into massive amounts of Kinetic Energy! ($1/2mv^2$). This is what creates that stomach-dropping sensation!
          </p>
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
           <h3 style={{ fontSize: '1.5rem', color: '#334155', marginBottom: '1rem' }}>Simulation: Roller Drop</h3>
           {/* Simulation 12 Container */}
           <div id="sim12-canvas" className="sim-container" ref={sim12Ref} style={{ width: '100%', height: '350px', background: '#334155', borderRadius: '1rem', border: '4px solid #475569', position: 'relative', overflow: 'hidden' }}>
             {/* Canvas injected here */}
           </div>
        </div>
      </article>

    </div>
  );
};

export default ChapterTwoFive;
