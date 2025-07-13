import React, { useState, useEffect } from 'react';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import SlickCarousel from '../Components/Settings/SlickCarousel';
import axios from 'axios';

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

export default function BlogSection() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get(route('api.news'));
                setBlogPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching blog posts:', err);
            }
        };

        fetchBlogPosts();
    }, []);

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status" className="me-2" />
                <span>Loading blog posts...</span>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="danger">
                    Error loading blog posts: {error}
                </Alert>
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
                        <span className="content-header-title-accent">Latest</span> Blog Posts
                    </h3>
                    <p className="content-header-title-subtitle">
                        Stay informed, inspired, and engaged with the latest updates, strategic planning activities, and behind-the-scenes insights.
                    </p>
                    <div className="content-header-title-decoration"></div>
                </div>

                {blogPosts.length > 0 ? (
                    <SlickCarousel {...settings}>
                        {blogPosts.map((blog) => (
                            <div key={blog.id} className="content-card-container">
                                <Card className="content-card mx-2 border-0 shadow-sm">
                                    <div className="content-card-image-container">
                                        <Card.Img
                                            src={`/storage/images/gallery/${blog.image}`}
                                            alt={blog.title}
                                            className="card-image"
                                        />
                                        <div className="card-image-overlay"></div>
                                    </div>
                                    <Card.Body className="card-body p-3">
                                        <Card.Title className="card-title fs-6 fw-semibold">{blog.title}</Card.Title>
                                        <Card.Text className="card-date text-muted fs-7">
                                            <i className="bi bi-calendar-week me-1"></i>
                                            <time>{blog.date}</time>
                                        </Card.Text>
                                        <div className="card-actions mt-3">
                                            <button className="btn btn-primary w-100">
                                                Read More <i className="bi bi-arrow-right button-icon"></i>
                                            </button>
                                        </div>
                                    </Card.Body>
                                    <div className="card-hover-effect"></div>
                                </Card>
                            </div>
                        ))}
                    </SlickCarousel>
                ) : (
                    <div className="text-center py-4">
                        <p>No blog posts found.</p>
                    </div>
                )}
            </Container>
        </section>
    );
}