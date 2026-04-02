import React, { useState, useEffect } from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import SimCrash3DContainer from '../components/SimCrash3D';

export default function ChapterTwoTwo() {

    // Kinetic Energy Sim state
    const [mass, setMass] = useState(10); // kg
    const [velocity, setVelocity] = useState(5); // m/s
    const [isCrashing, setIsCrashing] = useState(false);
    
    // Formula: KE = 1/2 * m * v^2
    const kineticEnergy = 0.5 * mass * Math.pow(velocity, 2);

    const triggerCrash = () => {
        setIsCrashing(true);
        setTimeout(() => setIsCrashing(false), 3000); // Reset after 3 seconds
    };

    return (
        <div className="ui-grid" id="view-chapter-2.2">
            <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
                <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem', background: '#ea580c', color: 'white', border: 'none' }}>Module 2</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2, color: '#9a3412' }}>Chapter 2: Kinetic Energy in Action</h1>
                <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', color: '#7c2d12' }}>
                    The energy of motion
                </p>
            </header>

            <article className="glass-card fade-in" style={{ gridColumn: '1 / -1', padding: '3rem' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    <strong>Kinetic Energy (KE)</strong> is the energy of motion. Any object that is moving has kinetic energy. 
                    The faster it moves, or the heavier it is, the more kinetic energy it possesses.
                </p>

                <div className="highlight-box math-box" style={{ background: '#bfdbfe', borderLeft: '4px solid #3b82f6', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                    <p style={{ margin: 0, fontSize: '1.2rem', textAlign: 'center' }}>
                        <strong>Formula:</strong> <span style={{ fontFamily: 'monospace', fontSize: '1.3rem' }}>KE = ½mv²</span>
                    </p>
                    <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                        Where <strong>m</strong> = mass (kg), and <strong>v</strong> = velocity (m/s)
                    </p>
                </div>

                <h2 style={{ fontSize: '2rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', color: '#1e293b' }}>Experiential Activity: Crash Test Simulator</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Change the mass of the car and its speed. Watch how much force it delivers when it hits the block. Notice that doubling the speed increases the Kinetic Energy by <em>four</em> times!</p>

                <div className="simulation-container" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem', margin: '2rem 0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <div className="sim-controls">
                        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Mass of Car (m):</strong> <span><span style={{color: '#8b5cf6', fontWeight: 'bold'}}>{mass}</span> kg</span>
                        </label>
                        <input type="range" min="1" max="50" value={mass} onChange={e => setMass(Number(e.target.value))} disabled={isCrashing} style={{accentColor: '#8b5cf6', height: '8px', width: '100%', marginBottom: '1rem'}} />
                        
                        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>Velocity (v):</strong> <span><span style={{color: '#f43f5e', fontWeight: 'bold'}}>{velocity}</span> m/s</span>
                        </label>
                        <input type="range" min="1" max="20" value={velocity} onChange={e => setVelocity(Number(e.target.value))} disabled={isCrashing} style={{accentColor: '#f43f5e', height: '8px', width: '100%'}} />
                    </div>

                    <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                        <div style={{ fontSize: '1.5rem', padding: '1rem', background: 'white', borderRadius: '8px', display: 'inline-block', border: '2px solid #e2e8f0' }}>
                            Current KE: <strong>{kineticEnergy.toFixed(1)} Joules</strong>
                        </div>
                        <br />
                        <button 
                            onClick={() => setIsCrashing(true)} 
                            disabled={isCrashing}
                            style={{ margin: '1rem', padding: '1rem 2rem', fontSize: '1.2rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '3rem', cursor: isCrashing ? 'not-allowed' : 'pointer', fontWeight: 'bold', boxShadow: '0 4px 0 #2563eb', transition: 'all 0.1s' }}
                            onMouseDown={e => e.currentTarget.style.transform = 'translateY(4px)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'translateY(0px)'}
                        >
                            💥 CRASH TEST
                        </button>
                    </div>

                    <SimCrash3DContainer 
                        mass={mass} 
                        velocity={velocity} 
                        isCrashing={isCrashing} 
                        onCrashEnd={() => setIsCrashing(false)} 
                    />
                </div>
            </article>
        </div>
    );
}
