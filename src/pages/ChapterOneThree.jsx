import CustomVideoPlayer from '../components/CustomVideoPlayer';
import React, { useEffect } from 'react';
import { initSim3, initSim4 } from '../lib/simulations';

const PREFIX = 'https://login.skillizee.io';

const ChapterOneThree = () => {
  useEffect(() => {
    const t1 = setTimeout(() => initSim1(), 100);
    const t2 = setTimeout(() => initSim4(), 150);
    const t3 = setTimeout(() => initSim3(), 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="ui-grid" id="view-chapter-1.3">
      
      <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1' }}>
        <div className="header-content">
          <span className="module-badge">Module 1</span>
          <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>Chapter 3: WORK DONE BY A CONSTANT FORCE</h1>
        </div>
      </header>

      {/* Intro Video */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Work Done by a Constant Force</h2>
        <div className="video-container" style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--card-shadow), var(--inset-shadow)' }}>
          <CustomVideoPlayer src="/videos/d6mhibpmjne.mp4" title="Work Done by a Constant Force" />
        </div>
        <div style={{ textAlign: 'center', width: '100%' }}>
            <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-1.png`} alt="Force v" style={{ width: '100%', maxWidth: '434px', borderRadius: '1rem', marginTop: '1rem' }} />
        </div>
      </article>

      {/* The Mathematical Definition */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.3s', gridColumn: '1 / -1' }}>
        <h2>The Mathematical Definition of Work</h2>
        <div className="info-block" style={{ padding: '2rem', background: 'var(--glass-bg)', borderRadius: '24px', boxShadow: 'var(--inner-well)' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>When a constant force (F) acts on an object and moves it through a distance (s) in the same direction as the force, the work done (W) is calculated as:</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--accent-color)', textAlign: 'center' }}>Work done = force × displacement</p>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-2.png`} alt="Formula" style={{ maxWidth: '197px' }} />
            </div>
        </div>
      </article>

      {/* Key Characteristics */}
      <article className="glass-card highlight-card fade-in" style={{ animationDelay: '0.4s', gridColumn: '1 / -1' }}>
        <div className="icon-circle" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>W</div>
        <h3>Key Characteristics of Work</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', lineHeight: '1.8', fontSize: '1.15rem', color: 'var(--text-light)', marginTop: '1.5rem' }}>
            <li><strong>Scalar Quantity:</strong> Work has magnitude only, no direction. Even though force and displacement are vectors, their product (work) is just a value.</li>
            <li><strong>The Unit (The Joule):</strong> The standard unit is the Newton-metre (N m), which is renamed the Joule (J).<br/><em>Definition of 1 Joule:</em> 1 J is the work done when a force of 1N displaces an object by 1 m in the direction of the force.</li>
            <li><strong>Magnitude only:</strong> Work is a scalar quantity; it tells us how much energy was transferred, but work itself doesn't have a "direction" (unlike force).</li>
        </ul>
      </article>

      {/* Zero Work + Simulation 1 */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.5s', gridColumn: '1 / -1' }}>
        <h2>Analyzing the "Zero Work" Conditions</h2>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-3.png`} alt="W=Fxs formula" style={{ maxWidth: '197px' }} />
        </div>
        <p style={{ fontSize: '1.15rem', marginBottom: '2rem' }}>Looking at the above equation, it becomes clear that work is a "team effort" between force and displacement. If either one is missing, the total work collapses to zero.</p>

        <div className="side-by-side-cards">
            <div className="info-block">
                <h3>1. What if Force (F) is zero?</h3>
                <p>If no external force is applied (F = 0), then</p>
                <div style={{ textAlign: 'center' }}>
                    <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-4.png`} alt="W=0xs=0" style={{ maxWidth: '148px', margin: '1rem 0' }} />
                </div>
                <p><strong>Example:</strong> An object sliding at a constant velocity on a frictionless surface in deep space. It is moving, but since no force is pushing it, no work is being done on it.</p>
            </div>
            <div className="info-block">
                <h3>2. What if Displacement (s) is zero?</h3>
                <p>If you apply a force but the object doesn't budge (s = 0), then</p>
                <div style={{ textAlign: 'center' }}>
                    <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-5.png`} alt="W=Fx0=0" style={{ maxWidth: '157px', margin: '1rem 0' }} />
                </div>
                <p><strong>Example:</strong> Pushing against a brick wall. You might sweat and burn calories (internal biological work), but the wall hasn't moved, so you've done zero work on the wall.</p>
            </div>
        </div>

        </article>

      <article className="glass-card fade-in" style={{ animationDelay: '0.55s', gridColumn: '1 / -1' }}>
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
                <td><strong>Present</strong></td>
                <td><strong>Present</strong></td>
                <td><strong style={{color:'var(--success-color)'}}>Positive</strong></td>
                <td>Pulling a wagon.</td>
              </tr>
              <tr>
                <td><strong>Zero</strong></td>
                <td><strong>Present</strong></td>
                <td><strong>Zero</strong></td>
                <td>Coasting in a vacuum.</td>
              </tr>
              <tr>
                <td><strong>Present</strong></td>
                <td><strong>Zero</strong></td>
                <td><strong>Zero</strong></td>
                <td>Holding a heavy box still.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* Examples sections */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.6s', gridColumn: '1 / -1' }}>
        <div className="info-block" style={{ marginBottom: '2rem' }}>
          <h3>Example</h3>
          <p>A force of 5 N is acting on an object. The object is displaced through 2 m in the direction of the force. If the force acts on the object all through the displacement, then work done is 5 N × 2 m = 10 N m or 10 J.</p>
          <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-6.png`} alt="5N * 2m" style={{ maxWidth: '401px', width: '100%', marginTop: '1rem', borderRadius: '8px' }} />
        </div>
        <div className="info-block">
          <h3>Question</h3>
          <p>1. A force of 7 N acts on an object. The displacement is, say 8 m, in the direction of the force. Let us take it that the force acts on the object through the displacement. What is the work done in this case?</p>
          <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-7.png`} alt="7N * 8m" style={{ maxWidth: '383px', width: '100%', marginTop: '1rem', borderRadius: '8px' }} />
        </div>
      </article>

      {/* Role of Direction */}
      <article className="glass-card highlight-card fade-in" style={{ animationDelay: '0.7s', gridColumn: '1 / -1' }}>
        <h2>The Role of Direction: Positive vs. Negative Work</h2>
        
        <div className="video-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--card-shadow), var(--inset-shadow)' }}>
          <CustomVideoPlayer src="/videos/wl7_d14kgc.mp4" title="Positive & negative work | Khan Academy" />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-8.png`} alt="Boy pulling car" style={{ maxWidth: '744px', width: '100%', borderRadius: '16px', boxShadow: 'var(--card-shadow)' }} />
        </div>

        <p style={{ fontSize: '1.15rem', textAlign: 'center', marginBottom: '2rem' }}>The relationship between the direction of the force and the direction of movement determines the "sign" of the work done.</p>

        <div className="side-by-side-cards">
          <div className="info-block" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '2px solid var(--success-color)' }}>
            <h3 style={{ color: 'var(--success-color)' }}>1. Positive Work (+)</h3>
            <p><strong>When the force acts in the same direction as the displacement.</strong></p>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', margin: '1rem 0', textAlign: 'center' }}>
              <img src={`${PREFIX}/s/articles/69c110888f3f7b8b1d1f4389/images/image-20260323153602-9.png`} alt="Positive work formula" style={{ maxWidth: '365px', width: '100%' }} />
            </div>
            <ul>
              <li><strong>Example:</strong> A baby pulling a toy car forward. The pull and the movement are both forward.</li>
              <li><strong>Effect:</strong> Energy is added to the object, usually speeding it up.</li>
            </ul>
          </div>
          <div className="info-block" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '2px solid var(--error-color)' }}>
            <h3 style={{ color: 'var(--error-color)' }}>2. Negative Work (-)</h3>
            <p><strong>When the force acts in the opposite direction to the displacement (an angle of 180°).</strong></p>
            <ul style={{ marginTop: '1rem' }}>
              <li><strong>Example:</strong> Applying brakes to a moving car or a "retarding force" to stop a sliding object. The object moves forward, but the force pulls backward.</li>
              <li><strong>Formula:</strong> W = F × (-s) or W = -Fs.</li>
              <li><strong>Effect:</strong> Energy is removed from the object, usually slowing it down.</li>
            </ul>
          </div>
        </div>

        <div className="table-responsive" style={{ marginTop: '2rem' }}>
          <table className="glass-table">
            <thead>
              <tr>
                <th>Direction of Force vs. Displacement</th>
                <th>Type of Work</th>
                <th>Mathematical Sign</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Same Direction (0°)</td>
                <td style={{color:'var(--success-color)'}}><strong>Positive</strong></td>
                <td>+W</td>
              </tr>
              <tr>
                <td>Opposite Direction (180°)</td>
                <td style={{color:'var(--error-color)'}}><strong>Negative</strong></td>
                <td>-W</td>
              </tr>
              <tr>
                <td>Perpendicular (90°)</td>
                <td><strong>Zero</strong></td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* Activity: Lifting + Sim 3 */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.8s', gridColumn: '1 / -1' }}>
        <div className="icon-circle" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white' }}>!</div>
        <h3>Activity</h3>
        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.15rem', color: 'var(--text-light)', lineHeight: '1.6' }}>
          <li>• Lift an object up. Work is done by the force exerted by you on the object. The object moves upwards. The force you exerted is in the direction of displacement. However, there is the force of gravity acting on the object.</li>
          <li>• Which one of these forces is doing positive work?</li>
          <li>• Which one is doing negative work?</li>
          <li>• Give reasons.</li>
        </ul>

        <div className="side-by-side-cards" style={{ marginTop: '2rem' }}>
          <div className="info-block">
            <h4 style={{ color: 'var(--success-color)' }}>1. The Force Exerted by You</h4>
            <p><strong>Type of Work:</strong> Positive Work (+W)</p>
            <p><strong>Reason:</strong> You are pulling or pushing the object upwards, and the object is moving upwards. Since the force (F) and the displacement (s) are in the same direction (0°), you are adding energy to the object.</p>
          </div>
          <div className="info-block">
            <h4 style={{ color: 'var(--error-color)' }}>2. The Force of Gravity</h4>
            <p><strong>Type of Work:</strong> Negative Work (-W)</p>
            <p><strong>Reason:</strong> Gravity always pulls objects downwards toward the Earth's center. However, the object is being displaced upwards. Since the force of gravity and the displacement are in opposite directions (180°), gravity is trying to "resist" the motion, effectively removing energy from the object's upward climb.</p>
          </div>
        </div>

        <div className="table-responsive" style={{ marginTop: '2rem' }}>
          <table className="glass-table">
            <thead>
              <tr>
                <th>Force</th>
                <th>Direction of Force</th>
                <th>Direction of Displacement</th>
                <th>Type of Work</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Your Hand</strong></td>
                <td>Upward ↑</td>
                <td>Upward ↑</td>
                <td style={{color:'var(--success-color)'}}><strong>Positive</strong></td>
              </tr>
              <tr>
                <td><strong>Gravity</strong></td>
                <td>Downward ↓</td>
                <td>Upward ↑</td>
                <td style={{color:'var(--error-color)'}}><strong>Negative</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* Porter Example + Sim 3 */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.85s', gridColumn: '1 / -1' }}>
        <h2>Example: Lifting Work</h2>
        <div className="info-block" style={{ marginBottom: '2rem', fontSize: '1.15rem' }}>
          <p>A porter lifts a luggage of 15 kg from the ground and puts it on his head 1.5 m above the ground. Calculate the work done by him on the luggage.</p>
          <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '16px', marginTop: '1rem', borderLeft: '4px solid var(--accent-color)' }}>
            <p><strong>Solution:</strong> Mass of luggage, m = 15 kg and displacement, s = 1.5 m.</p>
            <p>Work done, W = F × s = mg × s</p>
            <p>= 15 kg × 10 m s<sup>-2</sup> × 1.5 m</p>
            <p>= 225 kg m s<sup>-2</sup> m</p>
            <p>= 225 N m = 225 J</p>
            <p><strong>Work done is 225 J.</strong></p>
          </div>
        </div>

        <h3 style={{ marginTop: '3rem', color: 'var(--accent-color)' }}>Interactive: The Lifting Force (Sim 2)</h3>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', marginBottom: '1rem' }}>When lifting luggage, you must exert an applied force (you) vs. gravity's downward force. Check the positive/negative work!</p>
        <div className="simulation-container" style={{ position: 'relative', width: '100%', aspectRatio: '21/9', minHeight: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--inner-well)' }}>
          <canvas id="sim3-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          
          <div className="sim-ui" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button id="sim3-btn-lift" className="btn primary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: 'var(--success-color)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Lift Luggage</button>
            <button id="sim3-btn-reset" className="btn secondary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Reset</button>
          </div>
          
          <div className="sim-stats glass-card" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', minWidth: '220px' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: '#64748b' }}>Displacement: <strong id="sim3-stat-disp" style={{ color: '#0f172a' }}>0 m</strong></p>
            <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', margin: '0.6rem 0' }}></div>
            <p style={{ margin: '0 0 0.3rem 0', fontSize: '1.05rem', color: 'var(--success-color)' }}>App Force (You): <strong id="sim3-stat-app-force">0 N</strong></p>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--success-color)' }}>App Work: <strong id="sim3-stat-app-work">0 J</strong></p>
            <div style={{ borderTop: '2px dotted rgba(0,0,0,0.1)', margin: '0.6rem 0' }}></div>
            <p style={{ margin: '0 0 0.3rem 0', fontSize: '1.05rem', color: 'var(--error-color)' }}>Grav Force: <strong id="sim3-stat-grav-force">0 N</strong></p>
            <p style={{ margin: '0', fontSize: '1.1rem', color: 'var(--error-color)' }}>Grav Work: <strong id="sim3-stat-grav-work">0 J</strong></p>
          </div>
        </div>
      </article>

      {/* Questions Section + Sim 2 */}
      <article className="glass-card fade-in" style={{ animationDelay: '0.9s', gridColumn: '1 / -1' }}>
        <h2>Questions:</h2>
        <div className="info-block" style={{ marginBottom: '2rem' }}>
          <ol style={{ paddingLeft: '1.5rem', fontSize: '1.15rem', lineHeight: '1.8' }}>
            <li>When do we say that work is done?</li>
            <li>Write an expression for the work done when a force is acting on an object in the direction of its displacement.</li>
            <li>Define 1 J of work.</li>
            <li>A pair of bullocks exerts a force of 140 N on a plough. The field being ploughed is 15 m long. How much work is done in ploughing the length of the field?</li>
          </ol>
        </div>

        <h3 style={{ marginTop: '3rem', color: 'var(--accent-color)' }}>Interactive: Pulling Force (Sim 3)</h3>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', marginBottom: '1rem' }}>Experience the pulling force described in Question 4. Hold the button to pull the cart/plough across the field!</p>

        <div className="simulation-container" style={{ position: 'relative', width: '100%', aspectRatio: '21/9', minHeight: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--inner-well)' }}>
          <canvas id="sim4-canvas" style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
          
          <div className="sim-ui" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button id="sim4-btn-pull" className="btn primary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: 'var(--accent-color)', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Hold to Pull (140 N)</button>
            <button id="sim4-btn-reset" className="btn secondary-btn" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--card-shadow)', fontWeight: 'bold' }}>Reset Field</button>
          </div>
          
          <div className="sim-stats glass-card" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', minWidth: '200px' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Force: <strong id="sim4-stat-force" style={{ color: 'var(--accent-color)' }}>0 N</strong></p>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Displacement: <strong id="sim4-stat-disp" style={{ color: 'var(--accent-color)' }}>0 m</strong></p>
            <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', margin: '0.8rem 0' }}></div>
            <p style={{ margin: 0, fontSize: '1.2rem' }}>Work Done: <strong id="sim4-stat-work" style={{ color: '#10b981', fontSize: '1.4rem' }}>0 J</strong></p>
          </div>
        </div>
      </article>

      
    </div>
  );
};

export default ChapterOneThree;