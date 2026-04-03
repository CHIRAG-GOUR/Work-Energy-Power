import React, { useState, useEffect, useRef } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import SimPushWall3D from '../components/SimPushWall3D';

export default function ChapterOneOne() {
    
    // Sim 1 State
    const [force, setForce] = useState(50);
    const [displacement, setDisplacement] = useState(5);
    
    // Sim 2 State (Wall Push vs Pebble)
    const [pushClicks, setPushClicks] = useState(0);
    const [wallStamina, setWallStamina] = useState(100);
    const [isPushing, setIsPushing] = useState(false);
    const [targetType, setTargetType] = useState('wall'); // 'wall' or 'pebble'
    const [pebblePosition, setPebblePosition] = useState(0);
    const pushIntervalRef = useRef(null);

    // Drain stamina continuously if not clicking
    useEffect(() => {
        let timer;
        if (wallStamina < 100 && !isPushing) {
            timer = setInterval(() => {
                setWallStamina(prev => Math.min(100, prev + 5));
            }, 500);
        }
        return () => clearInterval(timer);
    }, [wallStamina, isPushing]);

    const startPushing = () => {
        if (wallStamina === 0 && targetType === 'wall') return;
        setIsPushing(true);
        if (!pushIntervalRef.current) {
            pushIntervalRef.current = setInterval(() => {
                setPushClicks(c => c + 1);
                setWallStamina(s => {
                    const newS = Math.max(0, s - 5);
                    if (newS === 0 && targetType === 'wall') {
                        stopPushing();
                    }
                    return newS;
                });
                
                setTargetType(currentType => {
                    if (currentType === 'pebble') {
                        setPebblePosition(p => Math.min(150, p + 2));
                    }
                    return currentType;
                });
            }, 100);
        }
    };

    const stopPushing = () => {
        setIsPushing(false);
        if (pushIntervalRef.current) {
            clearInterval(pushIntervalRef.current);
            pushIntervalRef.current = null;
        }
    };
    
    return (
        <div className="ui-grid" id="view-chapter-1.1">
            <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem' }}>
                <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem' }}>Module 1</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2 }}>Chapter 1: The Basics (Work)</h1>
                <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
                    Physics Experiential Activity. Whether it is a heartbeat or a heavy-duty engine, nothing moves without a transfer of energy. We can break this down into three core pillars:
                </p>
            </header>

            <article className="glass-card highlight-card fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="icon-circle">W</div>
                <h3>Work</h3>
                <p>The result of a force acting upon an object to cause a displacement. In simple terms, if nothing moves, no "work" is done in the eyes of physics.</p>
            </article>
            <article className="glass-card highlight-card fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="icon-circle" style={{ background: 'linear-gradient(135deg, #ff9f43, #ff7f50)' }}>E</div>
                <h3>Energy</h3>
                <p>The "currency" of the universe. It is the capacity to do work. Without it, life processes stall and machines sit idle.</p>
            </article>
            <article className="glass-card highlight-card fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="icon-circle" style={{ background: 'linear-gradient(135deg, #ee5253, #ff6b6b)' }}>P</div>
                <h3>Power</h3>
                <p>The rate at which work is done. It is not just about if you can move a load, but how fast you can do it.</p>
            </article>

            <article className="glass-card fade-in" style={{ animationDelay: '0.6s', gridColumn: '1 / -1' }}>
                <div className="content-grid-half">
                    <div className="text-side">
                        <h2>The Universal Need for Energy</h2>
                        <p>Everything that "functions" requires a source of input to overcome entropy and perform tasks:</p>
                        <div className="table-responsive">
                            <table className="glass-table">
                                <thead>
                                    <tr><th>Entity</th><th>Primary Activities</th><th>Fuel Source</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td><strong>Living Beings</strong></td><td>Life processes, running, thinking, survival.</td><td>Food (Chemical Energy)</td></tr>
                                    <tr><td><strong>Animals</strong></td><td>Hunting, fleeing, manual labor.</td><td>Food/Biomass</td></tr>
                                    <tr><td><strong>Machines</strong></td><td>Lifting, transporting, manufacturing.</td><td>Fuel/Electricity</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </article>

            <div className="side-by-side-cards" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2rem' }}>
                <article className="glass-card fade-in" style={{ animationDelay: '0.7s' }}>
                    <h2>Work: What is work?</h2>
                    <div className="video-container" style={{ marginBottom: '1.5rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                        <CustomVideoPlayer src="/videos/zacescdatjg.mp4" title="Work and Energy: Definition of Work in Physics" />
                    </div>
                    <div className="info-block">
                        <h3>The Physics Definition</h3>
                        <p>In science, work is about the transfer of energy via a force. Two criteria must be met:</p>
                        <ol>
                            <li>A <strong>Force</strong> must act on the object.</li>
                            <li>The object must be <strong>Displaced</strong> (move) in the direction of that force.</li>
                        </ol>
                    </div>
                </article>

                <article className="glass-card fade-in" style={{ animationDelay: '0.8s' }}>
                    <h2 style={{ textAlign: 'center' }}>The "Hard Work" vs "No Work" Paradox</h2>
                    <div className="table-responsive" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <table className="glass-table" style={{ fontSize: '0.9rem' }}>
                            <thead>
                                <tr><th>Activity</th><th>Effort</th><th>Work (Science)</th><th>Why?</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Reads a book</td><td>Very High</td><td><span className="badge" style={{background:'#fca5a5', color:'white', padding:'2px 6px', borderRadius:'4px' }}>Zero</span></td><td>No movement.</td></tr>
                                <tr><td>Pushing Wall</td><td>Exhausting</td><td><span className="badge" style={{background:'#fca5a5', color:'white', padding:'2px 6px', borderRadius:'4px' }}>Zero</span></td><td>Displacement = 0</td></tr>
                                <tr><td>Holding Load</td><td>Tiring</td><td><span className="badge" style={{background:'#fca5a5', color:'white', padding:'2px 6px', borderRadius:'4px' }}>Zero</span></td><td>Displacement = 0</td></tr>
                                <tr><td>Climbing Stairs</td><td>High</td><td><span className="badge" style={{background:'#86efac', color:'white', padding:'2px 6px', borderRadius:'4px' }}>High</span></td><td>Movement against gravity</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="info-block" style={{ marginTop: '1.5rem' }}>
                        <h3>Why do we feel tired if no "work" is done?</h3>
                        <p>Your muscles consume energy constantly contracting just to maintain posture, but if there's no movement out in the world, purely mechanical work is ZERO.</p>
                    </div>
                </article>
            </div>

            {/* REAL INTERACTIVE SIMULATIONS */}
            <div className="side-by-side-cards" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2rem', marginTop: '2rem' }}>
                <article className="glass-card fade-in" style={{ animationDelay: '0.9s', background: 'linear-gradient(to right bottom, #f0fdfa, #ecfdf5)', border: '4px solid #34d399' }}>
                    <h2><span style={{ fontSize: '1.5rem', marginRight: '10px' }}>📦</span> Interactive Mod: Calculate Work</h2>
                    <p>Slide the controls to define force and movement. See the live math in action!</p>
                    <div className="simulation-container">
                        <div className="sim-controls">
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Force (F):</strong> <span><span style={{color: '#ef4444', fontWeight: 'bold'}}>{force}</span> N</span>
                            </label>
                            <input type="range" min="0" max="100" value={force} onChange={e => setForce(Number(e.target.value))} style={{accentColor: '#ef4444', height: '8px'}} />
                            
                            <label style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <strong>Displacement (s):</strong> <span><span style={{color: '#3b82f6', fontWeight: 'bold'}}>{displacement}</span> m</span>
                            </label>
                            <input type="range" min="0" max="20" value={displacement} onChange={e => setDisplacement(Number(e.target.value))} style={{accentColor: '#3b82f6', height: '8px'}} />
                        </div>
                        <div className="sim-visual" style={{ height: '120px', borderRadius: '1rem', background: '#e2e8f0', position: 'relative', marginTop: '1.5rem', border: 'inset 4px #cbd5e1' }}>
                            {/* The Grid/Floor */}
                            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '20px', borderTop: '2px solid #94a3b8', backgroundImage: 'repeating-linear-gradient(90deg, #94a3b8 0 2px, transparent 2px 20px)' }}></div>
                            
                            {/* The Box */}
                            <div style={{ 
                                position: 'absolute', 
                                bottom: '20px', 
                                left: `calc(${(displacement / 20) * 80}%)`, // 0 to 80% to keep box in bounds
                                transition: 'left 0.3s ease-out',
                                width: '50px', height: '50px', 
                                background: '#f59e0b', borderRadius: '8px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '4px 4px 0 rgba(0,0,0,0.1)', border: '2px solid #b45309'
                            }}>📦</div>
                            
                            {/* Arrow showing Force */}
                            {force > 0 && displacement > 0 && (
                                <div style={{ 
                                    position: 'absolute', bottom: '40px', 
                                    left: '25px', // Start at box
                                    width: `${wallStamina}%`,
                                    height: '4px', background: '#ef4444', 
                                    transition: 'width 0.3s ease-out', zIndex: 0 
                                }}>
                                    <div style={{ position:'absolute', right:'-5px', top:'-6px', width:'0', height:'0', borderTop:'8px solid transparent', borderBottom:'8px solid transparent', borderLeft:'12px solid #ef4444' }}></div>
                                    <div style={{ position:'absolute', top:'-25px', left:'50%', transform:'translateX(-50%)', fontWeight:'bold', color:'#ef4444' }}>Force</div>
                                </div>
                            )}
                        </div>
                        <div className="sim-result" style={{ background: '#34d399', color: 'white', borderRadius: '1rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.2rem', textAlign: 'right' }}>
                                 W = F × s<br />
                                 {force} × {displacement}
                            </div>
                            <h3 style={{ fontSize: '2rem', borderLeft: '2px solid rgba(255,255,255,0.5)', paddingLeft: '1rem', color:'white' }}>
                                = {force * displacement} J
                            </h3>
                        </div>
                    </div>
                </article>

                <article className="glass-card fade-in" style={{ animationDelay: '1.0s', background: 'linear-gradient(to right bottom, #fef2f2, #fff1f2)', border: '4px solid #ef4444' }}>
                    <h2><span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🧱</span> Experiential Activity: Push It!</h2>
                    <p>Try pushing the heavy wall versus a small pebble. Notice how work is ONLY done when there is <em>displacement</em>!</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <button 
                            onClick={() => { setTargetType('wall'); setPushClicks(0); setWallStamina(100); }}
                            style={{ padding: '0.8rem 1.5rem', borderRadius: '1rem', background: targetType === 'wall' ? '#ef4444' : '#f87171', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderBottom: targetType === 'wall' ? 'none' : '4px solid #b91c1c', transform: targetType === 'wall' ? 'translateY(4px)' : 'none' }}
                        >Push Wall 🧱</button>
                        <button 
                            onClick={() => { setTargetType('pebble'); setPushClicks(0); setWallStamina(100); setPebblePosition(0); }}
                            style={{ padding: '0.8rem 1.5rem', borderRadius: '1rem', background: targetType === 'pebble' ? '#3b82f6' : '#60a5fa', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderBottom: targetType === 'pebble' ? 'none' : '4px solid #1d4ed8', transform: targetType === 'pebble' ? 'translateY(4px)' : 'none' }}
                        >Push Pebble 🪨</button>
                    </div>

                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        
                        {/* 3D React Three Fiber Simulation */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <SimPushWall3D 
                                targetType={targetType} 
                                isPushing={isPushing} 
                                pebblePosition={pebblePosition} 
                                wallStamina={wallStamina} 
                            />
                        </div>

                        {/* Stamina Bar */}
                        <div style={{ width: '100%', background: '#fee2e2', borderRadius: '20px', height: '24px', overflow: 'hidden', border: '2px solid #fca5a5', marginBottom: '1rem' }}>
                            <div style={{ width: `${wallStamina}%`, background: wallStamina > 30 ? '#4ade80' : '#ef4444', height: '100%', transition: 'width 0.2s, background 0.2s', display: 'flex', alignItems: 'center', justifyContent:'center', color: 'white', fontWeight: 'bold', fontSize:'0.8rem' }}>
                                Stamina {wallStamina}%
                            </div>
                        </div>

                        <button 
                            className="sim-btn"
                            onPointerDown={(e) => {
                                if(wallStamina > 0 || targetType !== 'wall') {
                                    e.currentTarget.style.transform = 'translateY(8px)';
                                    startPushing();
                                }
                            }}
                            onPointerUp={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)';
                                stopPushing();
                            }}
                            onPointerLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)';
                                stopPushing();
                            }}
                            onPointerCancel={(e) => {
                                e.currentTarget.style.transform = 'translateY(0px)';
                                stopPushing();
                            }}
                            disabled={wallStamina === 0 && targetType === 'wall'}
                            style={{ padding: '1rem 3rem', fontSize: '1.5rem', borderRadius: '2rem', background: targetType === 'wall' ? '#ef4444' : '#3b82f6', color: 'white', cursor: (wallStamina === 0 && targetType === 'wall') ? 'not-allowed' : 'pointer', fontWeight: 'bold', boxShadow: `0 8px 0 ${targetType === 'wall' ? '#b91c1c' : '#1d4ed8'}`, border: 'none', transition: 'transform 0.1s' }}
                        >
                            PUSH! {pushClicks > 0 && `(${pushClicks})`}
                        </button>
                    </div>

                    {/* Result Block */}
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '2px dashed #94a3b8', textAlign: 'center', marginTop: '1rem' }}>
                        {pushClicks === 0 ? (
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#64748b', fontSize: '1.2rem' }}>Start pushing!</p>
                        ) : targetType === 'wall' ? (
                            wallStamina > 20 ? (
                                <p style={{ margin: 0, fontWeight: 'bold', color: '#f59e0b', fontSize: '1.2rem' }}>Keep Pushing! You're working up a sweat!</p>
                            ) : (
                                <div className="fade-in">
                                    <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Exhausted! But wait...</h3>
                                    <p style={{ fontSize: '1.2rem', marginBottom: '0' }}>Displacement (s) = <strong>0 meters!</strong></p>
                                    <div style={{ background: '#fee2e2', padding: '0.5rem', borderRadius: '8px', display: 'inline-block', marginTop: '0.5rem' }}>
                                        <p style={{ margin: 0, fontSize: '1.3rem', color: '#b91c1c', fontWeight: 'bold' }}>Work = F &times; 0 = 0 Joules!</p>
                                    </div>
                                    <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>Even though you used energy, no physics work was done because the wall didn't move.</p>
                                </div>
                            )
                        ) : (
                            <div className="fade-in">
                                <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Great job! The pebble is moving!</h3>
                                <p style={{ fontSize: '1.2rem', marginBottom: '0' }}>Displacement (s) = <strong>{(pebblePosition * 0.1).toFixed(1)} meters!</strong></p>
                                <div style={{ background: '#dcfce7', padding: '0.5rem', borderRadius: '8px', display: 'inline-block', marginTop: '0.5rem' }}>
                                    <p style={{ margin: 0, fontSize: '1.3rem', color: '#15803d', fontWeight: 'bold' }}>Work = F &times; {(pebblePosition * 0.1).toFixed(1)} &gt; 0 Joules!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>

            {/* PhET Activity Section */}
            <article className="glass-card fade-in" style={{ animationDelay: '1.1s', gridColumn: '1 / -1', background: 'linear-gradient(145deg, #eff6ff, #dbeafe)', border: '2px solid #93c5fd', marginTop: '3rem' }}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '1rem' }}>Forces & Motion Basics</h2>
                    <p style={{ color: '#3b82f6', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
                        Explore the relationships between force, mass, and acceleration in this interactive sandbox! Toggle the values and see how applying net forces causes objects to move.
                    </p>
                    <div style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)', background: 'white', border: '4px solid white' }}>
                        <iframe 
                            src="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html" 
                            width="100%" 
                            height="600" 
                            scrolling="no" 
                            allowFullScreen
                            style={{ border: 'none', display: 'block' }}
                            title="PhET Forces and Motion Basics"
                        ></iframe>
                    </div>
                </div>
            </article>
        </div>
    );
}
