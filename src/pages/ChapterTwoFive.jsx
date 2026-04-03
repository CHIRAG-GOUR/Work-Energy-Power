import React from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

export default function ChapterTwoFive() {
    return (
        <div className="ui-grid" id="view-chapter-2.5">
            <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(135deg, #ffedd5, #fef3c7)', border: '2px solid #fbd38d' }}>
                <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem', background: '#ea580c', color: 'white', border: 'none' }}>Module 2</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2, color: '#9a3412' }}>Chapter 5: Law of Conservation of Energy</h1>
                <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', color: '#7c2d12' }}>
                    Energy cannot be created or destroyed
                </p>
            </header>

            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <article className="glass-card fade-in" style={{ padding: '2rem', animationDelay: '0.2s' }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155' }}>
                        The <strong>Law of Conservation of Energy</strong> states something truly magical: <em>Energy cannot be created or destroyed. It can only be transformed from one form into another.</em>
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#475569' }}>
                        If you drop a ball, its Gravitational Potential Energy turns into Kinetic Energy. The total amount of energy remains exactly the same!
                    </p>

                    <div className="math-box highlight-box" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1.5rem', borderRadius: '12px', margin: '2rem 0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <p style={{ margin: 0, fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', fontFamily: 'monospace', color: '#b45309' }}>
                            Total Energy = KE + PE = Constant
                        </p>
                    </div>
                </article>

                <article className="glass-card fade-in" style={{ padding: '2rem', animationDelay: '0.25s', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '24px' }}>
                    <h2 style={{ color: '#15803d', borderBottom: '2px solid #bbf7d0', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Conservation of Energy in Action</h2>
                    <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>Watch this animated explanation to understand exactly how energy transforms from one state to another.</p>
                    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', borderRadius: '1rem', overflow: 'hidden', border: '4px solid white', boxShadow: '0 10px 25px rgba(21, 128, 61, 0.2)' }}>
                        <CustomVideoPlayer src="/videos/PWNs7i4rEWA.mp4" title="Conservation of Energy" />
                    </div>
                </article>

                <article className="glass-card fade-in" style={{ padding: '2rem', animationDelay: '0.3s', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <h2 style={{ color: '#0369a1', borderBottom: '2px solid #bae6fd', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Experiential Activity: The Skatepark Half-Pipe (PhET)</h2>
                    <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1.5rem' }}>Watch the skater go back and forth on the half-pipe. Pay close attention to the energy bar charts. As Potential Energy (PE) decreases, Kinetic Energy (KE) increases, but the Total Energy never changes!</p>

                    <div className="simulation-container" style={{ margin: '2rem 0', height: '650px', background: 'white', borderRadius: '1.5rem', overflow: 'hidden', border: '4px solid #0ea5e9' }}>
                        <iframe 
                            src="https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html"
                            width="100%" 
                            height="100%" 
                            scrolling="no" 
                            allowFullScreen 
                            style={{ border: 'none' }}
                            title="PhET Energy Skate Park"
                        ></iframe>
                    </div>
                </article>
            </div>
        </div>
    );
}