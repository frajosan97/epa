import React, { useState, useEffect } from 'react';
import { Container, Modal, Spinner, Alert, ButtonGroup, Button } from 'react-bootstrap';
import { ChevronRight, ChevronLeft, X, ZoomIn, Download } from 'react-feather';
import axios from 'axios';
import SlickCarousel from '../Components/Settings/SlickCarousel';
import '../../css/Gallery.css';

export default function Gallery() {
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'political-rallies', name: 'Rallies' },
        { id: 'community-meetings', name: 'Community' },
        { id: 'celebrations', name: 'Celebrations' },
        { id: 'campaign-trails', name: 'Campaign' }
    ];

    const carouselSettings = {
        slidesToShow: 4,
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
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        },
    };

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const response = await axios.get(route('api.gallerly'));
                setGalleryItems(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching gallery data:', err);
            }
        };

        fetchGalleryData();
    }, []);

    const filteredItems = activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    const openModal = (index) => {
        setActiveIndex(index);
        setShowModal(true);
    };

    const navigateImage = (direction) => {
        const newIndex = direction === 'next'
            ? (activeIndex + 1) % filteredItems.length
            : (activeIndex - 1 + filteredItems.length) % filteredItems.length;
        setActiveIndex(newIndex);
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status" />
                <p className="mt-3">Loading gallery...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="danger">
                    Error loading gallery: {error}
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
        <section className="gallery-section bg-light">
            <Container className="py-5">
                <div className="content-header">
                    <h3 className="content-header-title">
                        <span className="content-header-title-accent">Our</span> Gallery
                    </h3>
                    <p className="content-header-title-subtitle">
                        Witness the moments that define our movement and the people powering our vision
                    </p>
                    <div className="content-header-title-decoration"></div>
                </div>

                <div className="category-filter d-flex justify-content-center mb-4" style={{ overflowX: "auto" }}>
                    <ButtonGroup className='gap-2'>
                        {categories.map(category => (
                            <Button
                                key={category.id}
                                variant={`${activeCategory === category.id ? 'primary' : 'outline-primary'}`}
                                className={`rounded`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>

                {filteredItems.length > 0 ? (
                    <>
                        <SlickCarousel {...carouselSettings}>
                            {filteredItems.reduce((rows, item, index) => {
                                // Create a new row every 2 items
                                if (index % 2 === 0) {
                                    rows.push(filteredItems.slice(index, index + 2));
                                }
                                return rows;
                            }, []).map((pair, pairIndex) => (
                                <div key={`pair-${pairIndex}`} className="gallery-pair-container">
                                    {pair.map((item, index) => (
                                        <div key={`${item.id}-${index}`} className="gallery-item-container p-2">
                                            <div className="gallery-item" onClick={() => openModal(item.originalIndex || (pairIndex * 2 + index))}>
                                                <div className="image-container">
                                                    <img
                                                        src={`/storage/images/gallery/${item.image}`}
                                                        alt={item.title}
                                                        className="gallery-image"
                                                        loading="lazy"
                                                    />
                                                    <div className="image-overlay">
                                                        <div className="overlay-content">
                                                            <h4 className="image-title">{item.title}</h4>
                                                            <span className="view-button">
                                                                <ZoomIn size={20} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </SlickCarousel>

                        <div className="text-center mt-4">
                            <button className="btn btn-outline-primary">
                                View Full Archive
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <p>No gallery items found in this category.</p>
                    </div>
                )}
            </Container>

            {/* Lightbox Modal */}
            {filteredItems.length > 0 && (
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    centered
                    size="xl"
                    className="gallery-modal"
                >
                    <Modal.Body>
                        <button
                            className="modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            <X size={24} />
                        </button>

                        <div className="modal-content">
                            <div className="modal-image-container">
                                <img
                                    src={`/storage/images/gallery/${filteredItems[activeIndex]?.image}`}
                                    alt={filteredItems[activeIndex]?.title}
                                    className="modal-image"
                                />

                                <button
                                    className="modal-nav prev"
                                    onClick={() => navigateImage('prev')}
                                >
                                    <ChevronLeft size={32} />
                                </button>

                                <button
                                    className="modal-nav next"
                                    onClick={() => navigateImage('next')}
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>

                            <div className="modal-details">
                                <h3 className="modal-title">
                                    {filteredItems[activeIndex]?.title}
                                </h3>
                                <div className="modal-actions">
                                    <a
                                        href={filteredItems[activeIndex]?.image}
                                        download
                                        className="btn btn-primary"
                                    >
                                        <Download size={18} className="me-2" />
                                        Download Image
                                    </a>
                                    <span className="image-counter">
                                        {activeIndex + 1} / {filteredItems.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </section>
    );
}