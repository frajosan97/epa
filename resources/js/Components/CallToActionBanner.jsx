import React from 'react';
import { Button } from 'react-bootstrap';
import '../../css/CallToAction.css';

export default function CallToActionBanner() {
    return (
        <section className="cta-banner">
            <div className="cta-particle-background"></div>
            <div className="cta-overlay"></div>
            <div className="cta-content">
                <div className="cta-text-container">
                    <div className="cta-sparkle"></div>
                    <h2 className="cta-heading">Join The Movement</h2>
                    <p className="cta-text">
                        <span className="cta-highlight">Embrace the call</span> for change and stand tall for the{" "}
                        <span className="cta-underline">country we envision together</span>.
                    </p>
                    <div className="cta-button-container">
                        <Button as='a' href='/' variant="mkp-yellow" className="cta-button">
                            Download Manifesto
                            <span className="cta-button-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Button>
                        <div className="cta-button-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}