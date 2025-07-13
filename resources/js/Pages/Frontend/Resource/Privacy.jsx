import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function Terms() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const heroVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <AppLayout>
            <Head title="Privacy Policy & Terms" />

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay"></div>
                <Container className="hero-content">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h1
                            className="display-4 fw-bold text-white mb-4"
                            variants={heroVariants}
                        >
                            Privacy Policy & Terms
                        </motion.h1>
                        <motion.p
                            className="lead text-white mb-5"
                            variants={heroVariants}
                        >
                            <p className="lead">
                                Your trust is our priority. Learn how EPA handles your data with transparency and security.
                            </p>
                            <Badge bg="light" text="dark" className="mt-2">
                                Updated: {new Date().toLocaleDateString()}
                            </Badge>
                        </motion.p>
                    </motion.div>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                            <Card.Body className="p-4 p-lg-5">
                                <div className="policy-content">
                                    <p className="mb-4 fs-5 text-muted">
                                        The <strong>Economic Patriotic Alliance (EPA)</strong> is committed to protecting your personal information in compliance with:
                                    </p>
                                    <ul className="list-unstyled mb-4">
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="badge bg-secondary me-2 mt-1">✓</span>
                                            <span>The <strong>Political Parties Act Cap 7D</strong></span>
                                        </li>
                                        <li className="d-flex align-items-start mb-2">
                                            <span className="badge bg-secondary me-2 mt-1">✓</span>
                                            <span>The <strong>Data Protection Act, 2019</strong></span>
                                        </li>
                                        <li className="d-flex align-items-start">
                                            <span className="badge bg-secondary me-2 mt-1">✓</span>
                                            <span>Related regulations</span>
                                        </li>
                                    </ul>

                                    <hr className="my-4" />

                                    <h4 className="fw-bold mb-4 d-flex align-items-center">
                                        <span className="me-2">🔒</span> Information We Collect
                                    </h4>
                                    <p className="mb-3">
                                        In compliance with <strong>Form PPM1</strong> of the Political Parties (Membership) Regulations, 2021, we collect:
                                    </p>
                                    <Row>
                                        <Col md={6}>
                                            <ul className="list-styled">
                                                <li>Full Name</li>
                                                <li>National ID/Passport Number</li>
                                                <li>Date of Birth</li>
                                                <li>Gender</li>
                                                <li>Phone Number</li>
                                                <li>Email Address</li>
                                            </ul>
                                        </Col>
                                        <Col md={6}>
                                            <ul className="list-styled">
                                                <li>County, Constituency & Ward</li>
                                                <li>Preferred Notification Channel</li>
                                                <li>Consent to join the party</li>
                                                <li>Registration method (online/USSD/manual)</li>
                                                <li>Photograph or signature (if applicable)</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <div className="alert alert-info mt-3">
                                        <strong>Note:</strong> This data is submitted to the <strong>Office of the Registrar of Political Parties (ORPP)</strong> for verification via the <strong>IPPMS</strong> system.
                                    </div>

                                    <hr className="my-4" />

                                    <h4 className="fw-bold mb-4 d-flex align-items-center">
                                        <span className="me-2">🛡️</span> How We Use Your Data
                                    </h4>
                                    <Row className="g-4">
                                        {[
                                            {
                                                icon: "📝",
                                                title: "Membership Registration",
                                                text: "To officially enroll you as an EPA member."
                                            },
                                            {
                                                icon: "🔍",
                                                title: "Eligibility Verification",
                                                text: "Prevent duplicate or fraudulent entries."
                                            },
                                            {
                                                icon: "📢",
                                                title: "Communication",
                                                text: "Send party updates, events, and election info."
                                            },
                                            {
                                                icon: "⚖️",
                                                title: "Legal Compliance",
                                                text: "Fulfill statutory reporting to ORPP."
                                            }
                                        ].map((item, index) => (
                                            <Col md={6} key={index}>
                                                <div className="h-100 p-3 border rounded-3 bg-light">
                                                    <h5 className="d-flex align-items-center">
                                                        <span className="me-2">{item.icon}</span>
                                                        {item.title}
                                                    </h5>
                                                    <p className="mb-0">{item.text}</p>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>

                                    <hr className="my-4" />

                                    <h4 className="fw-bold mb-4 d-flex align-items-center">
                                        <span className="me-2">🔐</span> Data Protection
                                    </h4>
                                    <div className="bg-light p-4 rounded-3 mb-3">
                                        <p className="mb-0">
                                            <strong>Strict confidentiality:</strong> Your data is <strong>never</strong> shared with third parties except as required by law. We use:
                                        </p>
                                        <ul className="mt-2 mb-0">
                                            <li>Military-grade encryption</li>
                                            <li>Role-based access controls</li>
                                            <li>Regular security audits</li>
                                        </ul>
                                    </div>

                                    <hr className="my-4" />

                                    <h4 className="fw-bold mb-4 d-flex align-items-center">
                                        <span className="me-2">⚖️</span> Your Rights
                                    </h4>
                                    <div className="row g-3">
                                        {[
                                            { icon: "👁️", right: "Access your personal data" },
                                            { icon: "✏️", right: "Request corrections" },
                                            { icon: "🗑️", right: "Request deletion" },
                                            { icon: "✋", right: "Withdraw consent" },
                                            { icon: "📢", right: "Lodge complaints with ODPC" }
                                        ].map((item, index) => (
                                            <div className="col-md-6" key={index}>
                                                <div className="d-flex align-items-start p-2">
                                                    <span className="fs-4 me-3">{item.icon}</span>
                                                    <span>{item.right}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <hr className="my-4" />

                                    <h4 className="fw-bold mb-4 d-flex align-items-center">
                                        <span className="me-2">📞</span> Contact Us
                                    </h4>
                                    <Card className="border-primary">
                                        <Card.Body>
                                            <div className="d-flex flex-column flex-md-row align-items-center">
                                                <div className="mb-3 mb-md-0 me-md-4">
                                                    <span className="fs-1">📧</span>
                                                </div>
                                                <div>
                                                    <h5 className="mb-1">Data Protection Officer</h5>
                                                    <p className="mb-1">
                                                        <a href="mailto:info@epa.or.ke" className="text-decoration-none">info@epa.or.ke</a>
                                                    </p>
                                                    <p className="mb-0">
                                                        <a href="tel:+254733868843" className="text-decoration-none">+254 733 868 843</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    );
}