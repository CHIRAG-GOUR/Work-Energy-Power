const fs = require('fs');

const jsxContent = \import React, { useEffect } from 'react';
import { initSim1, cleanupSim1, initSim3, cleanupSim3 } from '../lib/simulations';

const ChapterOneThree = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
        initSim1();
        initSim3();
    }, 100);
    return () => {
        clearTimeout(timer);
        cleanupSim1();
        cleanupSim3();
    };
  }, []);

  return (
    <div className="ui-grid" id="view-chapter-1.3">

      {/* HEADER */}
      <div className="glass-card banner-card fade-in" style={{ marginTop: '4rem', gridColumn: '1 / -1', padding: '2rem' }}>
        <div className="header-content" style={{ marginBottom: '1rem' }}>
            <span className="module-badge">Module 1</span>
        </div>
        <h2>Chapter 3: WORK DONE BY A CONSTANT FORCE</h2>
      </div>

      {/* VIDEO CARD */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}> 
        <h3 dir="ltr" style={{ borderBottom: '2px solid var(--accent-color)', paddingBottom: '0.5rem', marginBottom: '1rem', width: '100%', textAlign: 'center' }}>Work Done</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center' }}>
            <div className="video-container" style={{ width: '100%', maxWidth: '800px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', overflow: 'hidden', transform: 'scale(1)', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <iframe width="100%" height="450" src="https://www.youtube.com/embed/d6MhIBpmJnE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: '1rem', display: 'block' }}></iframe>
            </div>

            <div className="interactive-element" style={{ textAlign: 'center', background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '1rem', maxWidth: '600px', width: '100%', boxShadow: 'var(--inner-well)' }}>
                <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-1.png" style={{maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', display: 'inline-block'}} />
                <p style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-light)', fontSize: '0.9rem' }}>Fig 1: Force (F) applied on an object, resulting in displacement (v).</p>
            </div>
        </div>
      </article>

      {/* MATH DEF */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', alignSelf: 'start', background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,249,255,0.8))', borderLeft: '5px solid #3b82f6', transition: 'all 0.3s ease' }}>
          <h3 dir="ltr" style={{ color: '#1e40af' }}>The Mathematical Definition of Work</h3>
          <p dir="ltr" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}><b>When a constant force (F) acts on an object and moves it through a distance (s) in the same direction as the force, the work done (W) is calculated as:</b></p>
          <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '1rem', display: 'inline-block', margin: '1rem 0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
               <p dir="ltr" style={{ margin: 0, color: '#1d4ed8', fontSize: '1.2rem' }}><b>Work done = force &times; displacement</b></p>      
          </div>
          <p dir="ltr" style={{ textAlign: 'center' }}><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-2.png" style={{ width: '197px', maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'}}/></p>
      </article>

      {/* KEY CHARACTERISTICS */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', transition: 'all 0.3s ease' }}>
          <h3 dir="ltr">Key Characteristics of Work</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div className="hover-lift" style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', borderTop: '4px solid #f59e0b', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ color: '#b45309', marginBottom: '0.5rem' }}>Scalar Quantity</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>Work has magnitude only, no direction. Even though force and displacement are vectors, their product (work) is just a value.</p>
              </div>
              <div className="hover-lift" style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', borderTop: '4px solid #10b981', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ color: '#047857', marginBottom: '0.5rem' }}>The Unit (Joule)</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>The standard unit is the Newton-metre (N m), which is renamed the <b>Joule (J)</b>.</p>
              </div>
              <div className="hover-lift" style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', borderTop: '4px solid #8b5cf6', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ color: '#6d28d9', marginBottom: '0.5rem' }}>1 Joule Definition</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>1 J is the work done when a force of 1N displaces an object by 1m in the direction of the force.</p>
              </div>
          </div>
      </article>

      {/* SIMULATION 1: Pebble vs Wall */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
            <div className="header-content" style={{ marginBottom: '0.5rem' }}>
                <span className="module-badge" style={{ background: '#ec4899', color: 'white' }}>Interactive Lab 1</span>
            </div>
            <h3 dir="ltr" style={{ margin: 0 }}>Pushing the Wall vs the Pebble</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Try pushing against the immovable wall (zero displacement) vs pushing the pebble (displacement).</p>
        </div>
        
        <div style={{ height: '380px', backgroundColor: '#e2e8f0', position: 'relative' }}>
            <canvas id="sim1-canvas" style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', pointerEvents: 'auto' }}>
                <button id="sim1-btn-wall" className="physics-btn hover-lift" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#ef4444', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)' }}>Push Wall</button>
                <button id="sim1-btn-pebble" className="physics-btn hover-lift" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' }}>Push Pebble</button>
                <button id="sim1-btn-reset" className="physics-btn hover-lift" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: 'white', color: '#475569', fontWeight: 'bold', border: '1px solid #cbd5e1', cursor: 'pointer' }}>Reset</button>
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

      {/* ZERO WORK CONDITIONS */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1' }}> 
        <h2 dir="ltr" style={{ borderBottom: '2px solid #ec4899', paddingBottom: '0.5rem' }}>Analyzing the "Zero Work" Conditions</h2>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0' }}>
            <div className="hover-lift" style={{ background: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-3.png" style={{ width: '197px', height: 'auto', maxWidth: '100%', display: 'block' }} />
            </div>
        </div>
        <p dir="ltr" style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '2rem' }}><b>Work is a "team effort". If force or displacement is zero, total work is zero.</b></p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="hover-lift" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: '#fffbeb', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid #fde047' }}>
                <div style={{ flex: '1 1 200px' }}>
                    <h3 dir="ltr" style={{ color: '#b45309', margin: 0 }}>1. F = 0</h3>
                    <p dir="ltr" style={{ margin: '0.5rem 0 0 0', color: '#78350f' }}>If no external force is applied, work is zero.</p>
                </div>
                <div style={{ flex: '0 1 auto' }}>
                    <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-4.png" style={{ height: '46px', maxWidth: '100%', background: 'white', padding: '0.5rem', borderRadius: '0.5rem' }} />
                </div>
                <div style={{ flex: '2 1 300px', background: 'white', padding: '1rem', borderRadius: '1rem' }}>
                    <p dir="ltr" style={{ margin: 0, fontSize: '0.9rem' }}><b>Example:</b> Sliding at a constant velocity in deep space. It moves, but since no force is pushing it, no work is done.</p>
                </div>
            </div>

            <div className="hover-lift" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', background: '#eff6ff', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid #bfdbfe' }}>
                <div style={{ flex: '1 1 200px' }}>
                    <h3 dir="ltr" style={{ color: '#1d4ed8', margin: 0 }}>2. s = 0</h3>
                    <p dir="ltr" style={{ margin: '0.5rem 0 0 0', color: '#1e3a8a' }}>If object doesn't budge, work is zero.</p>
                </div>
                <div style={{ flex: '0 1 auto' }}>
                    <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-5.png" style={{ height: '55px', maxWidth: '100%', background: 'white', padding: '0.5rem', borderRadius: '0.5rem' }} />
                </div>
                <div style={{ flex: '2 1 300px', background: 'white', padding: '1rem', borderRadius: '1rem' }}>
                    <p dir="ltr" style={{ margin: 0, fontSize: '0.9rem' }}><b>Example:</b> Pushing a brick wall. You apply force, but the wall stands still. Zero work done on the wall.</p>
                </div>
            </div>
        </div>
      </article>

      {/* POSITIVE / NEGATIVE EXAMPLE CONTEXT */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: 'start', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flex: '1 1 300px' }}>
                  <h3 style={{ color: '#059669', marginBottom: '0.5rem' }}>Positive Work Example</h3>
                  <p dir="ltr" style={{ fontSize: '1.05rem', lineHeight: '1.5' }}>A force of <b>5 N</b> is acting on an object. The object is displaced through <b>2 m</b> in the direction of the force.</p>
                  <div style={{ background: '#ecfdf5', color: '#047857', padding: '1rem', borderRadius: '0.75rem', display: 'inline-block', marginTop: '0.5rem', fontWeight: 'bold' }}>Work = 5 N &times; 2 m = 10 J</div>
              </div>
              <div className="hover-lift" style={{ flex: '0 1 auto', background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-6.png" style={{ width: '401px', height: 'auto', maxWidth: '100%', borderRadius: '0.5rem' }} />
              </div>
          </div>
      </article>

      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', transition: 'all 0.3s ease' }}>
          <h3 dir="ltr" style={{ color: '#dc2626' }}>Consider a different scenario (Negative Work):</h3>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem', alignItems: 'center' }}>
              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p dir="ltr" style={{ margin: 0, fontSize: '1.05rem' }}>An object is moving with a uniform velocity. A <b>retarding force</b> (F) is applied in the opposite direction.</p>
                  <ul style={{ background: '#fef2f2', padding: '1.5rem', paddingLeft: '3rem', borderRadius: '1rem', margin: 0, color: '#991b1b', border: '1px solid #fecaca' }}>
                      <li style={{ marginBottom: '0.5rem' }}>Angle between directions is <b>180&deg;</b>.</li>
                      <li style={{ marginBottom: '0.5rem' }}>Work done is <b>negative</b>.</li>
                      <li>Work done = <b>-F &times; s</b></li>
                  </ul>
              </div>
              
              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-7.png" style={{ width: '136px', height: 'auto', maxWidth: '100%' }} />
                  <img className="hover-lift" src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-8.png" style={{ width: '187px', height: 'auto', maxWidth: '100%' }} />
              </div>
          </div>
      </article>

      {/* SIMULATION 2 (Lifting) */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
                <div className="header-content" style={{ marginBottom: '0.5rem' }}>
                    <span className="module-badge" style={{ background: '#8b5cf6', color: 'white' }}>Interactive Lab 2</span>
                </div>
                <h2 dir="ltr" style={{ margin: 0 }}>Interactive 3D Demo: Lifting Luggage</h2>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '0.5rem', margin: 0 }}>Observe the difference between positive work (you lifting) and negative work (gravity).</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button id="sim3-btn-lift" className="physics-btn hover-lift" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#8b5cf6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'grab', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)' }}>Hold to Lift</button>
                <button id="sim3-btn-reset" className="physics-btn hover-lift" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#f1f5f9', color: '#475569', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>Reset</button>
            </div>
        </div>
        
        <div style={{ width: '100%', height: '400px', backgroundColor: '#f8fafc', position: 'relative' }}>
            <canvas id="sim3-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            
            <div className="glass-card" style={{ position: 'absolute', top: '20px', right: '20px', padding: '1.5rem', minWidth: '200px', pointerEvents: 'none', background: 'rgba(255,255,255,0.95)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <b>Disp (s):</b><span id="sim3-stat-disp" style={{ fontWeight: 'bold' }}>0.00 m</span>
                </div>
                <hr style={{ margin: '0.75rem 0', borderColor: '#e2e8f0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', fontSize: '0.8rem', color: '#3b82f6' }}>
                    <span>App. Force:</span><span id="sim3-stat-app-force">0 N</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '1rem', color: '#1d4ed8' }}>
                    <b>App. Work:</b><span id="sim3-stat-app-work" style={{ fontWeight: 'bold' }}>+0 J</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', fontSize: '0.8rem', color: '#ef4444' }}>
                    <span>Gravity Force:</span><span id="sim3-stat-grav-force">-150 N</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', color: '#b91c1c' }}>
                    <b>Grav. Work:</b><span id="sim3-stat-grav-work" style={{ fontWeight: 'bold' }}>-0 J</span>
                </div>
            </div>
        </div>
      </article>

      {/* ACTIVITY & FORCES BREAKDOWN */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', alignSelf: 'start', transition: 'all 0.3s ease' }}>
          <h3 dir="ltr" style={{ color: '#d97706', display: 'inline-block', borderBottom: '2px solid #fcd34d', paddingBottom: '0.2rem' }}>Observation Activity</h3>
          <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.6' }}>Lift the object up in the simulation above. Work is done by the force exerted by you on the object, causing it to move upwards. However, there is the force of gravity also acting on the object.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              <div className="hover-lift" style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #bbf7d0', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 dir="ltr" style={{ color: '#166534', margin: '0 0 1rem 0' }}>1. The Force Exerted by You</h4>
                  <p style={{ margin: '0 0 0.5rem 0' }}><b>Type:</b> <span className="badge" style={{ background: '#22c55e', color: 'white' }}>Positive Work (+W)</span></p>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#14532d', lineHeight: '1.5' }}>You're pulling upwards, and it moves upwards. Force and displacement are in the same direction (0&deg;).</p>
              </div>

              <div className="hover-lift" style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #fecaca', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <h4 dir="ltr" style={{ color: '#991b1b', margin: '0 0 1rem 0' }}>2. The Force of Gravity</h4>
                  <p style={{ margin: '0 0 0.5rem 0' }}><b>Type:</b> <span className="badge" style={{ background: '#ef4444', color: 'white' }}>Negative Work (-W)</span></p>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#7f1d1d', lineHeight: '1.5' }}>Gravity pulls downwards, but displacement is upwards. They are in opposite directions (180&deg;).</p>
              </div>
          </div>
      </article>

      {/* FINAL EXAMPLE */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', alignSelf: 'start', transition: 'all 0.3s ease' }}>
          <h3 dir="ltr" style={{ color: '#0ea5e9' }}>Example Problem</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem' }}>
              <div style={{ flex: '1 1 300px', background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '1rem', borderLeft: '4px solid #0284c7' }}>
                  <p dir="ltr" style={{ margin: 0, fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6' }}>"A porter lifts a luggage of 15 kg from the ground and puts it on his head 1.5 m above the ground. Calculate the work done by him on the luggage."</p>
              </div>
              
              <div style={{ flex: '1 1 300px', background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  <p dir="ltr" style={{ margin: '0 0 0.5rem 0', color: '#475569' }}><b>Mass (m):</b> 15 kg<br/><b>Displacement (s):</b> 1.5 m</p>
                  <div style={{ background: '#0f172a', color: '#38bdf8', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                     W = (mg) &times; s<br/>
                     W = (15 &times; 10) &times; 1.5<br/>
                     W = 150 &times; 1.5
                  </div>
                  <p dir="ltr" style={{ margin: 0, fontSize: '1.2rem', color: '#0369a1', fontWeight: 'bold' }}>Work = 225 J</p>
              </div>
          </div>
      </article>

      {/* QUESTIONS */}
      <article className="glass-card fade-in hover-lift" style={{ gridColumn: '1 / -1', alignSelf: 'start', background: 'linear-gradient(to right, #fdf4ff, #fffbeb)', transition: 'all 0.3s ease' }}>
          <h3 dir="ltr" style={{ borderBottom: '2px solid #d946ef', paddingBottom: '0.5rem', display: 'inline-block' }}>Review Questions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <div className="hover-lift" style={{ background: 'white', padding: '1.25rem', borderRadius: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <div style={{ background: '#fae8ff', color: '#c026d3', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                  <p dir="ltr" style={{ margin: 0, fontWeight: '500' }}>When do we say that work is done?</p>
              </div>
              <div className="hover-lift" style={{ background: 'white', padding: '1.25rem', borderRadius: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <div style={{ background: '#fae8ff', color: '#c026d3', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                  <p dir="ltr" style={{ margin: 0, fontWeight: '500' }}>Write an expression for the work done when a force is acting on an object in the direction of its displacement.</p>
              </div>
              <div className="hover-lift" style={{ background: 'white', padding: '1.25rem', borderRadius: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <div style={{ background: '#fae8ff', color: '#c026d3', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                  <p dir="ltr" style={{ margin: 0, fontWeight: '500' }}>Define 1 J of work.</p>
              </div>
          </div>
      </article>

    </div>
  );
};

export default ChapterOneThree;
\;

fs.writeFileSync('src/pages/ChapterOneThree.jsx', jsxContent);
