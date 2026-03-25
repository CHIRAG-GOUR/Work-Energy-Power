import React, { useState } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
export default function ChapterOneThree() {

    // Pulling a block sim
    const [angle, setAngle] = useState(0); // degrees
    const [force, setForce] = useState(50); // N
    const displacement = 10; // fixed for sim

    // Math conversions
    const radians = angle * (Math.PI / 180);
    const forceX = force * Math.cos(radians);
    const workDone = forceX * displacement;

    return (
        <div className="ui-grid fade-in" id="view-chapter-1.3">
            <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', border: '2px solid #a5b4fc' }}>
                <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem' }}>Module 1</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2, color: '#3730a3' }}>1.3 Nature of Work Done</h1>
                <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', color: '#1e1b4b' }}>
                    Work isn't always as simple as pushing something straight forward. What happens if you are pulling a suitcase by a handle at an angle?
                </p>
            </header>

            <article className="glass-card fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1' }}>

                <div className="highlight-box">
                    <strong>The Important Rule:</strong> Only the force that acts <em>in the direction of the movement</em> actually does work!
                </div>

                <div className="math-box" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', margin: '2rem 0', borderLeft: '4px solid #334155' }}>
                    <h3 style={{marginTop: 0}}>The Formula 📐</h3>
                    <p style={{ fontSize: '1.2rem', textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace' }}>W = F × cos(θ) × s</p>
                    <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                        Where <strong>&theta; (theta)</strong> is the angle between the force and the direction of movement.
                    </p>
                </div>

                <h2>Experiential Activity: The Angle of Pull</h2>
                <p>Adjust the angle of the force. See how it affects the "useful" force (horizontal) and the total Work Done.</p>

                <div className="simulation-container" style={{ background: '#e0e7ff', padding: '1.5rem', borderRadius: '1rem', margin: '2rem 0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <div className="sim-controls">
                        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Angle (&theta;):</strong> <span><span style={{color: '#8b5cf6', fontWeight: 'bold'}}>{angle}</span>&deg;</span>
                        </label>
                        <input type="range" min="0" max="90" value={angle} onChange={e => setAngle(Number(e.target.value))} style={{accentColor: '#8b5cf6', height: '8px', width: '100%', marginBottom: '1rem'}} />
                        
                        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Total Force Applied:</strong> <span><span style={{color: '#ef4444', fontWeight: 'bold'}}>{force}</span> N</span>
                        </label>
                        <input type="range" min="10" max="100" value={force} onChange={e => setForce(Number(e.target.value))} style={{accentColor: '#ef4444', height: '8px', width: '100%'}} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0', textAlign: 'center' }}>
                        <div style={{ padding: '1rem', background: 'white', borderRadius: '8px', border: '2px solid #cbd5e1' }}>
                            Useful Force (F x cos{angle}):
                            <h3 style={{ color: '#10b981', margin: '0.5rem 0 0 0' }}>{forceX.toFixed(1)} N</h3>
                        </div>
                        <div style={{ padding: '1rem', background: '#ecfdf5', borderRadius: '8px', border: '2px solid #34d399' }}>
                            Total Work Done:
                            <h3 style={{ color: '#047857', margin: '0.5rem 0 0 0' }}>{workDone.toFixed(0)} Joules</h3>
                        </div>
                    </div>

                    <div className="sim-visual" style={{ height: '200px', borderRadius: '1rem', background: '#f8fafc', position: 'relative', overflow: 'hidden', border: 'inset 4px #e2e8f0' }}>
                        {/* Floor */}
                        <div style={{ position: 'absolute', bottom: '0', left: 0, width: '100%', height: '30px', background: '#94a3b8' }}></div>
                        
                        {/* Box */}
                        <div style={{ position: 'absolute', bottom: '30px', left: '80px', width: '80px', height: '80px', background: '#f59e0b', borderRadius: '8px', border: '4px solid #b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', zIndex: 10 }}>10m →</div>

                        {/* Force Vector (Hypotenuse) */}
                        <div style={{
                            position: 'absolute', bottom: '70px', left: '160px', width: `${force * 2}px`, height: '4px', background: '#ef4444', 
                            transformOrigin: 'left center', transform: `rotate(${-angle}deg)`, zIndex: 5
                        }}>
                            <div style={{ position: 'absolute', right: '-10px', top: '-8px', borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '15px solid #ef4444' }}></div>
                            <span style={{ position: 'absolute', top: '-25px', right: '0', background: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold' }}>F: {force}N</span>
                        </div>

                        {/* Force X Vector (Useful) */}
                        <div style={{
                            position: 'absolute', bottom: '70px', left: '160px', width: `${forceX * 2}px`, height: '6px', background: '#10b981', 
                            zIndex: 6
                        }}>
                            <span style={{ position: 'absolute', bottom: '-25px', right: '0', background: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>Fx: {forceX.toFixed(1)}N</span>
                        </div>
                        
                        {/* Angle Arc representation */}
                        <div style={{ position: 'absolute', bottom: '70px', left: '160px', width: '40px', height: '40px', borderTopRightRadius: '40px', borderRight: '2px solid #8b5cf6', borderTop: '2px solid #8b5cf6', opacity: angle > 0 ? 1 : 0 }}>
                            <span style={{ position: 'absolute', top: '10px', right: '-20px', color: '#8b5cf6', fontSize: '0.8rem', fontWeight: 'bold' }}>{angle}°</span>
                        </div>
                    </div>
                </div>

            </article>
        </div>
    );
}
