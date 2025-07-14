import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroBanner from '@/Components/HeroBanner';
import { Badge, Card, Col, Container, Row, Table } from 'react-bootstrap';

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
                        <h2 className="text-main mb-3">Economic Patriotic Alliance – Party Structure</h2>

                        {/* National Organs Section */}
                        <h3 className="mt-4 mb-3">National Organs</h3>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Organ</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>National Delegates Congress (NDC)</td>
                                    <td>Supreme authority of the party</td>
                                </tr>
                                <tr>
                                    <td>National Governing Council (NGC)</td>
                                    <td>Strategic oversight body</td>
                                </tr>
                                <tr>
                                    <td>National Executive Committee (NEC)</td>
                                    <td>Core executive leadership team</td>
                                </tr>
                                <tr>
                                    <td>National Secretariat & Executive Director</td>
                                    <td>Responsible for day-to-day operations</td>
                                </tr>
                            </tbody>
                        </Table>

                        {/* Specialized Committees & Caucuses */}
                        <h3 className="mt-4 mb-3">Specialized Committees & Caucuses</h3>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Committee/Caucus</th>
                                    <th>Focus Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>National Policy Committee</td>
                                    <td>Policy formulation and review</td>
                                </tr>
                                <tr>
                                    <td>Steering Board</td>
                                    <td>Overall party direction and coordination</td>
                                </tr>
                                <tr>
                                    <td>Disciplinary Board</td>
                                    <td>Member discipline and conduct</td>
                                </tr>
                                <tr>
                                    <td>Elections Board</td>
                                    <td>Internal elections management</td>
                                </tr>
                                <tr>
                                    <td>Governors Caucus</td>
                                    <td>Engagement with county leadership</td>
                                </tr>
                                <tr>
                                    <td>MPs, MCAs, Women, Youth, PWDs, Diaspora, SIGs Caucuses</td>
                                    <td>Representation of special interest groups and elected leaders</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Our Journey Section */}
                <Row className="mb-5">
                    <Col>
                        <blockquote className='border-start border-5 border-warning p-3 rounded bg-light mb-5'>
                            <h2 className='text-main'>Our Journey Towards Social Justice</h2>
                            <p>
                                The Economic Patriotic Alliance (EPA) is at the forefront of advocating for social democracy in Kenya,
                                focusing on equitable governance and sustainable development. Our mission is to ensure that economic
                                growth positively impacts all citizens, addressing key issues such as inequality and unemployment.
                            </p>
                            <p>
                                Founded to tackle critical socio-economic issues in Kenya, the EPA emerged from the collective vision
                                of community leaders and activists. Our establishment was driven by the desire to create an inclusive
                                society where everyone can thrive.
                            </p>
                            <p>
                                The EPA has proudly served a diverse range of clients, including local communities, advocacy groups,
                                and policy makers. We work collaboratively to ensure that their voices are heard and that their needs
                                are prioritized in economic discussions.
                            </p>
                        </blockquote>
                    </Col>
                </Row>

                {/* Core Values Section */}
                <Row className="mb-5">
                    <Col>
                        <h2 className="text-center mb-4">Our Core Values</h2>
                        <p className="text-center mb-4">Guided by our commitment to social justice, these core values shape our approach to advocacy and community engagement.</p>

                        <Row>
                            <Col md={4} className="mb-4">
                                <Card className="h-100 shadow-sm border-main">
                                    <Card.Body className="text-center">
                                        <Badge bg="warning" className="mb-3 p-3 fs-4">Equity</Badge>
                                        <Card.Text>
                                            We believe in fair opportunities for all, striving to eliminate barriers that hinder social
                                            and economic progress for marginalized communities.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="h-100 shadow-sm border-main">
                                    <Card.Body className="text-center">
                                        <Badge bg="warning" className="mb-3 p-3 fs-4">Integrity</Badge>
                                        <Card.Text>
                                            Our actions are rooted in transparency and honesty, ensuring that our advocacy efforts are
                                            ethical and trustworthy in the eyes of the public.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4} className="mb-4">
                                <Card className="h-100 shadow-sm border-main">
                                    <Card.Body className="text-center">
                                        <Badge bg="warning" className="mb-3 p-3 fs-4">Sustainability</Badge>
                                        <Card.Text>
                                            We prioritize sustainable development, fostering solutions that not only address current needs
                                            but also preserve resources for future generations.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </AppLayout>
    );
}