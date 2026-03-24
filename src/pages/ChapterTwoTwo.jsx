import React, { useEffect } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import { initSim7, initSim8 } from '../lib/simulations';

const PREFIX = 'https://login.skillizee.io';

const ChapterTwoTwo = () => {
  useEffect(() => {
    initSim7();
    initSim8();
  }, []);

  return (
    <div className="ui-grid fade-in" id="view-chapter-2.2">
      <header className="glass-card header-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
        <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#ea580c', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module 2</h2>
          <h1 className="bouncy-header" style={{ color: '#9a3412', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
             <span>Chapter</span> <span>2</span> <span>:</span> <span>The</span> <span>Many</span> <span>Faces</span> <span>of</span> <span>Energy</span> <span>(Forms)</span>
          </h1>
        </div>
      </header>

      {/* Video Section */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'linear-gradient(145deg, #ffffff, #fff7ed)', border: '1px solid #fed7aa' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <CustomVideoPlayer src="/videos/XiNx7YBnM-s.mp4" title="Different Forms Of Energy | Physics" />
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#c2410c', marginBottom: '1rem' }}>Energy is the ultimate shape-shifter</h2>
          <p style={{ fontSize: '1.1rem', color: '#431407', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            It can change its appearance depending on where it is and what it is doing. Here are the most common forms you'll encounter.
          </p>
        </div>
      </article>

      {/* The Big Two: Mechanical Energy */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '2px solid #86efac' }}>
        <h2 style={{ fontSize: '2rem', color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           The "Big Two": Mechanical Energy
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#14532d', marginBottom: '1.5rem' }}>
          Mechanical energy is the total energy an object has due to its motion or its position. It is actually a "team" made up of two parts:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ background: 'white', border: '1px solid #bbf7d0' }}>
            <h3 style={{ color: '#15803d', fontSize: '1.3rem', marginBottom: '0.5rem' }}>🏃 Kinetic Energy</h3>
            <p style={{ color: '#14532d', lineHeight: '1.6' }}>The energy of motion. If it's moving (like a flying arrow), it has Kinetic Energy.</p>
          </div>
          <div className="glass-card" style={{ background: 'white', border: '1px solid #bbf7d0' }}>
            <h3 style={{ color: '#15803d', fontSize: '1.3rem', marginBottom: '0.5rem' }}>⛰️ Potential Energy</h3>
            <p style={{ color: '#14532d', lineHeight: '1.6' }}>The energy of position. If it's waiting to move (like a ball sitting at the top of a hill), it has Potential Energy.</p>
          </div>
        </div>
      </article>

      {/* Other Famous Forms */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)', border: '2px solid #ddd6fe' }}>
        <h2 style={{ fontSize: '2rem', color: '#5b21b6', marginBottom: '1rem' }}>Other Famous Forms</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
           <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div className="glass-card" style={{ background: 'white', borderLeft: '6px solid #8b5cf6' }}>
               <h3 style={{ color: '#6d28d9', fontSize: '1.2rem', marginBottom: '0.5rem' }}>🔥 Heat (Thermal) Energy</h3>
               <p style={{ color: '#4c1d95' }}>The energy of vibrating atoms. It's what makes your cocoa hot!</p>
             </div>
             <div className="glass-card" style={{ background: 'white', borderLeft: '6px solid #10b981' }}>
               <h3 style={{ color: '#059669', fontSize: '1.2rem', marginBottom: '0.5rem' }}>🧪 Chemical Energy</h3>
               <p style={{ color: '#047857' }}>Energy stored in the bonds of molecules. This is found in the food you eat and the batteries in your remote.</p>
             </div>
             <div className="glass-card" style={{ background: 'white', borderLeft: '6px solid #eab308' }}>
               <h3 style={{ color: '#ca8a04', fontSize: '1.2rem', marginBottom: '0.5rem' }}>⚡ Electrical Energy</h3>
               <p style={{ color: '#a16207' }}>The energy of moving electrons. It powers our lights, phones, and computers.</p>
             </div>
             <div className="glass-card" style={{ background: 'white', borderLeft: '6px solid #3b82f6' }}>
               <h3 style={{ color: '#2563eb', fontSize: '1.2rem', marginBottom: '0.5rem' }}>💡 Light Energy</h3>
               <p style={{ color: '#1d4ed8' }}>A form of electromagnetic radiation that allows us to see the world.</p>
             </div>
           </div>
           <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
              <img src={`${PREFIX}/s/articles/69c23c1540cacaa971a783a2/images/image-20260324125407-2.png`} alt="Energy Forms" style={{ width: '100%', borderRadius: '1.5rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
           </div>
        </div>
      </article>

      {/* Energy Transformation */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #ecfeff, #ccfbf1)', border: '2px solid #5eead4' }}>
        <h2 style={{ fontSize: '2rem', color: '#0f766e', marginBottom: '1rem' }}>Are Various Energy Forms Interconvertible?</h2>
        <p style={{ fontSize: '1.1rem', color: '#115e59', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          Yes. In nature, energy is constantly transforming from one form to another. The total energy of an isolated system remains constant during these changes.
        </p>

        <h3 style={{ color: '#0d9488', fontSize: '1.5rem', marginBottom: '1rem' }}>Common Examples of Transformation</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
           <div className="glass-card" style={{ background: 'white' }}>
             <p style={{ color: '#115e59' }}><strong>Mechanical to Electrical:</strong> Falling water turns a turbine (mechanical), converted into electrical energy by a generator.</p>
           </div>
           <div className="glass-card" style={{ background: 'white' }}>
             <p style={{ color: '#115e59' }}><strong>Electrical to Heat/Light:</strong> Switching on a bulb converts electrical energy into light and heat energy.</p>
           </div>
           <div className="glass-card" style={{ background: 'white' }}>
             <p style={{ color: '#115e59' }}><strong>Chemical to Heat/Mechanical:</strong> Eating food converts chemical energy into heat (body temp) and mechanical energy (muscles).</p>
           </div>
           <div className="glass-card" style={{ background: 'white' }}>
             <p style={{ color: '#115e59' }}><strong>Electrical to Sound:</strong> In a loudspeaker, electrical signals are converted into sound energy.</p>
           </div>
        </div>
        <img src={`${PREFIX}/s/articles/69c23c1540cacaa971a783a2/images/image-20260324125407-3.png`} alt="Energy Transformations" style={{ width: '100%', maxWidth: '600px', display: 'block', margin: '0 auto', borderRadius: '1rem' }} />
      </article>

      {/* Activity 1 (Simulation 7) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.6s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'linear-gradient(145deg, #fffbeb, #ccfbf1)', border: '1px solid #5eead4' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f766e', marginBottom: '1rem' }}>Activity: Dropping the Ball</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#115e59', fontSize: '1.05rem' }}>
            <li>📍 <b>Step 1:</b> Take a heavy ball. Drop it on a thick bed of wet sand from a height of about 25 cm.</li>
            <li>📏 <b>Step 2:</b> Repeat from heights of 50 cm, 1m, and 1.5 m.</li>
            <li>👀 <b>Step 3:</b> Ensure the depressions are distinctly visible and mark them.</li>
            <li>🤔 <b>Discuss:</b> Which is deepest? Which is shallowest? Why? What caused the deeper dent?</li>
          </ul>
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', background: '#000', borderRadius: '1.5rem', overflow: 'hidden', minHeight: '300px', position: 'relative' }}>
          <canvas id="sim7-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Interactive: Ball Drop on Sand</div>
        </div>
      </article>

      {/* Activity 2 (Simulation 8) */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.7s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', background: 'linear-gradient(145deg, #fdf4ff, #fae8ff)', border: '1px solid #f0abfc' }}>
         <div style={{ flex: '1 1 45%', minWidth: '300px', background: '#000', borderRadius: '1.5rem', overflow: 'hidden', minHeight: '300px', position: 'relative' }}>
          <canvas id="sim8-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.7)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Interactive: Trolley & Wooden Block</div>
         </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', color: '#86198f', marginBottom: '1rem' }}>Activity: The Moving Trolley</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#701a75', fontSize: '1.05rem' }}>
            <li>🛒 <b>Step 1:</b> Set up the apparatus with a trolley and a fixed wooden block.</li>
            <li>⚖️ <b>Step 2:</b> Place a known mass on the pan so the trolley starts moving.</li>
            <li>💥 <b>Step 3:</b> The trolley hits the block and displaces it.</li>
            <li>📝 <b>Analyze:</b> Note the displacement. Work is done by the trolley. Where did the energy come from?</li>
            <li>🔄 <b>Repeat:</b> Increase the mass on the pan. In which case is the displacement more?</li>
          </ul>
          <p style={{ marginTop: '1rem', color: '#701a75', fontWeight: 'bold', background: 'rgba(255,255,255,0.6)', padding: '1rem', borderRadius: '1rem' }}>
            In this activity, the moving trolley does work and hence it possesses energy.
          </p>
        </div>
      </article>

    </div>
  );
};

export default ChapterTwoTwo;
