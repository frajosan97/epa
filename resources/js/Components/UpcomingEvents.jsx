import React, { useState, useEffect, useMemo } from "react";
import { Button, ButtonGroup, Card, Container } from "react-bootstrap";
import SlickCarousel from "../Components/Settings/SlickCarousel";
import axios from "axios";

// Base path for gallery images. Adjust if your storage link differs.
const GALLERY_IMAGE_BASE = "/storage/images/gallery";

// Static carousel configuration — defined once, not on every render.
const CAROUSEL_SETTINGS = {
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
 * Format an ISO date string ("2025-07-10") into a friendly label
 * ("July 10, 2025"). Returns an empty string for invalid/null input.
 */
function formatEventDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value; // already a friendly string
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function UpcomingEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchEvents = async () => {
            try {
                const response = await axios.get(route("api.events"), {
                    signal: controller.signal,
                });

                // Backend may return an array directly, or { data: [...] }.
                const payload = Array.isArray(response.data)
                    ? response.data
                    : (response.data?.data ?? []);

                setEvents(payload);
            } catch (err) {
                // Ignore abort errors — they're expected on unmount.
                if (axios.isCancel(err) || err.name === "CanceledError") return;

                setError(err.message || "Unable to load events.");
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();

        return () => controller.abort();
    }, []);

    // Normalize events once so the JSX stays clean.
    const normalizedEvents = useMemo(
        () =>
            events.map((event) => ({
                ...event,
                displayDate: formatEventDate(event.event_date ?? event.date),
                displayTime: event.event_time ?? event.time ?? "",
            })),
        [events],
    );

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading events...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5 text-center">
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
        <section className="slick-moving-content">
            <Container className="py-5">
                <div className="content-header">
                    <h3 className="content-header-title">
                        <span className="content-header-title-accent">
                            Upcoming
                        </span>{" "}
                        Events
                    </h3>
                    <p className="content-header-title-subtitle">
                        Experience the essence of our movement through our
                        upcoming events. Join us as we shape a better future
                        together.
                    </p>
                    <div className="content-header-title-decoration"></div>
                </div>

                {normalizedEvents.length > 0 ? (
                    <SlickCarousel {...CAROUSEL_SETTINGS}>
                        {normalizedEvents.map((event) => (
                            <div
                                key={event.id}
                                className="content-card-container"
                            >
                                <Card className="content-card mx-2 border-0 shadow-sm">
                                    <div className="content-card-image-container">
                                        <Card.Img
                                            src={`${GALLERY_IMAGE_BASE}/${event.image}`}
                                            alt={event.title}
                                            className="card-image"
                                        />
                                        <div className="card-image-overlay"></div>
                                    </div>

                                    <Card.Body className="card-body p-3">
                                        <Card.Title className="card-title">
                                            {event.title}
                                        </Card.Title>

                                        {event.subtitle && (
                                            <Card.Text className="card-subtitle">
                                                {event.subtitle}
                                            </Card.Text>
                                        )}

                                        <div className="card-details">
                                            {(event.displayDate ||
                                                event.displayTime) && (
                                                <div className="detail-item">
                                                    <i className="bi bi-calendar-event detail-icon"></i>
                                                    <span>
                                                        {event.displayDate}
                                                        {event.displayDate &&
                                                        event.displayTime
                                                            ? " • "
                                                            : ""}
                                                        {event.displayTime}
                                                    </span>
                                                </div>
                                            )}

                                            {event.location && (
                                                <div className="detail-item">
                                                    <i className="bi bi-geo-alt detail-icon"></i>
                                                    <span>
                                                        {event.location}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <ButtonGroup className="gap-2">
                                            <Button
                                                className="rounded"
                                                variant="primary"
                                            >
                                                Learn More
                                                <i className="bi bi-arrow-right button-icon"></i>
                                            </Button>
                                            <Button
                                                className="rounded"
                                                variant="outline-primary"
                                            >
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
