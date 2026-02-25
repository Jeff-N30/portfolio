import { useEffect, useState } from "react";

export const Loading = ({ onCom }) => {
    const [text, setText] = useState("");
    const welcome = "<Jeff Nader/>";
    
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(welcome.substring(0, i));
            i++;
            if (i > welcome.length) {
                clearInterval(interval);
                setTimeout(() => {
                    onCom();
                }, 1000);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [onCom]);

    return (
        <div className='loading-screen'>
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
                    color: #ffffff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 100vw;
                    height: 100vh;
                }

                .loading-text {
                    margin-bottom: 1.5rem;
                    font-size: 2.5rem;
                    font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
                    font-weight: 700;
                    letter-spacing: -0.01em;
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
                    background: #2c2c2e;
                    border-radius: 1px;
                    position: relative;
                    overflow: hidden;
                }

                .loading-bar {
                    width: 40%;
                    height: 100%;
                    background: #ffffff;
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
                    animation: loading 2s ease-in-out infinite;
                }

                @keyframes loading {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(350%);
                    }
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
