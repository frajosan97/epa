import React from 'react';
import { Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import '../../css/Welcome.css';
import { Link } from '@inertiajs/react';

export default function WelcomeSection() {
    return (
        <section className='welcome-section'>
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="order-lg-2 mb-4 mb-lg-0">
                        <div className="leader-image-container">
                            <img
                                src={'/storage/images/others/dr.jpeg'}
                                alt="MKP Party Leader"
                                className="leader-image img-fluid"
                            />
                            <div className="leader-quote text-center">
                                <h4 className='fw-bold text-main'>Amb.Dr.George Masafu</h4>
                                <blockquote>
                                    "PARTY LEADER"
                                </blockquote>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} className="order-lg-1">
                        <div className="welcome-content">
                            <h3 className="welcome-title">
                                Our Journey Towards <span className="highlight">Social Justice</span>
                            </h3>
                            <p className="welcome-text">
                                With extensive experience in political advocacy and economic reform, the Economic Patriotic Alliance (EPA) leverages years of expertise to influence social democracy in Kenya.
                            </p>
                            <p className="welcome-subtext">
                                Our team, comprised of seasoned professionals and activists, is deeply rooted in the community’s needs and concerns, working tirelessly to create sustainable solutions for economic challenges.
                            </p>
                            <ButtonGroup className='gap-2'>
                                <Button as={Link}  href='/about' variant="primary" size='lg' className='rounded'>
                                    Learn More
                                </Button>
                                <Button as={Link} href='/event' variant="outline-primary" size='lg' className='rounded'>
                                    Events
                                </Button>
                                {/* <Button as={Link}  variant="primary" size='lg' className='rounded'>
                                    Latest News
                                </Button> */}
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}