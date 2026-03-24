import React, { useEffect } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

const PREFIX = 'https://login.skillizee.io';

const ChapterTwoFour = () => {
  return (
    <div className="ui-grid fade-in" id="view-chapter-2.4">
      <header className="glass-card header-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
        <div className="header-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ color: '#ea580c', fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Module 2</h2>
          <h1 className="bouncy-header" style={{ color: '#9a3412', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
             <span>Chapter</span> <span>2.4</span> <span>:</span> <span>Potential</span> <span>Energy</span>
          </h1>
          <p className="subtitle" style={{ textAlign: 'center', fontSize: '1.2rem', color: '#b45309', marginTop: '0.5rem', fontWeight: 'bold' }}>The "Waiting" Energy</p>
        </div>
      </header>

      {/* Intro Video and Meaning */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: 'linear-gradient(145deg, #ffffff, #fff7ed)', border: '1px solid #fed7aa' }}>
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <CustomVideoPlayer src="/videos/eBsU9DVa7ws.mp4" title="The Difference Between Kinetic and Potential Energy" />
        </div>
        <div style={{ flex: '1 1 45%', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#c2410c', marginBottom: '1rem' }}>Energy Stored</h2>
          <p style={{ fontSize: '1.1rem', color: '#431407', lineHeight: '1.7', marginBottom: '1rem' }}>
            If Kinetic Energy is energy in motion, <strong>Potential Energy (PE) is energy that is stored</strong>. It is energy an object possesses because of its position or its shape (configuration).
          </p>
          <p style={{ fontSize: '1.1rem', color: '#431407', lineHeight: '1.7', background: '#ffedd5', padding: '1rem', borderRadius: '1rem' }}>
            Think of it as energy <strong>"held in reserve."</strong> The work you do on an object to change its position or shape doesn't just disappear; it gets saved inside the object.
          </p>
        </div>
      </article>

      {/* A vs B Section */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)', border: '2px solid #5eead4' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Energy of Shape */}
          <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f766e', marginBottom: '1rem' }}>A. Energy of Shape (Configuration)</h2>
            <p style={{ color: '#115e59', marginBottom: '1.5rem' }}>When you change the shape of an object, you are "charging" it with energy.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ background: 'white' }}>
                 <strong style={{ color: '#0d9488', fontSize: '1.2rem' }}>The Rubber Band</strong>
                 <p style={{ color: '#134e4a', marginTop: '0.5rem' }}>When you stretch it, your muscles do work. That work is stored in the band. When you let go, it snaps back.</p>
              </div>
              <div className="glass-card" style={{ background: 'white' }}>
                 <strong style={{ color: '#0d9488', fontSize: '1.2rem' }}>The Slinky</strong>
                 <p style={{ color: '#134e4a', marginTop: '0.5rem' }}>Whether you stretch it out or compress it like a spring, you are storing energy. The moment you release it, it moves!</p>
              </div>
              <div className="glass-card" style={{ background: 'white' }}>
                 <strong style={{ color: '#0d9488', fontSize: '1.2rem' }}>The Toy Car</strong>
                 <p style={{ color: '#134e4a', marginTop: '0.5rem' }}>As you wind the key, you are tightening a spring inside. The more you wind, the more Potential Energy you store, and the further it travels.</p>
              </div>
            </div>
          </div>
          
          {/* Energy of Position */}
          <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#0f766e', marginBottom: '1rem' }}>B. Energy of Position</h2>
            <p style={{ color: '#115e59', marginBottom: '1.5rem' }}>You can also store energy by changing where an object is located, especially its height.</p>
            <img src={`${PREFIX}/s/articles/69c259b77607715f4d06bde6/images/image-20260324150049-2.png`} alt="Bow and Arrow" style={{ width: '100%', maxWidth: '300px', borderRadius: '1rem', marginBottom: '1rem', display: 'block', border: '2px solid #5eead4' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ background: 'white' }}>
                 <strong style={{ color: '#0d9488', fontSize: '1.2rem' }}>The Bow and Arrow</strong>
                 <p style={{ color: '#134e4a', marginTop: '0.5rem' }}>When you pull the string back, the "Work" you did is now Potential Energy. Releasing it turns it into Kinetic Energy.</p>
              </div>
              <div className="glass-card" style={{ background: 'white' }}>
                 <strong style={{ color: '#0d9488', fontSize: '1.2rem' }}>Lifting a Ball</strong>
                 <p style={{ color: '#134e4a', marginTop: '0.5rem' }}>A heavy ball held over your head isn't moving, but it has the potential to fall and do work (like smashing a walnut).</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Slinky Discussion / How is PE stored */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1', background: 'linear-gradient(135deg, #fdf4ff, #fae8ff)', border: '2px solid #f0abfc' }}>
        <h2 style={{ fontSize: '2rem', color: '#86198f', marginBottom: '1rem' }}>Classroom Discussion: "The Slinky Test"</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
             <p style={{ fontSize: '1.1rem', color: '#701a75', fontWeight: 'bold' }}>Question: Does a slinky acquire energy when it is compressed?</p>
             <p style={{ fontSize: '1.1rem', color: '#4a044e', marginTop: '1rem', background: 'white', padding: '1.5rem', borderRadius: '1rem', borderLeft: '6px solid #d946ef' }}>
               <strong>Answer: Yes!</strong> Whether you stretch it or squash it, you are changing its natural shape. In both cases, the slinky wants to return to its original form, meaning it has stored energy ready to be released.
             </p>
             <CustomVideoPlayer src="/videos/paPGNsx-Uak.mp4" title="Slinky Test" />
          </div>

          <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#86198f', marginBottom: '1rem' }}>How is Potential Energy Stored?</h3>
            <p style={{ color: '#701a75', fontSize: '1.1rem', background: '#fdf4ff', border: '1px dashed #d946ef', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              <strong>A key rule to remember:</strong> Energy is stored as Potential Energy if it is NOT being used to change the object's speed.
            </p>
            <ol style={{ paddingLeft: '1.5rem', color: '#4a044e', fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><strong>Work is done:</strong> You exert force (pulling a string, lifting a weight).</li>
              <li><strong>Energy is transferred:</strong> Your energy moves into the object.</li>
              <li><strong>Position/Shape changes:</strong> The object stays still, but it is now in a "high-energy" state.</li>
            </ol>
            <div style={{ marginTop: '1.5rem', background: '#86198f', color: 'white', padding: '1rem', borderRadius: '1rem' }}>
              <strong>The Scientific Definition:</strong> Potential energy is the energy possessed by an object by virtue of its position (height) or configuration (shape).
            </div>
          </div>
        </div>
      </article>

    </div>
  );
};

export default ChapterTwoFour;
