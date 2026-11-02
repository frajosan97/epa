import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroBanner from '@/Components/HeroBanner';
import { Container, Card } from 'react-bootstrap';

export default function Specialized() {
    return (
        <AppLayout>
            <Head title='Join EPA - Drive Change for Kenya' />

            {/* Hero Section */}
            <HeroBanner
                data={{
                    title: "Join EPA – Drive Change for Kenya",
                    subtitle: "Contribute your skills to build a better nation",
                }}
            />

            {/* Main Content */}
            <Container className="py-5">
                <Card className="border-0 shadow p-4">
                    <Card.Body>
                        <h1 className="section-title">Driving Change for Kenya's Prosperity Together</h1>

                        <p className="section-text">
                            The <strong>Economic Patriotic Alliance Party of Kenya (EPA)</strong> is on a mission to champion economic empowerment, national unity, and sustainable development for every Kenyan.
                        </p>
                        <p className="section-text">
                            To achieve these ambitious goals, we need <span className="section-highlight">your expertise, your vision, and your commitment</span> to building a brighter future for our nation.
                        </p>

                        <h2 className="section-subtitle">Why Your Skills Matter</h2>
                        <p className="section-text">
                            In today's rapidly evolving world, specialized skills are the cornerstone of progress. Whether you excel in technology, agriculture, education, healthcare, engineering, or business, your contributions can shape Kenya's trajectory for generations to come.
                        </p>
                        <p className="section-text">
                            The EPA Party believes that <span className="section-highlight">collective action driven by skilled professionals</span> is vital to creating policies and initiatives that resonate with the real needs of our citizens.
                        </p>

                        <h2 className="section-subtitle">Areas of Expertise Needed</h2>
                        <ul className="section-list">
                            <li>Policy Development – Trade, energy, education, and more</li>
                            <li>Economic Strategy – Boosting entrepreneurship and small businesses</li>
                            <li>Technology and Innovation – Leveraging tech for national solutions</li>
                            <li>Healthcare Improvement – Making healthcare accessible and affordable</li>
                            <li>Agricultural Modernization – Advancing food security and rural development</li>
                            <li>Community Engagement – Leading civic awareness and participation campaigns</li>
                        </ul>

                        <h2 className="section-subtitle">Why Join EPA?</h2>
                        <p className="section-text">By offering your specialized skills, you will:</p>
                        <ul className="section-list">
                            <li>Shape Kenya's political and economic future</li>
                            <li>Collaborate with passionate, like-minded changemakers</li>
                            <li>Grow professionally while giving back to your nation</li>
                            <li>Directly impact lives through innovation and service</li>
                        </ul>

                        <h2 className="section-subtitle">How to Get Involved</h2>
                        <p className="section-text">
                            We invite you to contribute your skills and ideas. Whether you want to volunteer, consult, or partner on specific initiatives, your involvement is invaluable.
                        </p>
                        <p className="section-text">
                            Please reach out to us at <a href="mailto:konange@gmail.com" className="section-link">konange@gmail.com</a> for details or to express your interest.
                        </p>

                        <h2 className="section-subtitle">Let's Build Kenya Together!</h2>
                        <p className="section-text">
                            The vision of the EPA is one of inclusion, innovation, and prosperity for all. Let us unite our talents, our energy, and our expertise to forge a path toward a better Kenya.
                        </p>
                        <p className="section-text"><strong>Join us today—your skills, your voice, and your dedication can make all the difference.</strong></p>

                        <footer className="section-footer">
                            <p>Contact us at <a href="mailto:konange@gmail.com" className="section-link">konange@gmail.com</a></p>
                            <p>Thank you for your patriotism and support.</p>
                        </footer>
                    </Card.Body>
                </Card>
            </Container>
        </AppLayout>
    );
}