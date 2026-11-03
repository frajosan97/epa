import AppLayout from "@/Layouts/AppLayout";
import HeroBanner from "@/Components/HeroBanner";
import { Head, Link } from "@inertiajs/react";
import { Badge, Card, Container } from "react-bootstrap";

/**
 * Format an ISO timestamp into "July 1, 2025".
 */
function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Human-friendly label for a publication type.
 * "public-notice" → "Public Notice"
 */
function formatType(type) {
    if (!type) return "Notice";
    return type
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

const TYPE_BADGE_VARIANTS = {
    "public-notice": "primary",
    "press-release": "success",
    circular: "warning",
    statement: "info",
};

export default function Publications({ publications = [] }) {
    return (
        <AppLayout>
            <Head title="Public Notices & Publications" />

            {/* Hero Section */}
            <HeroBanner
                data={{
                    title: "Public Notices & Publications",
                    subtitle:
                        "Official notices, press releases, circulars, and statements from the Economic Patriotic Alliance.",
                }}
            />

            {/* Main Content */}
            <Container className="py-5">
                <div className="content-header mb-4">
                    <h3 className="content-header-title">
                        <span className="content-header-title-accent">
                            Public
                        </span>{" "}
                        Notices &amp; Publications
                    </h3>
                    <p className="content-header-title-subtitle">
                        Official notices, press releases, circulars, and
                        statements from the Economic Patriotic Alliance.
                    </p>
                    <div className="content-header-title-decoration"></div>
                </div>

                {publications.length === 0 ? (
                    <div className="text-center py-4">
                        <p>No publications available at the moment.</p>
                    </div>
                ) : (
                    <div className="publications-list d-flex flex-column gap-3">
                        {publications.map((pub) => (
                            <Card
                                key={pub.id}
                                className="publication-card border-0 shadow-sm rounded-4 overflow-hidden"
                            >
                                <Card.Body className="p-4 p-lg-5">
                                    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                                        <Badge
                                            bg={
                                                TYPE_BADGE_VARIANTS[pub.type] ??
                                                "secondary"
                                            }
                                            className="text-uppercase"
                                        >
                                            {formatType(pub.type)}
                                        </Badge>

                                        {pub.reference_no && (
                                            <small className="text-muted">
                                                Ref: {pub.reference_no}
                                            </small>
                                        )}

                                        <small className="text-muted ms-auto">
                                            <i className="bi bi-calendar-week me-1"></i>
                                            {formatDate(pub.published_at)}
                                        </small>
                                    </div>

                                    <Card.Title className="h5 mb-2">
                                        {pub.subtitle ?? pub.title}
                                    </Card.Title>

                                    {pub.summary && (
                                        <Card.Text className="text-muted mb-3">
                                            {pub.summary}
                                        </Card.Text>
                                    )}

                                    <div className="d-flex flex-wrap align-items-center gap-3">
                                        <Link
                                            href={route(
                                                "resource.publication.show",
                                                pub.id,
                                            )}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Read Full Notice
                                            <i className="bi bi-arrow-right ms-1"></i>
                                        </Link>

                                        {pub.file_path && (
                                            <a
                                                href={`/storage/${pub.file_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                Download PDF
                                                <i className="bi bi-download ms-1"></i>
                                            </a>
                                        )}

                                        {pub.issued_by && (
                                            <small className="text-muted">
                                                Issued by {pub.issued_by}
                                            </small>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
            </Container>
        </AppLayout>
    );
}
