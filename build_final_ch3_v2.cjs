const fs = require('fs');

const jsxContent = \import React, { useEffect } from 'react';
import { initSim1, cleanupSim1, initSim2, cleanupSim2, initSim3, cleanupSim3 } from '../lib/simulations';

const ChapterOneThree = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
        initSim1();
        initSim2();
        initSim3();
    }, 100);
    return () => {
        clearTimeout(timer);
        cleanupSim1();
        cleanupSim2();
        cleanupSim3();
    };
  }, []);

  return (
    <div id="view-chapter-1.3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>

      {/* HEADER */}
      <div className="glass-card banner-card fade-in" style={{ width: '100%', maxWidth: '1000px', marginTop: '3rem', textAlign: 'center', padding: '2rem' }}>
        <div className="header-content" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
            <span className="module-badge">Module 1</span>
        </div>
        <h2>Chapter 3: WORK DONE BY A CONSTANT FORCE</h2>
      </div>

      {/* VIDEO AND DIAGRAM */}
      <div style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}> 
        <article className="glass-card fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: '#1e293b' }}>Introduction</h3>
            <div className="video-container" style={{ flexGrow: 1, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex' }}>
                <iframe style={{ width: '100%', minHeight: '260px', border: 'none' }} src="https://www.youtube.com/embed/d6MhIBpmJnE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </article>
        <article className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-1.png" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '1rem' }} alt="Force Diagram" />
            <p style={{ marginTop: '1rem', color: 'var(--text-light)', fontStyle: 'italic', textAlign: 'center', background: 'var(--glass-bg)', padding: '0.75rem', borderRadius: '0.5rem', width: '100%' }}>Fig 1: Force (F) applied on an object, resulting in displacement (s).</p>
        </article>
      </div>

      {/* MATH DEF & KEY CHARACTERISTICS */}
      <div style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>      
        <article className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 dir="ltr" style={{ borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>The Mathematical Definition of Work</h3>
            <p dir="ltr" style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>When a constant force (<b>F</b>) acts on an object and moves it through a distance (<b>s</b>) in the same direction as the force, the work done (<b>W</b>) is calculated as:</p>
            <div style={{ background: 'var(--glass-bg)', padding: '1rem', borderRadius: '0.75rem', margin: '1rem 0', textAlign: 'center', boxShadow: 'var(--inner-well)' }}>
                <p dir="ltr" style={{ fontSize: '1.1rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}><b>Work done = force &times; displacement</b></p>      
                <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-2.png" style={{ height: '35px', maxWidth: '100%', objectFit: 'contain' }} alt="W = F x s" />
            </div>
        </article>

        <article className="glass-card fade-in">
            <h3 dir="ltr" style={{ borderBottom: '2px solid #10b981', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Key Characteristics of Work</h3>
            <ul style={{ marginLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-dark)', lineHeight: '1.5' }}>
                <li dir="ltr"><b>Scalar Quantity:</b> Work has magnitude only, no direction. Even though force and displacement are vectors, their product (work) is just a value.</li>
                <li dir="ltr"><b>The Unit (The Joule):</b> The standard unit is the Newton-metre (N m), renamed the <b>Joule (J)</b>.</li>
                <li dir="ltr" style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', borderLeft: '4px solid #10b981', listStyleType: 'none', marginLeft: '-1.2rem' }}><b>Definition of 1 Joule:</b> 1 J is the work done when a force of 1 N displaces an object by 1 m in the direction of the force.</li>
            </ul>
        </article>
      </div>

      {/* SIMULATION 1: Pebble vs Wall */}
      <article className="glass-card fade-in" style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
            <div className="header-content" style={{ marginBottom: '0.5rem' }}>
                <span className="module-badge" style={{ background: '#ec4899', color: 'white' }}>Interactive Lab 1</span>
            </div>
            <h3 dir="ltr" style={{ margin: 0 }}>Pushing the Wall vs the Pebble</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Push against the immovable wall (zero displacement) vs pushing the pebble (displacement).</p>
        </div>
        
        <div style={{ minHeight: '380px', backgroundColor: '#e2e8f0', position: 'relative' }}>
            <canvas id="sim1-canvas" style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', pointerEvents: 'auto' }}>
                <button id="sim1-btn-wall" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#ef4444', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)' }}>Push Wall</button>
                <button id="sim1-btn-pebble" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}>Push Pebble</button>
                <button id="sim1-btn-reset" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: 'white', color: '#475569', fontWeight: 'bold', border: '1px solid #cbd5e1', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>Reset</button>
            </div>
            
            <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '1rem', width: '160px', pointerEvents: 'none', background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '0.4rem', background: '#eff6ff', borderRadius: '0.4rem', marginBottom: '0.3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#1d4ed8' }}>
                        <span>App. Force:</span><span id="sim1-stat-force">0 N</span>
                    </div>
                </div>
                <div style={{ padding: '0.4rem', background: '#fef2f2', borderRadius: '0.4rem', marginBottom: '0.3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#b91c1c' }}>
                        <span>Disp (s):</span><span id="sim1-stat-disp">0.00 m</span>
                    </div>
                </div>
                <div style={{ padding: '0.4rem', background: '#ecfdf5', borderRadius: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#047857', fontWeight: 'bold' }}>
                        <span>Work:</span><span id="sim1-stat-work">0 J</span>
                    </div>
                </div>
            </div>
        </div>
      </article>

      {/* ZERO WORK CONDITIONS - HORIZONTAL CARDS */}
      <article className="glass-card fade-in" style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
        <h2 dir="ltr" style={{ textAlign: 'center', marginBottom: '1rem' }}>Analyzing the "Zero Work" Conditions</h2>
        <p dir="ltr" style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-light)', maxWidth: '800px', lineHeight: '1.6' }}>Work is a <b>"team effort"</b> between force and displacement. If either is missing, total work collapses to zero.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {/* Condition 1 */}
            <div className="hover-lift" style={{ background: '#fffbeb', border: '1px solid #fde047', padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', transition: 'all 0.3s ease' }}>
                <div style={{ minWidth: '120px', flexShrink: 0 }}>
                    <h3 dir="ltr" style={{ color: '#b45309', margin: 0 }}>1. F = 0</h3>
                </div>
                <div style={{ flexGrow: 1 }}>
                    <div style={{ background: 'rgba(255,255,255,0.6)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.5rem' }}>
                        <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-4.png" style={{ height: '30px', maxWidth: '100%', objectFit: 'contain' }} alt="0 x s = 0" />
                    </div>
                    <p dir="ltr" style={{ margin: 0, fontSize: '0.95rem' }}>An object sliding at a constant velocity in deep space. It is moving, but since no force is pushing it, no work is done.</p>
                </div>
            </div>

            {/* Condition 2 */}
            <div className="hover-lift" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', transition: 'all 0.3s ease' }}>
                <div style={{ minWidth: '120px', flexShrink: 0 }}>
                    <h3 dir="ltr" style={{ color: '#1d4ed8', margin: 0 }}>2. s = 0</h3>
                </div>
                <div style={{ flexGrow: 1 }}>
                    <div style={{ background: 'rgba(255,255,255,0.6)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.5rem' }}>
                        <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-5.png" style={{ height: '30px', maxWidth: '100%', objectFit: 'contain' }} alt="F x 0 = 0" />
                    </div>
                    <p dir="ltr" style={{ margin: 0, fontSize: '0.95rem' }}>Pushing against a solid brick wall. You apply force, but the wall hasn't moved, so you've done zero work on it.</p>
                </div>
            </div>
        </div>
      </article>

      {/* TABLE SUMMARY */}
      <article className="glass-card fade-in" style={{ width: '100%', maxWidth: '1000px', padding: '0', overflow: 'hidden' }}> 
        <div style={{ padding: '1rem', background: 'var(--accent-color)' }}>
             <h3 style={{ textAlign: 'center', color: 'white', margin: 0 }}>Summary of Conditions</h3>
        </div>
        <div className="table-responsive" style={{ overflowX: 'auto', padding: '1.5rem' }}>
            <table className="glass-table" style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                    <tr style={{ background: 'var(--glass-bg)', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '0.75rem', color: 'var(--text-dark)' }}>Force (F)</th>
                        <th style={{ padding: '0.75rem', color: 'var(--text-dark)' }}>Displacement (s)</th>
                        <th style={{ padding: '0.75rem', color: 'var(--text-dark)' }}>Work Done (W)</th>
                        <th style={{ padding: '0.75rem', color: 'var(--text-dark)', textAlign: 'left' }}>Real-world Context</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem' }}>Present</td>
                        <td style={{ padding: '0.75rem' }}>Present</td>
                        <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 'bold', background: '#ecfdf5' }}>Positive</td>
                        <td style={{ padding: '0.75rem', textAlign: 'left' }}>Pulling a wagon forwards.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.75rem' }}>Zero</td>
                        <td style={{ padding: '0.75rem' }}>Present</td>
                        <td style={{ padding: '0.75rem', color: '#64748b', fontWeight: 'bold', background: '#f8fafc' }}>Zero</td>
                        <td style={{ padding: '0.75rem', textAlign: 'left' }}>Coasting in a vacuum.</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '0.75rem' }}>Present</td>
                        <td style={{ padding: '0.75rem' }}>Zero</td>
                        <td style={{ padding: '0.75rem', color: '#64748b', fontWeight: 'bold', background: '#f8fafc' }}>Zero</td>
                        <td style={{ padding: '0.75rem', textAlign: 'left' }}>Holding a heavy box completely still.</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </article>

      {/* POSITIVE / NEGATIVE WORK HORIZONTAL */}
      <article className="glass-card fade-in" style={{ width: '100%', maxWidth: '1000px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="hover-lift" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'all 0.3s ease' }}>
              <div style={{ flex: '1 1 300px' }}>
                  <h3 dir="ltr" style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Basic Positive Work</h3>
                  <p dir="ltr" style={{ margin: 0, fontSize: '0.95rem' }}>A force of <b>5 N</b> is acting on an object. The object is displaced through <b>2 m</b> in the direction of the force.</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#6d28d9' }}>Work = 5 N &times; 2 m = <b>10 J</b></p>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                  <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-6.png" style={{ maxHeight: '60px', objectFit: 'contain' }} alt="5N over 2m" />
              </div>
          </div>

          <div className="hover-lift" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'all 0.3s ease' }}>
              <div style={{ flex: '1 1 300px' }}>
                  <h3 dir="ltr" style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Negative Work (Retarding)</h3>
                  <p dir="ltr" style={{ margin: 0, fontSize: '0.95rem' }}>An object moves with a uniform velocity. A force <b>F</b> is applied in the <b>opposite</b> direction.</p>
                  <p style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#b91c1c' }}>Work done = <b>-F &times; s</b></p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>(Angle between directions is <b>180&deg;</b>)</p>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'center', display: 'flex', gap: '1rem' }}>
                  <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-7.png" style={{ maxHeight: '50px', objectFit: 'contain' }} alt="Opposite direction 1" />
                  <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-8.png" style={{ maxHeight: '50px', objectFit: 'contain' }} alt="Opposite direction 2" />
              </div>
          </div>
      </article>

      {/* SIMULATION 2: The Pull Engine */}
      <article className="glass-card fade-in" style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
            <div className="header-content" style={{ marginBottom: '0.5rem' }}>
                <span className="module-badge" style={{ background: '#ec4899', color: 'white' }}>Interactive Lab 2</span>
            </div>
            <h3 dir="ltr" style={{ margin: 0 }}>The Pull Engine</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Pull the cart and observe positive work being done as force and displacement align.</p>
        </div>
        
        <div style={{ minHeight: '380px', backgroundColor: '#f0fdfa', position: 'relative' }}>
            <canvas id="sim2-canvas" style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', pointerEvents: 'auto' }}>
                <button id="sim2-btn-pull" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#8b5cf6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)' }}>Hold to Pull Cart</button>
                <button id="sim2-btn-reset" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: 'white', color: '#475569', fontWeight: 'bold', border: '1px solid #cbd5e1', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>Reset</button>
            </div>
            
            <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '1rem', width: '160px', pointerEvents: 'none', background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '0.4rem', background: '#eff6ff', borderRadius: '0.4rem', marginBottom: '0.3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#1d4ed8' }}>
                        <span>Force:</span><span id="sim2-stat-force">0 N</span>
                    </div>
                </div>
                <div style={{ padding: '0.4rem', background: '#fef2f2', borderRadius: '0.4rem', marginBottom: '0.3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#b91c1c' }}>
                        <span>Disp (s):</span><span id="sim2-stat-disp">0.00 m</span>
                    </div>
                </div>
                <div style={{ padding: '0.4rem', background: '#ecfdf5', borderRadius: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#047857', fontWeight: 'bold' }}>
                        <span>Work:</span><span id="sim2-stat-work">0 J</span>
                    </div>
                </div>
            </div>
        </div>
      </article>

      {/* INTERACTIVE 3D DEMO & ACTIVITY SIDE-BY-SIDE */}
      <div className="content-grid-half" style={{ width: '100%', maxWidth: '1000px', gap: '1.5rem', alignItems: 'stretch' }}>
          
          {/* SIMULATION 3 */}
          <article className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                <div className="header-content" style={{ marginBottom: '0.5rem' }}>
                    <span className="module-badge" style={{ background: '#ec4899', color: 'white' }}>Interactive Lab 3</span>
                </div>
                <h3 dir="ltr" style={{ margin: 0 }}>Lifting Simulation</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Press and hold to lift gravity's weight. Observe the vectors.</p>
            </div>
            
            <div style={{ flexGrow: 1, minHeight: '380px', backgroundColor: '#f8fafc', position: 'relative' }}>
                <canvas id="sim3-canvas" style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }}></canvas>
                
                <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', pointerEvents: 'auto' }}>
                    <button id="sim3-btn-lift" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'grab', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}>Hold to Lift</button>
                    <button id="sim3-btn-reset" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: 'white', color: '#475569', fontWeight: 'bold', border: '1px solid #cbd5e1', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>Reset</button>
                </div>
                
                {/* HUD */}
                <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '1rem', width: '160px', pointerEvents: 'none', background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
                        <span>Mass</span><span style={{ fontWeight: 'bold', color: '#1e293b' }}>15 kg</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>
                        <span>Disp(s)</span><span id="sim3-stat-disp" style={{ fontWeight: 'bold', color: '#1e293b' }}>0.00 m</span>
                    </div>
                    
                    <div style={{ padding: '0.4rem', background: '#eff6ff', borderRadius: '0.4rem', marginBottom: '0.3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#1d4ed8' }}>
                            <span>App. Force:</span><span id="sim3-stat-app-force">0 N</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#1d4ed8', fontWeight: 'bold', marginTop: '0.2rem' }}>
                            <span>Work:</span><span id="sim3-stat-app-work">+0 J</span>
                        </div>
                    </div>
                    
                    <div style={{ padding: '0.4rem', background: '#fef2f2', borderRadius: '0.4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#b91c1c' }}>
                            <span>Gravity:</span><span id="sim3-stat-grav-force">-150 N</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#b91c1c', fontWeight: 'bold', marginTop: '0.2rem' }}>
                            <span>Work:</span><span id="sim3-stat-grav-work">-0 J</span>
                        </div>
                    </div>
                </div>
            </div>
          </article>

          {/* ACTIVITY Q&A ANALYSIS */}
          <article className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.5)' }}>
              
              <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid #f1f5f9' }}>
                  <h3 dir="ltr" style={{ color: '#ea580c', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>Observation Activity</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', margin: 0 }}>Lift the object up using the simulation. Two active forces are at play.</p>
                  <ul style={{ marginLeft: '1.2rem', fontSize: '0.9rem', marginTop: '0.5rem', color: '#475569', marginBottom: 0 }}>
                      <li>Which force does positive work?</li>
                      <li>Which force does negative work?</li>
                  </ul>
              </div>

              <div className="hover-lift" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1rem', borderRadius: '1rem', flexGrow: 1, transition: 'all 0.3s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 dir="ltr" style={{ color: '#166534', margin: 0 }}>The Applied Force</h4>
                      <div style={{ background: '#22c55e', color: 'white', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Positive (+W)</div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#14532d', lineHeight: '1.5', margin: 0 }}>You're pulling upwards, and it moves upwards. Force and displacement are in the exactly same direction (0&deg; angle).</p>
              </div>

              <div className="hover-lift" style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '1rem', flexGrow: 1, transition: 'all 0.3s ease' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 dir="ltr" style={{ color: '#991b1b', margin: 0 }}>The Gravity Force</h4>
                      <div style={{ background: '#ef4444', color: 'white', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Negative (-W)</div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#7f1d1d', lineHeight: '1.5', margin: 0 }}>Gravity exerts downward pull, but displacement is upwards. They are in pure opposite directions (180&deg; angle).</p>
              </div>

          </article>
      </div>

      {/* FINAL EXAMPLES & EXERCISE */}
      <div style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>      
          <article className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 dir="ltr" style={{ borderBottom: '2px solid #06b6d4', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Calculating Example</h3>
              <div style={{ background: 'var(--glass-bg)', padding: '1.25rem', borderRadius: '0.75rem', fontStyle: 'italic', color: '#334155', marginBottom: '1rem', flexGrow: 1 }}>
                  "A porter lifts a luggage of 15 kg from the ground and puts it on his head 1.5 m above the ground. Calculate the work done by him."
              </div>
              
              <div style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', borderLeft: '4px solid #06b6d4', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <p style={{ marginBottom: '0.3rem', fontSize: '0.9rem' }}><b>Given:</b> m = 15 kg, s = 1.5 m</p>
                  <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}><b>Formula:</b> W = (mg) &times; s</p>
                  <div style={{ background: '#f1f5f9', padding: '0.75rem', borderRadius: '0.5rem', fontFamily: '"Courier New", Courier, monospace', fontSize: '0.95rem', color: '#0f172a' }}>
                      <p>W = (15 &times; 10) &times; 1.5</p>
                      <p>W = 150 &times; 1.5</p>
                      <p style={{ color: '#0284c7', fontWeight: 'bold', marginTop: '0.3rem', fontSize: '1.05rem' }}>Work = 225 J</p>
                  </div>
              </div>
          </article>

          <article className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 dir="ltr" style={{ borderBottom: '2px solid #f59e0b', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Chapter Review</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Test your understanding of constant force applications:</p>
              
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="hover-lift" style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', display: 'flex', gap: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}>
                      <div style={{ background: '#fef3c7', color: '#b45309', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                      <p style={{ fontSize: '0.9rem', margin: 0, color: '#334155' }}>When do we say that work is done?</p>
                  </div>
                  <div className="hover-lift" style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', display: 'flex', gap: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}>
                      <div style={{ background: '#fef3c7', color: '#b45309', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                      <p style={{ fontSize: '0.9rem', margin: 0, color: '#334155' }}>Write an expression for the work done when a force is acting on an object in the direction of its displacement.</p>
                  </div>
                  <div className="hover-lift" style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', display: 'flex', gap: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'all 0.3s ease' }}>
                      <div style={{ background: '#fef3c7', color: '#b45309', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                      <p style={{ fontSize: '0.9rem', margin: 0, color: '#334155' }}>Define 1 Joule of work.</p>
                  </div>
              </div>
          </article>
      </div>

    </div>
  );
};

export default ChapterOneThree;
\;

fs.writeFileSync('src/pages/ChapterOneThree.jsx', jsxContent);
console.log('ChapterOneThree.jsx updated successfully!');
