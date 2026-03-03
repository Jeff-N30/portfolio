import { useEffect, useState } from "react";

export const Loading = ({ onCom }) => {
    const [text, setText] = useState("");
    const [exiting, setExiting] = useState(false);
    const [fontsReady, setFontsReady] = useState(false);
    const welcome = "<Jeff Nader/>";

    // Wait for web fonts to load before starting the typing animation,
    // so the user never sees a flash from fallback → Cormorant Garamond.
    useEffect(() => {
        document.fonts.ready.then(() => setFontsReady(true));
    }, []);

    useEffect(() => {
        if (!fontsReady) return;
        let i = 0;
        const interval = setInterval(() => {
            setText(welcome.substring(0, i));
            i++;
            if (i > welcome.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setExiting(true);
                    setTimeout(() => onCom(), 700);
                }, 800);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [fontsReady, onCom]);

    return (
        <div className={`loading-screen ${exiting ? 'exit' : ''}`}>
            <div className="loading-orb loading-orb-1"></div>
            <div className="loading-orb loading-orb-2"></div>
            <div className="loading-grain"></div>
            <div className="loading-ring"></div>

            <div className='loading-text'>
                {text}<span className="loading-cursor">|</span>
            </div>
            <div className="loading-bar-container">
                <div className="loading-bar"></div>
            </div>

            <style jsx>{`
                .loading-screen {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background: #000000;
                    color: #F5E6CA;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 100vw;
                    height: 100vh;
                    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                                transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .loading-screen.exit {
                    opacity: 0;
                    transform: scale(1.05);
                }

                .loading-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.15;
                    pointer-events: none;
                }

                .loading-orb-1 {
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(245, 230, 202, 0.3), transparent 70%);
                    top: 30%;
                    left: 35%;
                    animation: orbFloat1 8s ease-in-out infinite;
                }

                .loading-orb-2 {
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(245, 230, 202, 0.2), transparent 70%);
                    bottom: 30%;
                    right: 35%;
                    animation: orbFloat2 10s ease-in-out infinite;
                }

                .loading-grain {
                    position: absolute;
                    inset: -50%;
                    width: 200%;
                    height: 200%;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    opacity: 0.03;
                    pointer-events: none;
                    animation: grain 8s steps(10) infinite;
                }

                .loading-ring {
                    position: absolute;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    border: 1px solid rgba(245, 230, 202, 0.05);
                    animation: gentlePulse 3s ease-in-out infinite;
                    pointer-events: none;
                }

                .loading-text {
                    margin-bottom: 1.5rem;
                    font-size: 2.8rem;
                    font-family: 'Cormorant Garamond', 'SF Mono', Monaco, monospace;
                    font-weight: 700;
                    letter-spacing: -0.03em;
                    position: relative;
                    z-index: 2;
                    text-shadow: 0 0 60px rgba(245, 230, 202, 0.12);
                }

                .loading-cursor {
                    margin-left: 0.25rem;
                    animation: blink 1s infinite;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .loading-bar-container {
                    width: 200px;
                    height: 2px;
                    background: rgba(245, 230, 202, 0.06);
                    border-radius: 1px;
                    position: relative;
                    overflow: hidden;
                    z-index: 2;
                }

                .loading-bar {
                    width: 40%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, #F5E6CA, transparent);
                    box-shadow: 0 0 20px rgba(245, 230, 202, 0.4);
                    animation: loading 2s ease-in-out infinite;
                }

                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(350%); }
                }

                @media (max-width: 768px) {
                    .loading-text {
                        font-size: 1.875rem;
                    }
                }
            `}</style>
        </div>
    );
};
