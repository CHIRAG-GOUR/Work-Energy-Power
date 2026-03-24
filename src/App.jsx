import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ChapterOneOne from './pages/ChapterOneOne';
import ChapterOneTwo from './pages/ChapterOneTwo';
import ChapterOneThree from './pages/ChapterOneThree';
import ChapterTwoOne from './pages/ChapterTwoOne';
import ChapterTwoTwo from './pages/ChapterTwoTwo';
import ChapterTwoThree from './pages/ChapterTwoThree';
import ChapterTwoFour from './pages/ChapterTwoFour';
import ChapterTwoFive from './pages/ChapterTwoFive';
import ChapterTwoSix from './pages/ChapterTwoSix';
import ChapterTwoSeven from './pages/ChapterTwoSeven';
import { initBackground } from './lib/background';

function Layout({ children }) {
    const location = useLocation();

    useEffect(() => {
        // Initialize the 3D Background once
        const cleanupBg = initBackground();

        // Setup scroll progress listener
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            
            const progressFill = document.querySelector('.progress-fill');
            if(progressFill) {
              progressFill.style.width = scrolled + '%';
              if (scrolled < 25) progressFill.style.backgroundColor = 'var(--accent-color)';
              else if (scrolled < 50) progressFill.style.backgroundColor = 'var(--success-color)';
              else if (scrolled < 75) progressFill.style.backgroundColor = 'var(--warning-color)';
              else progressFill.style.backgroundColor = 'var(--error-color)';
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            if (cleanupBg) cleanupBg();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Fullscreen logic
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <>
            <canvas id="bg-canvas" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}></canvas>

            <div id="ui-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
                <button id="fullscreen-btn" onClick={toggleFullscreen} className="glass-card" style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999, border: 'none', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', pointerEvents: 'auto' }}>
                    <svg id="fs-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    </svg>
                </button>

                <div id="progressBar" style={{ pointerEvents: 'none' }}>
                    <div className="progress-fill"></div>
                </div>

                <main className="content-wrapper" style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                    {children}
                </main>
            </div>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/1.1" replace />} />
                    <Route path="/1.1" element={<ChapterOneOne />} />
                    <Route path="/1.2" element={<ChapterOneTwo />} />
                    <Route path="/1.3" element={<ChapterOneThree />} />
                    <Route path="/2.1" element={<ChapterTwoOne />} />
                    <Route path="/2.2" element={<ChapterTwoTwo />} />
                    <Route path="/2.3" element={<ChapterTwoThree />} />
                    <Route path="/2.4" element={<ChapterTwoFour />} />
                    <Route path="/2.5" element={<ChapterTwoFive />} />
                    <Route path="/2.6" element={<ChapterTwoSix />} />
                    <Route path="/2.7" element={<ChapterTwoSeven />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

