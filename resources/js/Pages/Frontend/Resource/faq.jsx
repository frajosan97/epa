import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Container, Row, Col, Card, Accordion, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function FAQ() {
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const faqs = [
        {
            question: "What is the Economic Patriotic Alliance (EPA)?",
            answer: "EPA is a grassroots-driven political party focused on inclusive economic empowerment, patriotic leadership, and national unity in Kenya.",
            category: "General",
            icon: "🏛️"
        },
        {
            question: "How can I become a member of EPA?",
            answer: "You can register by dialing *384*12345# on your phone, or via our website's online registration portal.",
            category: "Membership",
            icon: "📱"
        },
        {
            question: "What are the benefits of becoming a member?",
            answer: "Members gain access to training, leadership opportunities, community engagement programs, early updates on party events, and the right to participate in decision-making and nominations.",
            category: "Membership",
            icon: "🎯"
        },
        {
            question: "Is there a membership fee?",
            answer: "No. EPA membership is currently free to all Kenyans who support the party's mission and values.",
            category: "Membership",
            icon: "💰"
        },
        {
            question: "How will I receive updates on party activities?",
            answer: "After registration, you will receive updates via SMS or email based on your selected preferences. You can also subscribe through our Events page.",
            category: "Communication",
            icon: "📢"
        },
        {
            question: "Can I participate in rallies and forums?",
            answer: "Yes. Members are encouraged to attend and volunteer at local and national events, rallies, and forums.",
            category: "Events",
            icon: "🎪"
        }
    ];

    return (
        <AppLayout>
            <Head title="FAQs – Economic Patriotic Alliance (EPA)" />

            {/* Hero Section */}
            <motion.div
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Container>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.h1
                            className="display-4 fw-bold text-white mb-3"
                            variants={itemVariants}
                        >
                            Frequently Asked Questions
                        </motion.h1>
                        <motion.p
                            className="lead text-white mb-4"
                            variants={itemVariants}
                        >
                            Quick answers to your questions about EPA
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
                                Last Updated: {new Date().toLocaleDateString()}
                            </Badge>
                        </motion.div>
                    </motion.div>
                </Container>
            </motion.div>

            {/* Search Section */}
            <motion.section
                className="py-4 bg-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control form-control-lg border-0 shadow-sm px-4 py-3"
                                    placeholder="Search FAQs..."
                                    aria-label="Search FAQs"
                                />
                                <button className="btn btn-primary position-absolute end-0 top-0 h-100 px-4">
                                    <i className="bi bi-search"></i> Search
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </motion.section>

            {/* Main Content */}
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.h2
                                className="fw-bold mb-4 text-center"
                                variants={itemVariants}
                            >
                                <span className="text-primary">EPA</span> Frequently Asked Questions
                            </motion.h2>

                            <motion.div variants={itemVariants}>
                                <Accordion defaultActiveKey="0" className="faq-accordion">
                                    {faqs.map((faq, index) => (
                                        <motion.div key={index} variants={itemVariants}>
                                            <Accordion.Item eventKey={index.toString()} className="mb-3 border-0 shadow-sm rounded-3 overflow-hidden">
                                                <Accordion.Header className="bg-light">
                                                    <div className="d-flex align-items-center w-100">
                                                        <span className="fs-4 me-3">{faq.icon}</span>
                                                        <div>
                                                            <h5 className="mb-0 fw-semibold">{faq.question}</h5>
                                                            <Badge bg="secondary" className="ms-2">{faq.category}</Badge>
                                                        </div>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body className="p-4">
                                                    <p className="mb-0">{faq.answer}</p>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </motion.div>
                                    ))}
                                </Accordion>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>

                {/* CTA Section */}
                <motion.div
                    className="mt-5 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="border-0 bg-primary text-white shadow-lg rounded-4 overflow-hidden">
                        <Card.Body className="p-4 p-lg-5">
                            <h3 className="fw-bold mb-3">Still have questions?</h3>
                            <p className="mb-4 fs-5">Contact our support team for personalized assistance.</p>
                            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                <a href="mailto:info@epa.or.ke" className="btn btn-light btn-lg px-4 py-2">
                                    <i className="bi bi-envelope me-2"></i> Email Us
                                </a>
                                <a href="tel:+254733868843" className="btn btn-outline-light btn-lg px-4 py-2">
                                    <i className="bi bi-telephone me-2"></i> Call Us
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </motion.div>
            </Container>
        </AppLayout>
    );
}