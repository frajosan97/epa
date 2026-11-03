import AppLayout from "@/Layouts/AppLayout";
import HeroBanner from "@/Components/HeroBanner";
import { Head, Link } from "@inertiajs/react";
import { Badge, Button, Card, Container } from "react-bootstrap";

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

export default function PublicationShow({ publication }) {
    if (!publication) {
        return (
            <AppLayout>
                <Head title="Publication Not Found" />
                <Container className="py-5 text-center">
                    <p>Publication not found.</p>
                    <Link
                        href={route("resource.publications")}
                        className="btn btn-primary"
                    >
                        Back to Publications
                    </Link>
                </Container>
            </AppLayout>
        );
    }

    const pdfUrl = route("resource.publication.pdf", publication.id);

    return (
        <AppLayout>
            <Head title={publication.subtitle ?? publication.title} />

            <HeroBanner
                data={{
                    title: publication.subtitle ?? publication.title,
                    subtitle: publication.summary ?? publication.title,
                }}
            />

            <Container className="py-5">
                {/* Toolbar */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 no-print">
                    <Link
                        href={route("resource.publications")}
                        className="btn btn-link px-0 text-decoration-none"
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Publications
                    </Link>

                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-primary"
                            onClick={() => window.print()}
                        >
                            <i className="bi bi-printer me-1"></i>
                            Print
                        </Button>

                        <a
                            href={pdfUrl}
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-file-earmark-pdf me-1"></i>
                            Download PDF
                        </a>
                    </div>
                </div>

                <Card
                    id="publication-printable"
                    className="border-0 shadow-sm rounded-4 overflow-hidden"
                >
                    <Card.Body className="p-4 p-lg-5">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                            <Badge
                                bg={
                                    TYPE_BADGE_VARIANTS[publication.type] ??
                                    "secondary"
                                }
                                className="text-uppercase"
                            >
                                {formatType(publication.type)}
                            </Badge>

                            {publication.reference_no && (
                                <small className="text-muted">
                                    Ref: {publication.reference_no}
                                </small>
                            )}

                            <small className="text-muted ms-auto">
                                <i className="bi bi-calendar-week me-1"></i>
                                {formatDate(publication.published_at)}
                            </small>
                        </div>

                        <h1 className="h3 mb-1">{publication.title}</h1>

                        {publication.subtitle && (
                            <h2 className="h5 text-muted mb-4">
                                {publication.subtitle}
                            </h2>
                        )}

                        {publication.image && (
                            <div className="publication-image mb-4">
                                <img
                                    src={`/storage/images/gallery/${publication.image}`}
                                    alt={
                                        publication.subtitle ??
                                        publication.title
                                    }
                                    className="img-fluid rounded"
                                />
                            </div>
                        )}

                        <div
                            className="publication-body"
                            dangerouslySetInnerHTML={{
                                __html: publication.body,
                            }}
                        />

                        {(publication.signatory_name ||
                            publication.issued_by) && (
                            <div className="publication-signature mt-5 pt-4 border-top">
                                {publication.issued_by && (
                                    <p className="mb-1 fw-semibold">
                                        Issued by: {publication.issued_by}
                                    </p>
                                )}

                                {publication.signatory_name && (
                                    <p className="mb-1">
                                        <strong>
                                            {publication.signatory_name}
                                        </strong>
                                        {publication.signatory_title && (
                                            <span className="text-muted">
                                                {" "}
                                                — {publication.signatory_title}
                                            </span>
                                        )}
                                    </p>
                                )}

                                {publication.tagline && (
                                    <p className="fst-italic text-muted mb-0 mt-2">
                                        "{publication.tagline}"
                                    </p>
                                )}
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </AppLayout>
    );
}
