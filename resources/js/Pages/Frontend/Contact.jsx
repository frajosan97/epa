import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone
} from 'react-icons/fa';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import HeroBanner from '@/Components/HeroBanner';
import { BsTwitterX } from 'react-icons/bs';

export default function Contact() {
    return (
        <AppLayout>
            <Head title="Contact Us" />

            {/* Hero Section */}
            <HeroBanner data={{
                title: "Get In Touch",
                subtitle: "We'd love to hear from you! Reach out for inquiries, collaborations, or feedback."
            }} />

            {/* Contact Section */}
            <Container className="my-5">
                <Row className="g-4">
                    {/* Contact Form */}
                    <Col md={6}>
                        <Card className="h-100 border-0 shadow p-4">
                            <Card.Body>
                                <Card.Title as="h2" className="mb-4">Send Us a Message</Card.Title>
                                <Form>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Your Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="John Doe"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="hello@example.com"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="message">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Your message here..."
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100">
                                        Send Message
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Contact Info */}
                    <Col md={6}>
                        <Card className="h-100 border-0 shadow p-4">
                            <Card.Body>
                                <Card.Title as="h2" className="mb-4">Contact Information</Card.Title>

                                <div className="d-flex mb-4">
                                    <div className="me-3 text-primary">
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <div>
                                        <h5>Our Location</h5>
                                        <p className="mb-0">
                                            EPA PARTY<br />
                                            EPA HOUSE<br />
                                            P.O.BOX 2636-50200, Lusaka Road Bungoma, Kenya
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <div className="me-3 text-primary">
                                        <FaEnvelope size={24} />
                                    </div>
                                    <div>
                                        <h5>Email Us</h5>
                                        <p className="mb-0">
                                            info@epa.or.ke<br />
                                            support@epa.or.ke
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <div className="me-3 text-primary">
                                        <FaPhone size={24} />
                                    </div>
                                    <div>
                                        <h5>Call Us</h5>
                                        <p className="mb-0">
                                            +254733868843<br />
                                            Mon-Fri, 9am-5pm EAT
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="mb-3">Follow Us</h5>
                                    <div className="d-flex gap-3">
                                        {[
                                            { name: 'Facebook', icon: <FaFacebook size={24} />, link: 'https://www.facebook.com/people/Economic-Patriotic-Alliance/61556977056535/' },
                                            { name: 'Twitter', icon: <BsTwitterX size={24} />, link: 'https://x.com/epapartyke' },
                                            { name: 'LinkedIn', icon: <FaLinkedin size={24} />, link: 'https://www.linkedin.com/in/economic-patriotic-alliance-8205772b7/' },
                                            { name: 'Instagram', icon: <FaInstagram size={24} />, link: 'https://www.instagram.com/epapartyke/' }
                                        ].map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.link}
                                                className="text-decoration-none text-dark"
                                                aria-label={social.name}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    );
}