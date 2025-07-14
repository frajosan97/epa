import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram
} from 'react-icons/fa';
import '../../../css/Contact.css';
import HeroBanner from '@/Components/HeroBanner';

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
            <div className="contact-container">
                {/* Contact Form */}
                <div className="form-card animate">
                    <h2>Send Us a Message</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="hello@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                className="form-control"
                                placeholder="Your message here..."
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="contact-info-card animate delay-100">
                    <h2>Contact Information</h2>
                    <div className="contact-method">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div className="contact-details">
                            <h3>Our Location</h3>
                            <p>EPA PARTY<br />EPA HOUSE<br />P.O.BOX 2636-50200,Lusaka Road Bungoma, Kenya</p>
                        </div>
                    </div>

                    <div className="contact-method">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="contact-details">
                            <h3>Email Us</h3>
                            <p>info@epa.or.ke<br />support@epa.or.ke</p>
                        </div>
                    </div>

                    <div className="contact-method">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div className="contact-details">
                            <h3>Call Us</h3>
                            <p>+254733868843<br />Mon-Fri, 9am-5pm EAT</p>
                        </div>
                    </div>

                    <div className="social-links">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            {[
                                { name: 'Facebook', icon: <FaFacebook />, link: 'https://www.facebook.com/people/Economic-Patriotic-Alliance/61556977056535/' },
                                { name: 'Twitter', icon: <FaTwitter />, link: 'https://x.com/epapartyke' },
                                { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/economic-patriotic-alliance-8205772b7/' },
                                { name: 'Instagram', icon: <FaInstagram />, link: 'https://www.instagram.com/epapartyke/' }
                            ].map((social) => (
                                <a key={social.name} href={social.link} className="social-icon" aria-label={social.name}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </AppLayout >
    );
}