import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../css/HeaderLinks.css';

export default function HeaderLinks() {
    return (
        <div className='header-links-container'>
            <Container className='px-lg-0'>
                <Row className='header-links d-flex justify-content-between align-items-center'>
                    <Col className='left-header-links'>
                        <a href="tel:+254733868843" className='contact-link'>
                            <i className="bi bi-telephone-fill contact-icon phone-icon"></i>
                            Hotline (+254) 733-868-843
                        </a>
                        <a href="mailto:info@epa.or.ke" className='contact-link'>
                            <i className="bi bi-envelope-fill contact-icon email-icon"></i>
                            info@epa.or.ke
                        </a>
                    </Col>
                    <Col className='right-header-links d-none d-md-flex'>
                        <a href="https://www.facebook.com/people/Economic-Patriotic-Alliance/61556977056535/" className='social-link facebook'>
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://x.com/epapartyke" className='social-link twitter'>
                            <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/economic-patriotic-alliance-8205772b7/" className='social-link linkedin'>
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/epapartyke/" className='social-link instagram'>
                            <i className="bi bi-instagram"></i>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}