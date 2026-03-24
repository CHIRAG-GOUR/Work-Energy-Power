import React, { useEffect } from 'react';
import { initSim5, initSim6 } from '../lib/simulations';

const PREFIX = 'https://login.skillizee.io';

const ChapterTwoOne = () => {
  useEffect(() => {
    initSim5();
    initSim6();
  }, []);

  return (
    <div className="ui-grid fade-in" id="view-chapter-2.1">
      <header className="glass-card header-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
        <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#ea580c', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module 2</h2>
          <h1 className="bouncy-header" style={{ color: '#9a3412', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
             <span>Chapter</span> <span>1</span> <span>:</span> <span>Energy</span>
          </h1>
        </div>
      </header>

      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'linear-gradient(145deg, #ffffff, #fff7ed)', border: '1px solid #fed7aa' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
            <h2 style={{ color: '#ea580c', fontSize: '2rem', marginBottom: '1rem' }}>1. What is Energy?</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>In our daily lives, we use the word "energy" to describe how we feel. In science, however, energy has a very specific job description: <strong>Energy is the capacity to do work.</strong></p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>If an object can push, pull, or move something else, it possesses energy.</p>
            
            <div style={{ padding: '1.5rem', background: '#ffedd5', borderRadius: '16px', marginTop: '1.5rem', boxShadow: 'var(--inner-well)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#c2410c' }}>The Energy "Handshake" (Transfer)</h3>
                <p>Think of energy like money in a bank account. To get something done (Work), you have to "spend" some energy.</p>
                <ul className="info-list" style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li><strong>The Giver:</strong> The object that does the work loses energy.</li>
                <li><strong>The Receiver:</strong> The object on which work is done gains energy.</li>
                </ul>
                <div style={{ background: '#fff', borderLeft: '5px solid #f97316', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ margin: 0 }}><strong>Example:</strong> When a moving cricket ball hits a wicket, the ball "spends" its energy to knock the wicket over. The ball slows down (loses energy), and the wicket flies away (gains energy).</p>
                </div>
            </div>
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <img src={`${PREFIX}/s/articles/69c23526765c381e969f6171/images/image-20260324122433-1.png`} style={{ maxWidth: '100%', height: 'auto', borderRadius: '24px', boxShadow: '0 10px 25px rgba(234, 88, 12, 0.2)', border: '4px solid white' }} alt="Energy" />
        </div>
      </article>

      <article className="glass-card fade-in" style={{ gridColumn: '1 / -1', background: '#fff7ed', border: '2px solid #fdba74', padding: '1.5rem', marginTop: '1rem', borderRadius: '24px' }}>
          <h3 style={{ color: '#c2410c', textAlign: 'center', marginBottom: '1rem', fontSize: '1.8rem' }}>Interactive: The Energy Handshake (Cricket)</h3>
          <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '16px', overflow: 'hidden', background: '#ffedd5', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)' }}>
            <canvas id="sim5-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
               <button id="sim5-btn-bowl" className="interactive-btn" style={{ background: '#ea580c', color: 'white', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 0 #9a3412', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Bowl Ball</button>
               <button id="sim5-btn-reset" className="interactive-btn" style={{ background: '#64748b', color: 'white', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 0 #475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Reset</button>
            </div>
            
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.95)', padding: '15px 25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '2px solid #fdba74' }}>
               <div style={{ marginBottom: '8px', color: '#b91c1c', fontWeight: 'bold', fontSize: '1.1rem' }}>Ball Energy: <span id="sim5-stat-balle">0 J</span></div>
               <div style={{ color: '#b45309', fontWeight: 'bold', fontSize: '1.1rem' }}>Wicket Energy: <span id="sim5-stat-wickete">0 J</span></div>
            </div>
          </div>
      </article>

      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap-reverse', gap: '2rem', alignItems: 'center', background: 'linear-gradient(145deg, #fffbeb, #ffffff)', border: '1px solid #fde68a' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <img src={`${PREFIX}/s/articles/69c23526765c381e969f6171/images/image-20260324122433-2.png`} style={{ maxWidth: '100%', height: 'auto', borderRadius: '24px', boxShadow: '0 10px 25px rgba(217, 119, 6, 0.2)', border: '4px solid white' }} alt="The Sun" />
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
            <h2 style={{ color: '#d97706', fontSize: '2rem', marginBottom: '1rem' }}>2. Where does Energy come from?</h2>
            <p style={{ fontSize: '1.1rem' }}>Energy doesn't just appear out of nowhere. It comes from various sources:</p>
            
            <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '16px', marginTop: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#b45309', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>☀️</span> The Sun
                </h3>
                <p><strong>Our ultimate powerhouse! Most of the energy we use (like food and wind) starts with sunlight.</strong></p>
                <div style={{ height: '2px', background: 'rgba(217,119,6,0.2)', margin: '1rem 0' }}></div>
                <ul className="info-list" style={{ paddingLeft: '1.5rem', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>The Earth's Interior:</strong> Heat trapped deep underground (Geothermal).</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Atoms:</strong> Energy stored in the tiny "building blocks" of matter (Nuclear).</li>
                <li><strong>The Tides:</strong> The powerful movement of ocean waves.</li>
                </ul>
            </div>
        </div>
      </article>

      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'linear-gradient(145deg, #ffffff, #fff1f2)', border: '1px solid #fecdd3' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
            <h2 style={{ color: '#e11d48', fontSize: '2rem', marginBottom: '1rem' }}>3. How Objects "Store" Energy</h2>
            <p style={{ fontSize: '1.1rem' }}>An object doesn't always have to be moving to have energy. Sometimes, it is just "waiting" to do work.</p>
            
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--card-shadow)', borderLeft: '4px solid #fb7185' }}>
                    <strong>By Height:</strong> A hammer raised high has the capability to drive a nail into wood once it's dropped.
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--card-shadow)', borderLeft: '4px solid #f43f5e' }}>
                    <strong>By Shape:</strong> A wound-up toy car or a stretched rubber band stores energy in its shape. When released, that stored energy turns into motion.
                </div>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: 'var(--card-shadow)', borderLeft: '4px solid #e11d48' }}>
                    <strong>By Compression:</strong> When you squeeze a balloon, you are using energy to change its shape. If you press too hard, that stored energy is released all at once as a "POP!"
                </div>
            </div>
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <img src={`${PREFIX}/s/articles/69c23526765c381e969f6171/images/image-20260324122433-3.png`} style={{ maxWidth: '100%', height: 'auto', borderRadius: '24px', boxShadow: '0 10px 25px rgba(225, 29, 72, 0.2)', border: '4px solid white' }} alt="Storing Energy" />
        </div>
      </article>

      <article className="glass-card fade-in" style={{ gridColumn: '1 / -1', background: '#fff1f2', border: '2px solid #fda4af', padding: '1.5rem', marginTop: '1rem', borderRadius: '24px' }}>
          <h3 style={{ color: '#be123c', textAlign: 'center', marginBottom: '1rem', fontSize: '1.8rem' }}>Interactive: Potential to Kinetic Energy</h3>
          <div style={{ position: 'relative', width: '100%', height: '450px', borderRadius: '16px', overflow: 'hidden', background: '#ffe4e6', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)' }}>
            <canvas id="sim6-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
               <button id="sim6-btn-drop" className="interactive-btn" style={{ background: '#e11d48', color: 'white', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 0 #9f1239', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Drop Hammer</button>
               <button id="sim6-btn-reset" className="interactive-btn" style={{ background: '#64748b', color: 'white', padding: '12px 30px', borderRadius: '30px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 0 #475569', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>Reset Platform</button>
            </div>
            
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.95)', padding: '15px 25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '2px solid #fda4af' }}>
               <div style={{ color: '#be123c', fontWeight: 'bold', fontSize: '1.1rem' }}>Status: <span id="sim6-stat-energy">100% Potential Energy (Stored)</span></div>
            </div>
          </div>
      </article>

      <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <article className="glass-card fade-in" style={{ animationDelay: '0.5s', flex: '1 1 45%', background: '#faf5ff', border: '1px solid #fbcfe8' }}>
            <h2 style={{ color: '#be123c' }}>4. Measuring Energy</h2>
            <p>Since energy is simply the ability to do work, we measure it using the exact same units as Work.</p>

            <ul className="info-list" style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <span style={{ display: 'inline-block', background: '#ffe4e6', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#9f1239', fontWeight: 'bold', marginRight: '0.5rem' }}>J</span>
                <strong>The Joule:</strong> The standard unit of energy.
              </li>
              <li>
                <span style={{ display: 'inline-block', background: '#ffe4e6', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#9f1239', fontWeight: 'bold', marginRight: '0.5rem' }}>kJ</span>
                <strong>The Kilo-joule:</strong> Used for larger amounts of energy.
                <ul style={{ paddingLeft: '2rem', marginTop: '0.8rem', listStyleType: 'circle' }}>
                    <li><strong style={{ color: '#be123c' }}>1 kJ = 1000 J</strong></li>
                    <li style={{ marginTop: '0.5rem', background: 'white', padding: '0.5rem', borderRadius: '6px' }}><strong>Did you know?</strong> To do 1 Joule of work, you must consume exactly 1 Joule of energy. It's a perfect 1:1 exchange.</li>
                </ul>
              </li>
            </ul>
          </article>

          <article className="glass-card fade-in" style={{ animationDelay: '0.6s', flex: '1 1 45%', background: '#fffbeb', border: '2px solid #fde68a', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ color: '#d97706', textAlign: 'center', fontSize: '2rem' }}><span style={{ fontSize: '2rem' }}>✅</span><br/>Summary Checklist</h2>
            <ol className="info-list" style={{ paddingLeft: '1.5rem', margin: '0 auto', maxWidth: '80%', fontSize: '1.1rem', lineHeight: '2' }}>
              <li><strong>Possession:</strong> If an object can do work, it has energy.</li>
              <li><strong>Transfer:</strong> Energy moves from the "worker" to the "object."</li>
              <li><strong>Units:</strong> Energy is measured in Joules (J).</li>
            </ol>
          </article>
      </div>

    </div>
  );
};

export default ChapterTwoOne;
