
import React from 'react';
import SimPullCartContainer from '../components/SimPullCart3D';

export default function ChapterOneTwo() {

    return (
        <div className="ui-grid" id="view-chapter-1.2">
            {/* Header */}
            <header className="glass-card banner-card fade-in" style={{ animationDelay: '0.1s', gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem' }}>
                <span className="module-badge" style={{ display: 'inline-block', marginBottom: '1rem', fontSize: '1rem' }}>Module 1</span>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0 0 1rem 0', lineHeight: 1.2 }}>Chapter 2: Scientific Conception of Work</h1>
                <p className="subtitle" style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
                    In science, work isn't a feeling; it's a measurable transaction between a force and a distance.
                </p>
            </header>

            {/* Content - Scientific Test */}
            <div className="content-grid-half" style={{ gridColumn: '1 / -1' }}>
                <article className="glass-card fade-in">
                    <h3>The Scientific Litmus Test for "Work"</h3>
                    <p>In everyday life, we use "work" to describe any mental or physical exertion. In physics, however, work is strictly defined by a change in position caused by an external influence.</p>
                    <p>To determine if work has been performed, you must satisfy this two-part checklist:</p>
                    <ol style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                        <li><strong>Application of Force:</strong> An external push or pull must act upon the object.</li>
                        <li><strong>Measurable Displacement:</strong> The object must actually change its position in the direction of that force.</li>
                    </ol>
                </article>
                <article className="info-block fade-in" style={{ alignSelf: 'center', background: '#fffbeb', borderColor: '#fde68a', boxShadow: 'var(--card-shadow), var(--inset-shadow)' }}>
                    <h3 style={{ color: '#d97706', textAlign: 'center' }}>The Golden Rule</h3>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', marginTop: '1rem', lineHeight: '1.8' }}>
                        If <br />
                        <span style={{ background: '#fef3c7', padding: '5px 15px', borderRadius: '10px', border: '1px solid #fcd34d' }}>Force × Displacement = 0</span>
                        <br />then technically, no work has been done.
                    </p>
                </article>
            </div>

            {/* Scenario Table */}
            <article className="glass-card fade-in" style={{ gridColumn: '1 / -1' }}>
                <div className="table-responsive" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <table className="glass-table">
                        <thead>
                            <tr><th>Scenario</th><th>Force Applied?</th><th>Movement?</th><th>Scientific Verdict</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Pushing a Pebble</td><td>Yes</td><td>Yes</td><td><span className="badge badge-success">Work Done</span></td></tr>
                            <tr><td>Pulling a Trolley</td><td>Yes</td><td>Yes</td><td><span className="badge badge-success">Work Done</span></td></tr>
                            <tr><td>Lifting a Book</td><td>Yes</td><td>Yes</td><td><span className="badge badge-success">Work Done</span></td></tr>
                            <tr><td>Pushing a Brick Wall</td><td>Yes</td><td>No</td><td><span className="badge badge-error">Zero Work</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </article>

            {/* The Bullock Cart content */}
            <div className="content-grid-half" style={{ gridColumn: '1 / -1' }}>
                <article className="glass-card fade-in">
                    <h3>🐂 The Bullock Cart</h3>
                    <p>A bullock is pulling a cart. The cart moves. There is a force on the cart and the cart has moved.</p>
                    <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                        <li><strong>The Force:</strong> The muscular effort of the bullock transferred through the harness.</li>
                        <li><strong>The Displacement:</strong> The cart moves from its starting point to a new location.</li>
                        <li><strong>Conclusion:</strong> Because both criteria are met, work is definitely being done.</li>
                    </ul>
                </article>
                <div className="key-takeaway" style={{ alignSelf: 'center', marginTop: '0' }}>
                    Scientific "Work" is the bridge between Force and Motion. If you exert a massive force but the object remains stubborn and stationary, your "hard work" remains an internal biological struggle, not a physical achievement.
                </div>
            </div>

            {/* Sim 2: Pull Cart */}
            <article className="glass-card fade-in" style={{ gridColumn: '1 / -1', padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '2rem 2rem 1rem 2rem' }}>
                    <h2>🐂 Interactive: The Pull Engine</h2>
                    <p>Click & hold to apply force and pull the 3D cart. Watch how work done increases exactly in proportion to the displacement!</p>
                </div>
                {/* Replaced legacy canvas with 3D React Three Fiber Container */}
                <SimPullCartContainer />
            </article>

            <footer className="app-footer fade-in" style={{ gridColumn: '1 / -1', marginTop: '2rem' }}>
                Mod 1 Chapter 2 | skillizee.io
            </footer>
        </div>
    );
}
