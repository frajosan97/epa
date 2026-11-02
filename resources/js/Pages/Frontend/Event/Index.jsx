import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Carousel, Badge, Spinner, Alert } from 'react-bootstrap';
import { FiCalendar, FiMapPin, FiClock, FiHeart } from 'react-icons/fi';
import AppLayout from '@/Layouts/AppLayout';
import '../../../../css/Events.css';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import HeroBanner from '@/Components/HeroBanner';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);
    const [activeFilter, setActiveFilter] = useState('upcoming');

    const categories = ['All', 'Political Rally', 'Community Engagement', 'Party Meeting', 'Campaign Event', 'Policy Debate', 'Fundraiser', 'Press Event', 'Business Engagement'];

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

    const filteredEvents = events
        .filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .filter(event => {
            const eventDate = new Date(event.date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            if (activeFilter === 'upcoming') {
                return eventDate >= currentDate;
            } else if (activeFilter === 'past') {
                return eventDate < currentDate;
            }
            return true;
        });

    const toggleFavorite = (eventId) => {
        if (favorites.includes(eventId)) {
            setFavorites(favorites.filter(id => id !== eventId));
        } else {
            setFavorites([...favorites, eventId]);
        }
    };

    if (loading) {
        return (
            <AppLayout>
                <Head title='Events' />
                <Container className="text-center py-5">
                    <Spinner animation="border" role="status" className="me-2" />
                    <span>Loading events...</span>
                </Container>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <Head title='Events' />
                <Container className="py-5 text-center">
                    <Alert variant="danger">
                        Error loading events: {error}
                    </Alert>
                    <Button
                        variant="primary"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </Button>
                </Container>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title='Events' />

            {/* Hero Section */}
            <HeroBanner data={{
                title: "EPA: Our Journey Together",
                subtitle: "Discover and engage with upcoming events from the Alliance for Democracy.",
            }} />

            {/* Main Content */}
            <Container className="py-5">
                {/* Filter Section */}
                <Row className="mb-5">
                    <Col md={8}>
                        <div className="filter-buttons">
                            <Button
                                variant={activeFilter === 'all' ? 'primary' : 'outline-secondary'}
                                onClick={() => setActiveFilter('all')}
                                className="me-2"
                            >
                                All Events
                            </Button>
                            <Button
                                variant={activeFilter === 'upcoming' ? 'primary' : 'outline-secondary'}
                                onClick={() => setActiveFilter('upcoming')}
                                className="me-2"
                            >
                                Upcoming
                            </Button>
                            <Button
                                variant={activeFilter === 'past' ? 'primary' : 'outline-secondary'}
                                onClick={() => setActiveFilter('past')}
                            >
                                Past Events
                            </Button>
                        </div>
                    </Col>
                    <Col md={4} className="text-md-end">
                        <Form.Group controlId="categoryFilter" className="d-inline-block">
                            <Form.Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="category-select"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Featured Events Carousel */}
                {filteredEvents.some(event => event.featured) && (
                    <div className="mb-5">
                        <h3 className="section-title mb-4">Featured EPA Events</h3>
                        <Carousel indicators={false} className="featured-carousel">
                            {filteredEvents.filter(event => event.featured).map(event => (
                                <Carousel.Item key={event.id}>
                                    <Card className="featured-event-card">
                                        <div className="card-image-wrapper">
                                            <Card.Img variant="top" src={`/storage/images/gallery/${event.image}`} />
                                            <Badge bg="danger" className="featured-badge">Featured</Badge>
                                            <Button
                                                variant="link"
                                                className={`favorite-btn ${favorites.includes(event.id) ? 'active' : ''}`}
                                                onClick={() => toggleFavorite(event.id)}
                                            >
                                                <FiHeart />
                                            </Button>
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{event.title}</Card.Title>
                                            <div className="event-meta mb-3">
                                                <span><FiCalendar /> {new Date(event.date).toLocaleDateString()}</span>
                                                <span><FiClock /> {event.time}</span>
                                                <span><FiMapPin /> {event.location}</span>
                                            </div>
                                            <Card.Text>{event.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                )}

                {/* All Events Grid */}
                <h3 className="section-title mb-4">All EPA Events</h3>
                {filteredEvents.length > 0 ? (
                    <Row>
                        {filteredEvents.map(event => (
                            <Col key={event.id} lg={4} md={6} className="mb-4">
                                <Card className="event-card h-100">
                                    <div className="card-image-wrapper">
                                        <Card.Img variant="top" src={`/storage/images/gallery/${event.image}`} />
                                        <Button
                                            variant="link"
                                            className={`favorite-btn ${favorites.includes(event.id) ? 'active' : ''}`}
                                            onClick={() => toggleFavorite(event.id)}
                                        >
                                            <FiHeart />
                                        </Button>
                                        {event.featured && (
                                            <Badge bg="danger" className="featured-badge">Featured</Badge>
                                        )}
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{event.title}</Card.Title>
                                        <div className="event-meta mb-3">
                                            <span><FiCalendar /> {new Date(event.date).toLocaleDateString()}</span>
                                            <span><FiClock /> {event.time}</span>
                                            <span><FiMapPin /> {event.location}</span>
                                        </div>
                                        <Card.Text className="text-muted">{event.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5">
                        <h4>No EPA events found</h4>
                        <p>Try adjusting your search or filters to see more events.</p>
                    </div>
                )}
            </Container>
        </AppLayout>
    );
}