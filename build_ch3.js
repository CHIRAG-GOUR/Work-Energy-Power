const fs = require('fs');

const jsxContent = \import React, { useEffect } from 'react';
import { initSim3, cleanupSim3 } from '../lib/simulations';

const ChapterOneThree = () => {
  useEffect(() => {
    // Small delay to ensure DOM nodes are ready
    const timer = setTimeout(() => {
        initSim3();
    }, 100);
    return () => {
        clearTimeout(timer);
        cleanupSim3();
    };
  }, []);

  return (
    <div className="ui-grid" id="view-chapter-1.3">

      <div className="glass-card banner-card fade-in" style={{ marginTop: '4rem', gridColumn: '1 / -1', padding: '2rem' }}>
        <div className="header-content" style={{ marginBottom: '1rem' }}>
            <span className="module-badge">Module 1</span>
        </div>
        <h2>Chapter 3: WORK DONE BY A CONSTANT FORCE</h2>
      </div>

      <article className="glass-card fade-in" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}> 
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <div className="video-container" style={{ flex: '1 1 500px', maxWidth: '600px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                <iframe width="100%" height="340" src="https://www.youtube.com/embed/d6MhIBpmJnE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: '1rem', display: 'block' }}></iframe>
            </div>

            <div style={{ flex: '0 1 300px', textAlign: 'center' }}>
                <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-1.png" style={{maxWidth: '100%', height: 'auto', borderRadius: '1rem', display: 'inline-block'}} />
                <p><b>v</b></p>
            </div>
        </div>
      </article>

      <div className="content-grid-half" style={{ gridColumn: '1 / -1' }}>      
        <article className="glass-card fade-in" style={{ alignSelf: 'start' }}>
            <h3 dir="ltr">The Mathematical Definition of Work</h3>
            <p dir="ltr"><b>When a constant force (F) acts on an object and moves it through a distance (s) in the same direction as the force, the work done (W) is calculated as:</b></p>
            <p dir="ltr"><b>Work done = force &times; displacement</b></p>      
            <p dir="ltr" style={{ textAlign: 'center' }}><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-2.png" style={{ width: '197px', height: '58px', maxWidth: '100%', height: 'auto', borderRadius: '0.5rem'}}/></p>
        </article>

        <article className="glass-card fade-in">
            <h3 dir="ltr">Key Characteristics of Work</h3>
            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }} dir="ltr"><b>Scalar Quantity:</b> Work has magnitude only, no direction. Even though force and displacement are vectors, their product (work) is just a value.</li>
                <li style={{ marginBottom: '0.5rem' }} dir="ltr"><b>The Unit (The Joule):</b> The standard unit is the Newton-metre (N m), which is renamed the Joule (J).<br /> Definition of 1 Joule: 1 J is the work done when a force of 1N displaces an object by 1 m in the direction of the force.</li>
                <li style={{ marginBottom: '0.5rem' }} dir="ltr"><b>Magnitude only:</b> Work is a scalar quantity; it tells us how much energy was transferred, but work itself doesn't have a "direction" (unlike force)</li>
            </ul>
        </article>
      </div>

      <article className="glass-card fade-in" style={{ gridColumn: '1 / -1' }}> 
        <h2 dir="ltr">Analyzing the "Zero Work" Conditions</h2>
        <p dir="ltr" style={{ textAlign: 'center' }}><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-3.png" style={{ width: '197px', height: '58px', maxWidth: '100%', display: 'inline-block' }} /></p>
        <p dir="ltr"><b>Looking at the above equation, it becomes clear that work is a "team effort" between force and displacement. If either one is missing, the total work collapses to zero.</b></p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div className="info-block" style={{ alignSelf: 'start' }}>
                <h3 dir="ltr">1. What if Force (F) is zero?</h3>
                <p dir="ltr"><b>If no external force is applied (F = 0), then </b></p>
                <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-4.png" style={{ width: '148px', height: '46px', maxWidth: '100%' }} /></p>
                <p dir="ltr"><b>Example:</b> An object sliding at a constant velocity on a frictionless surface in deep space. It is moving, but since no force is pushing it, no work is being done on it.</p>
            </div>
            <div className="info-block" style={{ alignSelf: 'start' }}>
                <h3 dir="ltr">2. What if Displacement (s) is zero?</h3>
                <p dir="ltr"><b>If you apply a force but the object doesn't budge (s = 0), then </b></p>
                <p dir="ltr"><img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-5.png" style={{ width: '157px', height: '55px', maxWidth: '100%' }} /></p>
                <p dir="ltr"><b>Example:</b> Pushing against a brick wall. You might sweat and burn calories, but the wall hasn't moved, so you've done zero work on the wall.</p>
            </div>
        </div>
      </article>

      <article className="glass-card fade-in" style={{ gridColumn: '1 / -1' }}> 
        <div className="table-responsive">
            <table className="glass-table">
                <thead>
                    <tr>
                        <th>Force (F)</th>
                        <th>Displacement (s)</th>
                        <th>Work Done (W)</th>
                        <th>Real-world Context</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Present</b></td>
                        <td><b>Present</b></td>
                        <td><b>Positive</b></td>
                        <td><b>Pulling a wagon.</b></td>
                    </tr>
                    <tr>
                        <td><b>Zero</b></td>
                        <td><b>Present</b></td>
                        <td><b>Zero</b></td>
                        <td><b>Coasting in a vacuum.</b></td>
                    </tr>
                    <tr>
                        <td><b>Present</b></td>
                        <td><b>Zero</b></td>
                        <td><b>Zero</b></td>
                        <td><b>Holding a heavy box still.</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </article>

      <div className="content-grid-half" style={{ gridColumn: '1 / -1' }}>      
          <article className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignSelf: 'start' }}>
              <p dir="ltr"><b>Example :</b> A force of 5 N is acting on an object. The object is displaced through 2 m in the direction of the force. If the force acts on the object all through the displacement, then work done is 5 N &times; 2 m = 10 N m or 10 J.</p>
              <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-6.png" style={{ width: '401px', height: '77px', maxWidth: '100%', alignSelf: 'center', borderRadius: '0.5rem' }} />
          </article>
      
          <article className="glass-card fade-in">
              <h3 dir="ltr">Consider a different scenario:</h3>
              <p dir="ltr" style={{ marginBottom: '1rem' }}>An object is moving with a uniform velocity along a particular direction. Now a retarding force, F, is applied in the opposite direction.</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                  <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-7.png" style={{ width: '136px', height: '81px', maxWidth: '100%' }} />
                  <img src="https://login.skillizee.io/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-8.png" style={{ width: '187px', height: '79px', maxWidth: '100%' }} />
              </div>
              
              <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>The angle between the two directions is <b>180&deg;</b>.</li>
                  <li style={{ marginBottom: '0.5rem' }}>The work done by the force, F is taken as <b>negative</b>.</li>
                  <li style={{ marginBottom: '0.5rem' }}>Work done = <b>-F &times; s</b></li>
              </ul>
              
              <div className="info-block" style={{ marginTop: '1rem', background: '#eff6ff', borderColor: '#93c5fd' }}>
                  <p>In such a case, the work done by the force is said to be negative. It is clear from the above discussion that the work done by a force can be either positive or negative.</p>
              </div>
          </article>
      </div>

      {/* NEW SIMULATION CARD */}
      <article className="glass-card fade-in" style={{ gridColumn: '1 / -1' }}>
        <div className="header-content" style={{ marginBottom: '1rem' }}>
            <span className="module-badge">Simulation</span>
        </div>
        <h2 dir="ltr">Interactive 3D Demo: Lifting Luggage</h2>
        <p>Observe the difference between the positive work done by the applied force (you lifting) and the negative work done by gravity.</p>
        
        <div style={{ width: '100%', height: '400px', backgroundColor: '#f8fafc', borderRadius: '16px', overflow: 'hidden', position: 'relative', marginTop: '1rem', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.1)' }}>
            <canvas id="sim3-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            
            <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', pointerEvents: 'auto' }}>
                <button id="sim3-btn-lift" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'grab', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)' }}>Hold to Lift</button>
                <button id="sim3-btn-reset" className="physics-btn" style={{ padding: '0.75rem 1.5rem', borderRadius: '50px', background: '#fef08a', color: '#92400e', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)' }}>Reset</button>
            </div>
            
            <div className="glass-card" style={{ position: 'absolute', top: '20px', right: '20px', padding: '1rem', minWidth: '180px', pointerEvents: 'none', background: 'rgba(255,255,255,0.85)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <b>Applied Force:</b><span id="sim3-stat-app-force" style={{ color: '#3b82f6' }}>0 N</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <b>Gravity Force:</b><span id="sim3-stat-grav-force" style={{ color: '#ef4444' }}>-150 N</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <b>Displacement:</b><span id="sim3-stat-disp">0.00 m</span>
                </div>
                <hr style={{ margin: '0.5rem 0', borderColor: '#cbd5e1' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <b>App. Work:</b><span id="sim3-stat-app-work" style={{ color: '#3b82f6', fontWeight: 'bold' }}>+0 J</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <b>Grav. Work:</b><span id="sim3-stat-grav-work" style={{ color: '#ef4444', fontWeight: 'bold' }}>-0 J</span>
                </div>
            </div>
        </div>
      </article>

      <div className="content-grid-half" style={{ gridColumn: '1 / -1' }}>    
          <article className="glass-card fade-in" style={{ alignSelf: 'start' }}>
              <h3 dir="ltr">Activity</h3>
              <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Lift an object up. Work is done by the force exerted by you on the object. The object moves upwards. The force you exerted is in the direction of displacement. However, there is the force of gravity acting on the object.</li>
                  <li style={{ marginBottom: '0.5rem' }}>Which one of these forces is doing positive work?</li>
                  <li style={{ marginBottom: '0.5rem' }}>Which one is doing negative work?</li>
                  <li>Give reasons.</li>
              </ul>
          </article>

          <div className="glass-card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="info-block">
                  <h4 dir="ltr">1. The Force Exerted by You (Applied Force)</h4>
                  <p><b>Type of Work:</b> <span className="badge badge-success">Positive Work (+W)</span></p>
                  <p><b>Reason:</b> You are pulling or pushing the object upwards, and the object is moving upwards. Since the force (F) and the displacement (s) are in the same direction (0&deg;), you are adding energy to the object.</p>
              </div>

              <div className="info-block" style={{ background: '#fef2f2', borderColor: '#fca5a5' }}>
                  <h4 dir="ltr">2. The Force of Gravity</h4>
                  <p><b>Type of Work:</b> <span className="badge badge-error">Negative Work (-W)</span></p>
                  <p><b>Reason:</b> Gravity always pulls objects downwards toward the Earth's center. However, the object is being displaced upwards. Since the force of gravity and the displacement are in opposite directions (180&deg;), gravity is trying to "resist" the motion, effectively removing energy from the object's upward climb.</p>
              </div>
          </div>
      </div>

      <article className="glass-card fade-in" style={{ gridColumn: '1 / -1' }}> 
          <p dir="ltr"><b>Work done is negative when the force acts opposite to the direction of displacement. Work done is positive when the force is in the direction of displacement.</b></p>
      </article>

      <div className="content-grid-half" style={{ gridColumn: '1 / -1' }}>      
          <article className="glass-card fade-in" style={{ alignSelf: 'start' }}>
              <h3 dir="ltr">Example</h3>
              <p dir="ltr" style={{ marginBottom: '1rem' }}><b>A porter lifts a luggage of 15 kg from the ground and puts it on his head 1.5 m above the ground. Calculate the work done by him on the luggage.</b></p>
              
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '0.5rem' }}>
                  <p dir="ltr"><b>Solution:</b> Mass of luggage, m = 15 kg and displacement, s = 1.5 m.</p>
                  <p dir="ltr"><b>Work done, W = F &times; s = mg &times; s</b></p>
                  <p dir="ltr">15 kg &times; 10 m/s&sup2; &times; 1.5 m</p>
                  <p dir="ltr">= 225 kg m/s&sup2; m</p>
                  <p dir="ltr">= 225 N m = 225 J</p>
                  <p dir="ltr" style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Work done is 225 J.</p>
              </div>
          </article>

          <article className="glass-card fade-in" style={{ alignSelf: 'start' }}>
              <h3 dir="ltr">Questions:</h3>
              <ol style={{ marginLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li dir="ltr"><b>When do we say that work is done?</b></li>
                  <li dir="ltr"><b>Write an expression for the work done when a force is acting on an object in the direction of its displacement.</b></li>
                  <li dir="ltr"><b>Define 1 J of work.</b></li>
                  <li dir="ltr"><b>A pair of bullocks exerts a force of 140 N on a plough. The field being ploughed is 15 m long. How much work is done in ploughing the length of the field?</b></li>
              </ol>
          </article>
      </div>

    </div>
  );
};

export default ChapterOneThree;
\;

fs.writeFileSync('src/pages/ChapterOneThree.jsx', jsxContent);
console.log('ChapterOneThree.jsx successfully updated!');
