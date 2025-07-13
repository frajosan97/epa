import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Carousel, Badge, Spinner, Alert } from 'react-bootstrap';
import { FiCalendar, FiMapPin, FiClock, FiSearch, FiHeart, FiShare2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import '../../../../css/Events.css';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
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
            currentDate.setHours(0, 0, 0, 0); // Normalize current date to start of day

            if (activeFilter === 'upcoming') {
                return eventDate >= currentDate;
            } else if (activeFilter === 'past') {
                return eventDate < currentDate;
            }
            return true;
        });

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const toggleFavorite = (eventId) => {
        if (favorites.includes(eventId)) {
            setFavorites(favorites.filter(id => id !== eventId));
        } else {
            setFavorites([...favorites, eventId]);
        }
    };

    const shareEvent = () => {
        if (navigator.share) {
            navigator.share({
                title: selectedEvent.title,
                text: selectedEvent.description,
                url: window.location.href,
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(console.error);
        } else {
            alert(`You can share this event: ${selectedEvent.title} - ${window.location.href}`);
        }
    };

    // Animation variants
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

    const heroVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
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
            <Container fluid className="events-page px-0">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-overlay"></div>
                    <Container className="hero-content">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.h1
                                className="display-4 fw-bold text-white mb-4"
                                variants={heroVariants}
                            >
                                EPA: Our Journey Together
                            </motion.h1>
                            <motion.p
                                className="lead text-white mb-5"
                                variants={heroVariants}
                            >
                                Discover and engage with upcoming events from the Alliance for Democracy.
                            </motion.p>
                        </motion.div>
                    </Container>
                </div>

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
                        <motion.div
                            className="mb-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="section-title mb-4">Featured EPA Events</h3>
                            <Carousel indicators={false} className="featured-carousel">
                                {filteredEvents.filter(event => event.featured).map(event => (
                                    <Carousel.Item key={event.id}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card className="featured-event-card">
                                                <div className="card-image-wrapper">
                                                    <Card.Img variant="top" src={event.image} />
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
                                        </motion.div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </motion.div>
                    )}

                    {/* All Events Grid */}
                    <h3 className="section-title mb-4">All EPA Events</h3>
                    {filteredEvents.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Row>
                                {filteredEvents.map(event => (
                                    <Col key={event.id} lg={4} md={6} className="mb-4">
                                        <motion.div
                                            variants={itemVariants}
                                            whileHover={{ y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card className="event-card h-100">
                                                <div className="card-image-wrapper">
                                                    <Card.Img variant="top" src={event.image} />
                                                    <Button
                                                        variant="link"
                                                        className={`favorite-btn ${favorites.includes(event.id) ? 'active' : ''}`}
                                                        onClick={() => toggleFavorite(event.id)}
                                                    >
                                                        <motion.div
                                                            animate={{ scale: favorites.includes(event.id) ? [1, 1.2, 1] : 1 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <FiHeart />
                                                        </motion.div>
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
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h4>No EPA events found</h4>
                            <p>Try adjusting your search or filters to see more events.</p>
                        </motion.div>
                    )}
                </Container>
            </Container>
        </AppLayout>
    );
}