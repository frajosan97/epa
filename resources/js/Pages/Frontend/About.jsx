import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroBanner from '@/Components/HeroBanner';
import {
    Badge,
    Card,
    Col,
    Container,
    Row,
    Table,
    ListGroup,
    Accordion
} from 'react-bootstrap';
import { BsAward, BsBuilding, BsClipboardCheck, BsClockHistory, BsCollection, BsGearFill, BsGlobe2, BsGraphUp, BsLightbulb, BsPeopleFill, BsPersonCheck, BsShieldCheck, BsShieldFillCheck } from 'react-icons/bs';

export default function About() {
    return (
        <AppLayout>
            <Head title='About' />

            {/* Hero Section */}
            <HeroBanner data={{
                title: "About Us",
                subtitle: "Learn about our mission and values"
            }} />

            <Container className="py-5">
                {/* Who We Are Section */}
                <Row className="mb-5">
                    <Col>
                        <div className="text-center mb-5">
                            <h2 className="text-primary mb-3">
                                <BsBuilding className="me-2" size={28} />
                                Economic Patriotic Alliance – Party Structure
                            </h2>
                            <p className="lead">Our organizational framework designed for effective governance and representation</p>
                        </div>

                        {/* National Organs Section */}
                        <Card className="mb-5 shadow-sm">
                            <Card.Header className="bg-primary text-white">
                                <h3 className="mb-0">
                                    <BsGearFill className="me-2" />
                                    National Organs
                                </h3>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className="d-flex align-items-center">
                                            <BsAward className="text-primary me-3" size={24} />
                                            <div>
                                                <h5 className="mb-1">National Delegates Congress (NDC)</h5>
                                                <p className="mb-0 text-muted">Supreme authority of the party</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex align-items-center">
                                            <BsPeopleFill className="text-primary me-3" size={24} />
                                            <div>
                                                <h5 className="mb-1">National Governing Council (NGC)</h5>
                                                <p className="mb-0 text-muted">Strategic oversight body</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex align-items-center">
                                            <BsClipboardCheck className="text-primary me-3" size={24} />
                                            <div>
                                                <h5 className="mb-1">National Executive Committee (NEC)</h5>
                                                <p className="mb-0 text-muted">Core executive leadership team</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex align-items-center">
                                            <BsPersonCheck className="text-primary me-3" size={24} />
                                            <div>
                                                <h5 className="mb-1">National Secretariat & Executive Director</h5>
                                                <p className="mb-0 text-muted">Responsible for day-to-day operations</p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>

                        {/* Specialized Committees & Caucuses */}
                        <Accordion defaultActiveKey="0" className="mb-5">
                            <Card className="shadow-sm">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <BsCollection className="me-2" />
                                        <h3 className="mb-0">Specialized Committees & Caucuses</h3>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col md={6}>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <div className="d-flex align-items-center">
                                                            <BsLightbulb className="text-primary me-3" size={20} />
                                                            <div>
                                                                <h5 className="mb-1">National Policy Committee</h5>
                                                                <p className="mb-0 text-muted">Policy formulation and review</p>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className="d-flex align-items-center">
                                                            <BsGraphUp className="text-primary me-3" size={20} />
                                                            <div>
                                                                <h5 className="mb-1">Steering Board</h5>
                                                                <p className="mb-0 text-muted">Overall party direction and coordination</p>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className="d-flex align-items-center">
                                                            <BsShieldCheck className="text-primary me-3" size={20} />
                                                            <div>
                                                                <h5 className="mb-1">Disciplinary Board</h5>
                                                                <p className="mb-0 text-muted">Member discipline and conduct</p>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                            <Col md={6}>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <div className="d-flex align-items-center">
                                                            <BsClockHistory className="text-primary me-3" size={20} />
                                                            <div>
                                                                <h5 className="mb-1">Elections Board</h5>
                                                                <p className="mb-0 text-muted">Internal elections management</p>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className="d-flex align-items-center">
                                                            <BsGlobe2 className="text-primary me-3" size={20} />
                                                            <div>
                                                                <h5 className="mb-1">Governors Caucus</h5>
                                                                <p className="mb-0 text-muted">Engagement with county leadership</p>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <div className="d-flex align-items-center">
                                                            <BsPeopleFill className="text-primary me-3" size={20} />
                                                            <div>
                                                                <h5 className="mb-1">Representative Caucuses</h5>
                                                                <p className="mb-0 text-muted">MPs, MCAs, Women, Youth, PWDs, Diaspora, SIGs</p>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>

                {/* Our Journey Section */}
                <Row className="mb-5">
                    <Col>
                        <Card className="border-0 border-start border-5 border-warning shadow-sm">
                            <Card.Body>
                                <Card.Title className="text-primary mb-4">
                                    <BsClockHistory className="me-2" />
                                    Our Journey Towards Social Justice
                                </Card.Title>
                                <Card.Text className="lead">
                                    The Economic Patriotic Alliance (EPA) is at the forefront of advocating for social democracy in Kenya,
                                    focusing on equitable governance and sustainable development.
                                </Card.Text>
                                <Card.Text>
                                    Founded to tackle critical socio-economic issues in Kenya, the EPA emerged from the collective vision
                                    of community leaders and activists. Our establishment was driven by the desire to create an inclusive
                                    society where everyone can thrive.
                                </Card.Text>
                                <Card.Text>
                                    The EPA has proudly served a diverse range of clients, including local communities, advocacy groups,
                                    and policy makers. We work collaboratively to ensure that their voices are heard and that their needs
                                    are prioritized in economic discussions.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Core Values Section */}
                <Row className="mb-5">
                    <Col>
                        <div className="text-center mb-5">
                            <h2 className="text-primary">
                                <BsAward className="me-2" />
                                Our Core Values
                            </h2>
                            <p className="lead text-muted">Guiding principles that shape our approach to advocacy and community engagement</p>
                        </div>

                        <Row>
                            {[
                                {
                                    icon: <BsGraphUp size={48} className="text-primary mb-3" />,
                                    title: "Equity",
                                    description: "We believe in fair opportunities for all, striving to eliminate barriers that hinder social and economic progress for marginalized communities."
                                },
                                {
                                    icon: <BsShieldFillCheck size={48} className="text-primary mb-3" />,
                                    title: "Integrity",
                                    description: "Our actions are rooted in transparency and honesty, ensuring that our advocacy efforts are ethical and trustworthy."
                                },
                                {
                                    icon: <BsGlobe2 size={48} className="text-primary mb-3" />,
                                    title: "Sustainability",
                                    description: "We prioritize sustainable development, fostering solutions that address current needs while preserving resources for future generations."
                                }
                            ].map((value, index) => (
                                <Col lg={4} md={6} className="mb-4" key={index}>
                                    <Card className="h-100 shadow-sm border-0">
                                        <Card.Body className="text-center p-4">
                                            <div className="text-center">
                                                {value.icon}
                                            </div>
                                            <Card.Title as="h4" className="mb-3">{value.title}</Card.Title>
                                            <Card.Text>{value.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    );
}