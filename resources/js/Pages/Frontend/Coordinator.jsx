import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Container, Row, Col, Card, Badge, Accordion, Table } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function Coordinator() {
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

    const roles = [
        {
            title: "Grassroots Mobilization and Recruitment",
            description: "Recruit new party members and promote EPA's ideology at county level",
            icon: "👥"
        },
        {
            title: "Coordination of Party Activities",
            description: "Plan local meetings, campaigns and implement party programs",
            icon: "🗓️"
        },
        {
            title: "Liaison with National Leadership",
            description: "Bridge between national HQ and local units with policy communication",
            icon: "🔗"
        },
        {
            title: "Election Preparedness",
            description: "Support nominations, identify candidates and monitor IEBC compliance",
            icon: "🗳️"
        },
        {
            title: "Conflict Resolution",
            description: "Mediate internal disputes and ensure fair nomination processes",
            icon: "⚖️"
        },
        {
            title: "Voter Education",
            description: "Organize civic education and encourage electoral participation",
            icon: "📢"
        },
        {
            title: "Monitoring and Evaluation",
            description: "Track performance of party-affiliated leaders and gather strategic data",
            icon: "📊"
        }
    ];

    const qualifications = [
        { requirement: "Education", detail: "KCSE minimum (diploma/degree preferred)", icon: "🎓" },
        { requirement: "Political Loyalty", detail: "Active EPA member with demonstrated commitment", icon: "❤️" },
        { requirement: "Leadership", detail: "Proven ability to manage teams and organize activities", icon: "🌟" },
        { requirement: "Communication", detail: "Fluent in English/Kiswahili + local dialects", icon: "💬" },
        { requirement: "Experience", detail: "Political organizing or community leadership", icon: "🛠️" },
        { requirement: "Integrity", detail: "Clean record and community respect", icon: "🛡️" },
        { requirement: "Legal Knowledge", detail: "Familiar with Political Parties Act & Constitution", icon: "📜" }
    ];

    const benefits = [
        { type: "Political Growth", description: "Path to elective or appointed office", icon: "📈" },
        { type: "Skills Development", description: "Leadership and governance training", icon: "🎯" },
        { type: "Local Power", description: "Influence in candidate selection and strategy", icon: "🏛️" },
        { type: "Social Standing", description: "Recognition as official party representative", icon: "👑" },
        { type: "Strategic Access", description: "Privileged political updates and information", icon: "🔍" }
    ];

    return (
        <AppLayout>
            <Head title="Call for County Coordinators" />

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
                            Call for County Coordinators
                        </motion.h1>
                        <motion.p
                            className="lead text-white mb-4"
                            variants={itemVariants}
                        >
                            Volunteer leadership opportunities with EPA
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
                                Application Deadline: 30th November 2023
                            </Badge>
                        </motion.div>
                    </motion.div>
                </Container>
            </motion.div>

            {/* Main Content */}
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            {/* Introduction */}
                            <motion.div variants={itemVariants} className="mb-5">
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="p-4 p-lg-5">
                                        <h2 className="fw-bold mb-3 text-center">Serve Your County with EPA</h2>
                                        <p className="lead text-center mb-4">
                                            The Economic Patriotic Alliance is seeking dynamic volunteers to serve as County Coordinators across all 47 counties.
                                        </p>
                                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                            <a href="#roles" className="btn btn-primary px-4 py-2">
                                                View Roles
                                            </a>
                                            <a href="#apply" className="btn btn-outline-primary px-4 py-2">
                                                How to Apply
                                            </a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>

                            {/* Key Roles Section */}
                            <motion.section variants={itemVariants} id="roles" className="mb-5">
                                <h2 className="fw-bold mb-4 text-center">
                                    <span className="text-primary">Key</span> Responsibilities
                                </h2>
                                <Row className="g-4">
                                    {roles.map((role, index) => (
                                        <Col md={6} lg={4} key={index}>
                                            <motion.div whileHover={{ y: -5 }}>
                                                <Card className="h-100 border-0 shadow-sm">
                                                    <Card.Body className="p-4">
                                                        <div className="d-flex align-items-start">
                                                            <span className="fs-3 me-3">{role.icon}</span>
                                                            <div>
                                                                <h5 className="fw-bold mb-2">{role.title}</h5>
                                                                <p className="mb-0">{role.description}</p>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </motion.div>
                                        </Col>
                                    ))}
                                </Row>
                            </motion.section>

                            {/* Qualifications Section */}
                            <motion.section variants={itemVariants} className="mb-5">
                                <h2 className="fw-bold mb-4 text-center">
                                    <span className="text-primary">Required</span> Qualifications
                                </h2>
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="p-0">
                                        <Accordion defaultActiveKey="0" flush>
                                            {qualifications.map((qual, index) => (
                                                <Accordion.Item eventKey={index.toString()} key={index} className="border-0">
                                                    <Accordion.Header className="py-3 px-4">
                                                        <div className="d-flex align-items-center">
                                                            <span className="fs-4 me-3">{qual.icon}</span>
                                                            <span className="fw-semibold">{qual.requirement}</span>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className="px-4 pb-3">
                                                        {qual.detail}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    </Card.Body>
                                </Card>
                            </motion.section>

                            {/* Benefits Section */}
                            <motion.section variants={itemVariants} className="mb-5">
                                <h2 className="fw-bold mb-4 text-center">
                                    <span className="text-primary">Benefits</span> of Serving
                                </h2>
                                <Card className="border-0 shadow-sm overflow-hidden">
                                    <Table responsive hover className="mb-0">
                                        <thead className="bg-primary text-white">
                                            <tr>
                                                <th className="ps-4">Benefit Type</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {benefits.map((benefit, index) => (
                                                <tr key={index}>
                                                    <td className="ps-4 fw-semibold">
                                                        <span className="me-2">{benefit.icon}</span>
                                                        {benefit.type}
                                                    </td>
                                                    <td>{benefit.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card>
                            </motion.section>

                            {/* CTA Section */}
                            <motion.section
                                variants={itemVariants}
                                id="apply"
                                className="mt-5 text-center"
                            >
                                <Card className="border-0 bg-primary text-white shadow-lg rounded-4 overflow-hidden">
                                    <Card.Body className="p-4 p-lg-5">
                                        <h3 className="fw-bold mb-3">Ready to Serve?</h3>
                                        <p className="mb-4 fs-5">Submit your expression of interest today</p>
                                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                            <a href="mailto:info@epa.or.ke" className="btn btn-light btn-lg px-4 py-2">
                                                <i className="bi bi-envelope me-2"></i> Email Application
                                            </a>
                                            <a href="tel:+254733868843" className="btn btn-outline-light btn-lg px-4 py-2">
                                                <i className="bi bi-telephone me-2"></i> Call for Details
                                            </a>
                                        </div>
                                        <div className="mt-4">
                                            <p className="mb-0 small">
                                                Include: CV, ID Copy, and Letter of Interest
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.section>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    );
}