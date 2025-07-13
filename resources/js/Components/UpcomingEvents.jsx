import React from 'react';
import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap';
import SlickCarousel from '../Components/Settings/SlickCarousel';
import axios from 'axios';

export default function UpcomingEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(route('api.events'));
                setEvents(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, []);

    const settings = {
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 800,
        customSettings: {
            infinite: true,
            arrows: true,
            dots: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        },
    };

    if (loading) {
        return (
            <Container className='py-5 text-center'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading events...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className='py-5 text-center'>
                <div className="alert alert-danger" role="alert">
                    Error loading events: {error}
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </button>
            </Container>
        );
    }

    return (
        <section className='slick-moving-content'>
            <Container className='py-5'>
                <div className="content-header">
                    <h3 className="content-header-title">
                        <span className="content-header-title-accent">Upcoming</span> Events
                    </h3>
                    <p className="content-header-title-subtitle">
                        Experience the essence of our movement through our upcoming events. Join us as we shape a better future together.
                    </p>
                    <div className="content-header-title-decoration"></div>
                </div>

                {events.length > 0 ? (
                    <SlickCarousel {...settings}>
                        {events.map((event) => (
                            <div key={event.id} className="content-card-container">
                                <Card className="content-card mx-2 border-0 shadow-sm">
                                    <div className="content-card-image-container">
                                        <Card.Img
                                            src={event.image}
                                            alt={event.title}
                                            className="card-image"
                                        />
                                        <div className="card-image-overlay"></div>
                                    </div>
                                    <Card.Body className="card-body p-3">
                                        <Card.Title className="card-title">{event.title}</Card.Title>
                                        <Card.Text className="card-subtitle">{event.subtitle}</Card.Text>

                                        <div className="card-details">
                                            <div className="detail-item">
                                                <i className="bi bi-calendar-event detail-icon"></i>
                                                <span>{event.date} • {event.time}</span>
                                            </div>
                                            <div className="detail-item">
                                                <i className="bi bi-geo-alt detail-icon"></i>
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <ButtonGroup className='gap-2'>
                                            <Button className='rounded' variant="primary">
                                                Learn More
                                                <i className="bi bi-arrow-right button-icon"></i>
                                            </Button>
                                            <Button className='rounded' variant="outline-primary">
                                                Register
                                                <i className="bi bi-person-plus button-icon"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </Card.Body>
                                    <div className="card-hover-effect"></div>
                                </Card>
                            </div>
                        ))}
                    </SlickCarousel>
                ) : (
                    <div className="text-center py-4">
                        <p>No upcoming events found.</p>
                    </div>
                )}
            </Container>
        </section>
    );
}