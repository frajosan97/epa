import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Container, Spinner, Alert } from "react-bootstrap";
import SlickCarousel from "../Components/Settings/SlickCarousel";
import axios from "axios";

// Base path for gallery images. Adjust if your storage link differs.
const GALLERY_IMAGE_BASE = "/storage/images/gallery";

// Static carousel configuration — defined once, not on every render.
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
                settings: { slidesToShow: 1 },
            },
        ],
    },
};

/**
 * Format an ISO timestamp ("2025-07-01T10:00:00Z") into a friendly
 * label ("July 1, 2025"). Falls back to the raw value if invalid.
 */
function formatPublishedDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogSection() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get(route("api.news"), {
                    signal: controller.signal,
                });

                const payload = Array.isArray(response.data)
                    ? response.data
                    : (response.data?.data ?? []);

                setBlogPosts(payload);
            } catch (err) {
                if (axios.isCancel(err) || err.name === "CanceledError") return;

                setError(err.message || "Unable to load blog posts.");
                console.error("Error fetching blog posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();

        return () => controller.abort();
    }, []);

    // Normalize once so JSX stays clean.
    const normalizedPosts = useMemo(
        () =>
            blogPosts.map((blog) => ({
                ...blog,
                displayDate: formatPublishedDate(
                    blog.published_at ?? blog.news_date ?? blog.date,
                ),
            })),
        [blogPosts],
    );

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
                <Button
                    variant="primary"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Container>
        );
    }

    return (
        <section className="slick-moving-content">
            <Container className="py-5">
                <div className="content-header">
                    <h3 className="content-header-title">
                        <span className="content-header-title-accent">
                            Latest
                        </span>{" "}
                        Blog Posts
                    </h3>
                    <p className="content-header-title-subtitle">
                        Stay informed, inspired, and engaged with the latest
                        updates, strategic planning activities, and
                        behind-the-scenes insights.
                    </p>
                    <div className="content-header-title-decoration"></div>
                </div>

                {normalizedPosts.length > 0 ? (
                    <SlickCarousel {...settings}>
                        {normalizedPosts.map((blog) => (
                            <div
                                key={blog.id}
                                className="content-card-container"
                            >
                                <Card className="content-card mx-2 border-0 shadow-sm">
                                    <div className="content-card-image-container">
                                        <Card.Img
                                            src={`${GALLERY_IMAGE_BASE}/${blog.image}`}
                                            alt={blog.title}
                                            className="card-image"
                                        />
                                        <div className="card-image-overlay"></div>
                                    </div>

                                    <Card.Body className="card-body p-3">
                                        <Card.Title className="card-title fs-6 fw-semibold">
                                            {blog.title}
                                        </Card.Title>

                                        {blog.displayDate && (
                                            <Card.Text className="card-date text-muted fs-7">
                                                <i className="bi bi-calendar-week me-1"></i>
                                                <time
                                                    dateTime={blog.published_at}
                                                >
                                                    {blog.displayDate}
                                                </time>
                                            </Card.Text>
                                        )}

                                        <div className="card-actions mt-3">
                                            <Button
                                                variant="primary"
                                                className="w-100"
                                            >
                                                Read More
                                                <i className="bi bi-arrow-right button-icon"></i>
                                            </Button>
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
