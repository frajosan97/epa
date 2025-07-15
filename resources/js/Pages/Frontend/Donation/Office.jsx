import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroBanner from '@/Components/HeroBanner';
import { Container, Card } from 'react-bootstrap';

export default function Office() {
    return (
        <AppLayout>
            <Head title='Office Space Appeal' />

            {/* Hero Section */}
            <HeroBanner
                data={{
                    title: "EPA Office Space Appeal",
                    subtitle: "Help us establish a headquarters to serve Kenya better",
                }}
            />

            {/* Main Content */}
            <Container className="py-5">
                <Card className="border-0 shadow p-4">
                    <Card.Body>
                        <h1 className="section-title">Dear Fellow Kenyans,</h1>
                        
                        <p className="section-text">
                            The <strong>Economic Patriotic Alliance (EPA)</strong> is dedicated to championing democracy, good governance, and sustainable development for all. As we continue to grow and serve the people, we <strong>urgently need office space</strong> to establish a functional headquarters where we can coordinate our activities, engage with the public, and drive meaningful change.
                        </p>

                        <p className="section-text">We are appealing to well-wishers, property owners, and supporters who may have available office space or can assist in securing one for our operations. A suitable space will enable us to:</p>
                        
                        <div className="section-highlights">
                            <p>✅ Hold meetings and engage with community members</p>
                            <p>✅ Organize and plan initiatives that benefit the people</p>
                            <p>✅ Provide a central point for communication and coordination</p>
                            <p>✅ Strengthen our presence and accessibility to the public</p>
                        </div>

                        <p className="section-text">
                            If you have vacant office space, a commercial property, or any premises that could serve as our base, we would be deeply grateful for your support. Whether through donation or partnership, your contribution will play a vital role in empowering our movement and ensuring we effectively serve the nation.
                        </p>

                        <p className="section-text">
                            To assist or inquire further, kindly reach out to us at <a href="mailto:konange@gmail.com" className="section-link">konange@gmail.com</a>.
                        </p>

                        <p className="section-text">
                            Together, we can build a strong foundation for EPA to drive positive change.<br />
                            <strong>Join us in shaping a better Kenya!</strong>
                        </p>

                        <footer className="section-footer">
                            <p>Thank you for your generosity and unwavering support.</p>
                            <p><strong>Economic Patriotic Alliance (EPA)</strong></p>
                        </footer>
                    </Card.Body>
                </Card>
            </Container>
        </AppLayout>
    );
}