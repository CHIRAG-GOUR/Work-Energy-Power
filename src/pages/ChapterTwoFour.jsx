import React, { useState } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import SimSlingshot3D from '../components/SimSlingshot3D';
export default function ChapterTwoFour() {

    // PEg State
    const [mass, setMass] = useState(10); // kg
    const [height, setHeight] = useState(5); // m
    const g = 9.8;
    const PEg = mass * g * height;

    // PEe State
    const [stretch, setStretch] = useState(0); // cm (using arbitrary units)
    const [isShooting, setIsShooting] = useState(false);
    const [targetHit, setTargetHit] = useState(false);
    const k = 500; // Spring constant N/m
    const PEe = 0.5 * k * Math.pow(stretch / 100, 2); // Convert cm to m for calc

    const handleShoot = () => {
        if (stretch === 0) return;
        setIsShooting(true);
        // Calculate flight time based on stretch (more stretch = faster hit)
        const flightTime = Math.max(100, 1000 - stretch * 8); 
        setTimeout(() => setTargetHit(true), flightTime);
        setTimeout(() => {
            setIsShooting(false);
            setTargetHit(false);
            setStretch(0);
        }, 2500); // Reset after 2.5s
    };

    return (
        <div className="ui-grid" id="view-chapter-2.4">
            <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
                <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem', background: '#ea580c', color: 'white', border: 'none' }}>Module 2</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2, color: '#9a3412' }}>Chapter 4: Potential Energy</h1>
                <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', color: '#7c2d12' }}>
                    Stored energy waiting to be released
                </p>
            </header>

            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <article className="glass-card fade-in" style={{ padding: '2rem', animationDelay: '0.2s' }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155' }}>
                        <strong>Potential Energy (PE)</strong> is stored energy. An object has this energy because of its <em>position</em> or its <em>state</em>.
                        Unlike Kinetic Energy, you can't always "see" Potential Energy, but it's ready to be released!
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#475569' }}>There are two main types of Potential Energy we will explore:</p>

                    <div className="concept-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                        <div className="concept-card" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                            <div className="concept-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏗️</div>
                            <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Gravitational Potential Energy (PEg)</h3>
                            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>Energy an object has due to its height above the ground. The higher or heavier the object, the more energy it stores.</p>
                            <ul className="concept-list" style={{ listStyle: 'none', padding: 0, color: '#334155' }}>
                                <li><strong>Formula:</strong> <span style={{ fontFamily: 'monospace', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>PE = m × g × h</span></li>
                                <li><strong>m:</strong> Mass (kg)</li>
                                <li><strong>g:</strong> Gravity (9.8 m/s²)</li>
                                <li><strong>h:</strong> Height (m)</li>
                            </ul>
                        </div>
                        <div className="concept-card" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                            <div className="concept-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏹</div>
                            <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>Elastic Potential Energy (PEe)</h3>
                            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>Energy stored when an object is compressed, stretched, or twisted (like a spring or a rubber band).</p>
                            <ul className="concept-list" style={{ listStyle: 'none', padding: 0, color: '#334155' }}>
                                <li><strong>Formula:</strong> <span style={{ fontFamily: 'monospace', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>PE = ½kx²</span></li>
                                <li><strong>k:</strong> Spring Constant (Stiffness)</li>
                                <li><strong>x:</strong> Distance stretched/compressed</li>
                            </ul>
                        </div>
                    </div>
                </article>

                <article className="glass-card fade-in" style={{ padding: '2rem', animationDelay: '0.3s' }}>
                    <h2 style={{ color: '#1e40af', borderBottom: '2px solid #bfdbfe', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Experiential Activity 1: The Heavy Hoist</h2>
                    <p style={{ fontSize: '1.1rem', color: '#475569' }}>Use the controls to lift the crate. See how changing its mass or height affects its Gravitational Potential Energy.</p>

                    <div className="simulation-container" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', margin: '2rem 0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <div className="sim-controls">
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Mass (m):</strong> <span><span style={{color: '#8b5cf6', fontWeight: 'bold'}}>{mass}</span> kg</span>
                            </label>
                            <input type="range" min="1" max="100" value={mass} onChange={e => setMass(Number(e.target.value))} style={{accentColor: '#8b5cf6', width: '100%', marginBottom: '1rem'}} />
                            
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>Height (h):</strong> <span><span style={{color: '#3b82f6', fontWeight: 'bold'}}>{height}</span> m</span>
                            </label>
                            <input type="range" min="0" max="20" value={height} step="0.5" onChange={e => setHeight(Number(e.target.value))} style={{accentColor: '#3b82f6', width: '100%'}} />
                        </div>

                        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                            <div style={{ fontSize: '1.5rem', padding: '1rem', background: '#dbeafe', color: '#1e40af', borderRadius: '8px', display: 'inline-block', border: '2px solid #93c5fd' }}>
                                Stored PEg: <strong>{PEg.toFixed(0)} Joules</strong>
                            </div>
                        </div>

                        <div className="sim-visual" style={{ height: '300px', borderRadius: '1rem', background: '#e0f2fe', position: 'relative', overflow: 'hidden', border: 'inset 4px #bae6fd' }}>
                            {/* Ground */}
                            <div style={{ position: 'absolute', bottom: '0', left: 0, width: '100%', height: '40px', background: '#475569' }}></div>
                            
                            {/* The Crane Tower */}
                            <div style={{ position: 'absolute', left: '20px', width: '20px', height: '100%', background: '#334155' }}></div>
                            <div style={{ position: 'absolute', left: '20px', top: '20px', width: '150px', height: '15px', background: '#334155' }}></div>
                            
                            {/* The Rope */}
                            <div style={{ 
                                position: 'absolute', left: `${80 + (50+mass/2)/2 - 2}px`, 
                                background: '#334155', width: '4px', top: '35px', 
                                bottom: `${40 + (50+mass/2) + (height/20)*200}px`,
                                transition: 'bottom 0.3s, left 0.3s'
                            }}></div>

                            {/* The Crate */}
                            <div style={{
                                position: 'absolute', left: '80px', width: `${50 + mass/2}px`, height: `${50 + mass/2}px`,
                                bottom: `${40 + (height/20)*200}px`, // Max height 200px equivalent to 20m
                                background: '#ca8a04', border: '4px solid #854d0e', borderRadius: '4px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', fontWeight: 'bold',
                                transition: 'bottom 0.3s, width 0.3s, height 0.3s',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
                            }}>{mass}kg</div>
                            
                            {/* Height marker */}
                            <div style={{ position: 'absolute', left: '220px', bottom: '40px', height: `${(height/20)*200}px`, width: '2px', borderLeft: '2px dashed #94a3b8', transition: 'height 0.3s' }}>
                            <span style={{ position: 'absolute', top: '-25px', left: '-15px', background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>{height}m</span>
                            </div>
                        </div>
                    </div>
                </article>

                <article className="glass-card fade-in" style={{ padding: '2rem', animationDelay: '0.4s', background: '#fcf8ff', border: '1px solid #f3e8ff' }}>
                    <h2 style={{ color: '#86198f', borderBottom: '2px solid #f0abfc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Experiential Activity 2: The Slingshot (3D)</h2>
                    <p style={{ fontSize: '1.1rem', color: '#475569' }}>Pull back the rubber band using the slider. The further you stretch it, the more Elastic Potential Energy you store up!</p>

                    <div className="simulation-container" style={{ margin: '2rem 0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderRadius: '24px' }}>
                        <SimSlingshot3D />
                    </div>
                </article>
            </div>
        </div>
    );
}