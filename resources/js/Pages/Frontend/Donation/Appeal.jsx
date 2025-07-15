import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroBanner from '@/Components/HeroBanner';
import { Container, Card, ListGroup } from 'react-bootstrap';

export default function Appeal() {
    return (
        <AppLayout>
            <Head title='Appeal' />

            {/* Hero Section */}
            <HeroBanner
                data={{
                    title: "Support EPA - Donation Appeal",
                    subtitle: "Join us in strengthening Kenya's economic empowerment journey",
                }}
            />

            {/* Main Content */}
            <Container className="py-5">
                <Card className="border-0 shadow p-4">
                    <Card.Body>
                        <h1 className="section-title">Dear Supporters, Friends, and Patriots,</h1>

                        <Card.Text>
                            Kenya stands at a pivotal moment in its journey towards economic empowerment and social prosperity.
                            At the heart of this transformation is the <strong>Economic Patriotic Alliance (EPA)</strong>,
                            a dynamic political movement committed to championing the economic and social welfare of every Kenyan citizen.
                        </Card.Text>

                        <Card.Text>
                            As we continue to advocate for progressive policies and grassroots initiatives,
                            we find ourselves in need of your support to enhance our operations and reach.
                        </Card.Text>

                        <h2 className="section-subtitle">Our Need</h2>
                        <Card.Text>
                            To effectively serve our communities and strengthen our organisational capacity,
                            we are appealing for donations of essential office furniture and equipment.
                            Specifically, we are seeking:
                        </Card.Text>

                        <ListGroup as="ul" variant="flush" className="section-list">
                            <ListGroup.Item as="li">Office desks and chairs to furnish our workspaces.</ListGroup.Item>
                            <ListGroup.Item as="li">Filing cabinets and storage units for organisation and documentation.</ListGroup.Item>
                            <ListGroup.Item as="li">Computers, printers, and other technological equipment to streamline our operations.</ListGroup.Item>
                            <ListGroup.Item as="li">Meeting tables and chairs for collaborative discussions.</ListGroup.Item>
                            <ListGroup.Item as="li">Stationery supplies and accessories to support day-to-day activities.</ListGroup.Item>
                        </ListGroup>

                        <h2 className="section-subtitle">Your Impact</h2>
                        <Card.Text>
                            Your contribution—whether large or small—will play an instrumental role in strengthening
                            the EPA's ability to serve the Kenyan people. By donating office furniture and equipment,
                            you are directly empowering our team to strategize, plan, and implement policies that aim
                            to uplift communities and drive economic growth across the nation.
                        </Card.Text>

                        <h2 className="section-subtitle">How to Donate</h2>
                        <Card.Text>
                            We welcome individuals, organisations, and businesses to contribute to this cause.
                            Donations can be dropped off at our regional offices or arranged for pick-up by
                            contacting us at <strong>[insert contact information]</strong>.
                        </Card.Text>

                        <Card.Text>
                            If you prefer to make a monetary contribution to support the purchase of these items,
                            please reach out to us for details on how to do so securely.
                        </Card.Text>

                        <h2 className="section-subtitle">A Call to Unity</h2>
                        <Card.Text>
                            The challenges we face as a nation require unity, determination, and shared responsibility.
                            By donating office furniture and equipment, you join hands with the EPA to ensure that Kenya's
                            future remains bright and promising. Together, we can build the tools that will drive meaningful
                            change and inspire generations to come.
                        </Card.Text>

                        <Card.Text>
                            We deeply appreciate your support and belief in our mission. For inquiries or further information,
                            do not hesitate to contact us. Let us work together to empower Kenya—one desk, one chair,
                            and one computer at a time.
                        </Card.Text>

                        <Card.Text>
                            <strong>Your generosity will echo in the lives of millions.</strong>
                        </Card.Text>

                        <footer className="section-footer">
                            <p>Thank you for your support!</p>
                            <p>
                                <strong>Economic Patriotic Alliance (EPA) Party of Kenya</strong><br />
                                <a href="https://www.epa.or.ke" target="_blank" className="section-link">
                                    www.epa.or.ke
                                </a>
                            </p>
                        </footer>
                    </Card.Body>
                </Card>
            </Container>
        </AppLayout>
    );
}