import React, { useEffect } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import { initSim9, initSim10 } from '../lib/simulations';

const PREFIX = 'https://login.skillizee.io';

const ChapterTwoThree = () => {
  useEffect(() => {
    initSim9();
    initSim10();
  }, []);

  return (
    <div className="ui-grid" id="view-chapter-2.3">
        <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
            <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem', background: '#ea580c', color: 'white', border: 'none' }}>Module 2</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2, color: '#9a3412' }}>Chapter 3: Kinetic Energy</h1>
            <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', color: '#7c2d12' }}>
                The Energy of Speed
            </p>
        </header>

      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'linear-gradient(145deg, #fffbeb, #ffedd5)', border: '1px solid #fed7aa' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
            <h2 style={{ color: '#b45309', fontSize: '2rem', marginBottom: '1rem' }}>1. The Power of Velocity</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              <strong>If an object is moving, it has Kinetic Energy (KE).</strong> It doesn't matter if it's a tiny bullet or a massive planet; if it has velocity, it has the power to do work.
            </p>
            <div style={{ padding: '1.5rem', background: '#ffedd5', borderRadius: '16px', marginTop: '1.5rem', boxShadow: 'var(--inner-well)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#c2410c' }}>Why does speed matter? Think about these two scenarios:</h3>
                <ul className="info-list" style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}>A ball gently rolling toward a plastic bottle might just tap it.</li>
                    <li>A ball thrown fast will knock the bottle over completely.</li>
                </ul>
                <div style={{ background: '#fff', borderLeft: '5px solid #f97316', padding: '1rem', borderRadius: '8px' }}>
                   <p style={{ margin: 0 }}><strong>The Rule:</strong> The faster an object moves, the more kinetic energy it possesses. Similarly, a heavier object (like a truck) has more kinetic energy than a light object (like a bicycle) even if they move at the same speed.</p>
                </div>
            </div>
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <img src={`${PREFIX}/s/articles/69c24807bd3e7f3a68c41535/images/image-20260324134502-1.png`} style={{ maxWidth: '100%', height: 'auto', borderRadius: '24px', boxShadow: '0 10px 25px rgba(234, 88, 12, 0.2)', border: '4px solid white' }} alt="Kinetic Energy Intro" />
            
            <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', border: '4px solid white', boxShadow: '0 10px 25px rgba(234, 88, 12, 0.2)', background: 'black' }}>
                <div style={{ padding: '0.5rem', background: '#ea580c', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Watch: Kinetic Energy In Action (Till 0:58)</div>
                <CustomVideoPlayer src="/videos/eBsU9DVa7ws.mp4" title="Kinetic Energy In Action" />
            </div>
        </div>
      </article>

      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1', background: 'linear-gradient(145deg, #fff1f2, #ffe4e6)', border: '1px solid #fecdd3' }}>
        <h2 style={{ color: '#be123c', fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>2. Proving the Formula (The Science Logic)</h2>
        <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '2rem' }}>How do we turn a "speeding object" into a math equation? We look at how much Work was done to get that object moving in the first place.</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                <ol className="info-list" style={{ paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ color: '#9f1239' }}>Work Done (W):</strong> To move an object of mass (m), we apply a force (F) over a distance (s).<br/>
                        <span style={{ display: 'inline-block', background: '#fff', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 'bold', fontFamily: 'monospace', color: '#e11d48', marginTop: '0.5rem', border: '1px solid #fecdd3' }}>W = F × s</span>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ color: '#9f1239' }}>Newton's Second Law:</strong> We know that force is mass times acceleration.<br/>
                        <span style={{ display: 'inline-block', background: '#fff', padding: '0.3rem 0.6rem', borderRadius: '6px', fontWeight: 'bold', fontFamily: 'monospace', color: '#e11d48', marginTop: '0.5rem', border: '1px solid #fecdd3' }}>F = m × a</span>
                    </li>
                    <li style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ color: '#9f1239' }}>The Equation of Motion:</strong> From our previous chapters, we know that:<br/>
                        <img src={`${PREFIX}/s/articles/69c24807bd3e7f3a68c41535/images/image-20260324134502-2.png`} style={{ maxWidth: '100%', height: 'auto', marginTop: '0.5rem', borderRadius: '8px' }} alt="Equation of Motion" />
                        <p style={{ marginTop: '0.5rem' }}>If we start from rest (u = 0), we can rearrange this to find the distance:</p>
                        <img src={`${PREFIX}/s/articles/69c24807bd3e7f3a68c41535/images/image-20260324134502-3.png`} style={{ maxWidth: '100%', height: 'auto', marginTop: '0.5rem', borderRadius: '8px' }} alt="Distance" />
                    </li>
                </ol>
            </div>
            
            <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--inner-well)', border: '2px solid #fda4af', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h3 style={{ color: '#be123c', marginBottom: '1rem', fontSize: '1.5rem' }}>The Grand Result</h3>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>By plugging the force (ma) and the distance <img src={`${PREFIX}/s/articles/69c24807bd3e7f3a68c41535/images/image-20260324134502-4.png`} style={{ verticalAlign: 'middle', height: '30px' }} alt="Distance Eq block"/> into our Work formula, the "acceleration" cancels out, leaving us with the standard equation for Kinetic Energy:</p>
                    <div style={{ padding: '1rem', background: '#ffe4e6', borderRadius: '16px', display: 'inline-block' }}>
                        <img src={`${PREFIX}/s/articles/69c24807bd3e7f3a68c41535/images/image-20260324134502-5.png`} style={{ maxWidth: '100%', height: 'auto' }} alt="Kinetic Energy Formula" />
                    </div>
                </div>
            </div>
        </div>
      </article>

      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', background: 'linear-gradient(145deg, #faf5ff, #f3e8ff)', border: '1px solid #e9d5ff' }}>
        <h2 style={{ color: '#7e22ce', fontSize: '2rem', marginBottom: '1.5rem' }}>3. What does this formula tell us?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', borderLeft: '5px solid #a855f7', boxShadow: 'var(--card-shadow)' }}>
                <h3 style={{ color: '#9333ea', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>⚖️ Mass (m)</h3>
                <p style={{ fontSize: '1.1rem' }}>If you double the mass, you double the energy. It is directly proportional.</p>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', borderLeft: '5px solid #c084fc', boxShadow: 'var(--card-shadow)' }}>
                <h3 style={{ color: '#a855f7', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>⚡ Velocity (v)</h3>
                <p style={{ fontSize: '1.1rem' }}>Because the velocity is squared (v²), speed has a huge impact! If you double the speed of a car, its kinetic energy doesn't just double—it becomes <strong>four times greater</strong>. This is why high-speed crashes are so much more dangerous.</p>
            </div>
        </div>
        
        <div style={{ background: '#f5d0fe', padding: '1.5rem', borderRadius: '16px', marginTop: '1.5rem', textAlign: 'center', border: '2px dashed #d8b4fe' }}>
            <p style={{ fontSize: '1.2rem', color: '#6b21a8', margin: 0 }}><strong>Key Concept:</strong> Kinetic Energy is the "Work" stored in motion. To stop a moving object, you have to do an equal amount of "Negative Work" (like braking).</p>
        </div>
      </article>

      <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <article className="glass-card fade-in" style={{ animationDelay: '0.5s', flex: '1 1 45%', background: '#f0fdf4', border: '1px solid #d9f99d', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: '#15803d', borderBottom: '2px solid #bbf7d0', paddingBottom: '0.5rem' }}>Example 1: Calculating Baseline KE</h2>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', marginTop: '1rem', marginBottom: '1rem', flex: 1, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
               <p style={{ fontWeight: 'bold' }}>An object of mass 15 kg is moving with a uniform velocity of 4 m s⁻¹. What is the kinetic energy possessed by the object?</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #bbf7d0' }}>
               <img src={`${PREFIX}/s/articles/69c24807bd3e7f3a68c41535/images/image-20260324134502-6.png`} style={{ maxWidth: '100%', height: 'auto' }} alt="Example 1 Solution" />
            </div>
          </article>

          <article className="glass-card fade-in" style={{ animationDelay: '0.6s', flex: '1 1 45%', background: '#ecfdf5', border: '1px solid #bcf6a1', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: '#166534', borderBottom: '2px solid #bbf7d0', paddingBottom: '0.5rem' }}>Example 2: Work to Change Speed</h2>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', marginTop: '1rem', marginBottom: '1rem', flex: 1, boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
               <p style={{ fontWeight: 'bold' }}>What is the work to be done to increase the velocity of a car from 30 km h⁻¹ to 60 km h⁻¹ if the mass of the car is 1500 kg?</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #bbf7d0' }}>
               <img src={`${PREFIX}/s/articles/69c24807bd3e7f3a68c41535/images/image-20260324134502-7.png`} style={{ maxWidth: '100%', height: 'auto', maxHeight: '500px' }} alt="Example 2 Solution" />
            </div>
      </article>

      {/* Activity 1 (Simulation 9) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'linear-gradient(145deg, #fffbeb, #ccfbf1)', border: '1px solid #5eead4', alignItems: 'stretch' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f766e', marginBottom: '1rem' }}>Interactive: Mass vs Kinetic Energy</h2>
          <p style={{ color: '#115e59', fontSize: '1.05rem', lineHeight: '1.6' }}>Adjust the mass to see how kinetic energy scales linearly. Doubling the mass doubles the KE.</p>
          <div id="sim9-controls" style={{ marginTop: '2rem' }}></div>
        </div>
        <div id="sim9-canvas" style={{ flex: '1 1 45%', minWidth: '300px', background: 'rgba(248,250,252,0.5)', borderRadius: '1.5rem', overflow: 'hidden', minHeight: '350px', position: 'relative' }}>
        </div>
      </article>

      {/* Activity 2 (Simulation 10) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.6s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'linear-gradient(145deg, #fdf4ff, #fae8ff)', border: '1px solid #f0abfc', alignItems: 'stretch' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#86198f', marginBottom: '1rem' }}>Interactive: Velocity vs Kinetic Energy</h2>
          <p style={{ color: '#701a75', fontSize: '1.05rem', lineHeight: '1.6' }}>Adjust the velocity to see the parabolic curve! Because velocity is squared in the formula, doubling velocity quadruples the Kinetic Energy.</p>
          
          <div style={{ background: 'rgba(255,255,255,0.7)', padding: '1rem', borderRadius: '12px', border: '2px dashed #f0abfc', margin: '1rem 0', color: '#86198f', textAlign: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Velocity from Kinetic Energy:</span><br/>
            <span style={{ fontSize: '1.4rem', fontFamily: 'monospace', display: 'inline-block', marginTop: '0.5rem', fontWeight: 'bold' }}>
              v = &radic;<span style={{ borderTop: '2px solid #86198f', paddingTop: '2px' }}>(2 &times; KE / m)</span>
            </span>
          </div>

          <div id="sim10-controls" style={{ marginTop: '2rem' }}></div>
        </div>
        <div id="sim10-canvas" style={{ flex: '1 1 45%', minWidth: '300px', background: 'rgba(248,250,252,0.5)', borderRadius: '1.5rem', overflow: 'hidden', minHeight: '350px', position: 'relative' }}>
        </div>
      </article>

    </div>

    </div>
  );
};

export default ChapterTwoThree;
