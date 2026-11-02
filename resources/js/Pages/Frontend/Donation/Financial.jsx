import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroBanner from '@/Components/HeroBanner';
import { Container, Card } from 'react-bootstrap';

export default function Financial() {
    return (
        <AppLayout>
            <Head title='Financial Support' />

            {/* Hero Section */}
            <HeroBanner
                data={{
                    title: "Support EPA - Donate Now",
                    subtitle: "Your contribution helps build a better Kenya",
                }}
            />

            {/* Main Content */}
            <Container className="py-5">
                <Card className="border-0 shadow p-4">
                    <Card.Body>
                        <h1 className="section-title">Dear Fellow Kenyans,</h1>

                        <p className="section-text">
                            The <strong>Economic Patriotic Alliance (EPA)</strong> is committed to building a better Kenya—one founded on integrity, inclusivity, and sustainable development. As we continue to grow and serve the people, we <strong>urgently need financial support</strong> to sustain our operations and expand our reach.
                        </p>

                        <p className="section-text">Your generous contribution will help us:</p>

                        <div className="section-highlights">
                            <p>✅ Facilitate community outreach and civic education programs</p>
                            <p>✅ Support policy research and advocacy initiatives</p>
                            <p>✅ Strengthen our communication and engagement efforts</p>
                        </div>

                        <p className="section-text">
                            Every donation, big or small, is a step toward empowering our movement and ensuring we effectively serve the people. Your support is not just an investment in EPA—it is an investment in <strong>democracy, good governance, and a brighter future for Kenya</strong>.
                        </p>

                        <p className="section-cta">
                            To contribute, kindly send your donation via <strong>M-Pesa Paybill [insert number]</strong>, bank transfer, or reach out to us for other ways to assist.
                        </p>

                        <p className="section-text">
                            Together, we can build a strong foundation for EPA to drive meaningful change.<br />
                            <strong>Join us in shaping a better Kenya!</strong>
                        </p>

                        <footer className="section-footer">
                            <p>For inquiries, contact us at <a href="mailto:konange@gmail.com" className="section-link">konange@gmail.com</a></p>
                            <p>Thank you for your generosity and unwavering support.</p>
                        </footer>
                    </Card.Body>
                </Card>
            </Container>
        </AppLayout>
    );
}