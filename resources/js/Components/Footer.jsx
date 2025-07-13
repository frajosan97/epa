import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Container className="footer-container py-5">
                {/* Column 1: About */}
                <div className="footer-column">
                    <img src="/storage/images/logo/logo.png" alt="Company Logo" className="footer-logo" />
                    <p className="footer-about-text">
                        We are dedicated to creating positive change through community engagement
                        and meaningful events that bring people together.
                    </p>
                    <div className="footer-social-links">
                        <a href="#" className="footer-social-link facebook">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="footer-social-link twitter">
                            <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="#" className="footer-social-link linkedin">
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a href="#" className="footer-social-link instagram">
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-column">
                    <h4 className="footer-column-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li className="footer-link-item">
                            <a href="/" className="footer-link">Home</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/about" className="footer-link">About Us</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/event" className="footer-link">Events</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/register" className="footer-link">Get Involved</a>
                        </li>
                        <li className="footer-link-item">
                            <a href="/contact" className="footer-link">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div className="footer-column">
                    <h4 className="footer-column-title">Contact Us</h4>
                    <div className="footer-contact-item">
                        <i className="bi bi-geo-alt-fill footer-contact-icon"></i>
                        <span>EPA PARTY<br />EPA HOUSE<br />P.O.BOX 2636-50200,Lusaka Road Bungoma, Kenya</span>
                    </div>
                    <div className="footer-contact-item">
                        <i className="bi bi-telephone-fill footer-contact-icon"></i>
                        <span>(+254) 733-868-843</span>
                    </div>
                    <div className="footer-contact-item">
                        <i className="bi bi-envelope-fill footer-contact-icon"></i>
                        <span>info@epa.or.ke</span>
                    </div>
                    <div className="footer-contact-item">
                        <i className="bi bi-clock-fill footer-contact-icon"></i>
                        <span>Mon-Fri: 9AM - 5PM</span>
                    </div>
                </div>

                {/* Column 4: Newsletter */}
                <div className="footer-column">
                    <h4 className="footer-column-title">Stay Updated</h4>
                    <p>Subscribe to our newsletter for the latest updates and events.</p>
                    <div className="footer-newsletter">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="footer-newsletter-input"
                        />
                        <button className="btn btn-primary-2" style={{ width: '100%' }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </Container>

            {/* Footer Bottom */}
            <div className="footer-bottom py-4">
                <Container className=''>
                    <Row>
                        <Col md={6} className="text-md-start">
                            &copy; {new Date().getFullYear()} EPA. All rights reserved.
                        </Col>
                        <Col md={6} className="text-md-end">
                            <a href="#" className="footer-legal-link me-3">Privacy Policy</a>
                            <a href="#" className="footer-legal-link me-3">Terms of Service</a>
                            <a href="#" className="footer-legal-link">Accessibility</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;