import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/HeroSlider.css';
import { Button, Col, Container } from 'react-bootstrap';
import SlickCarousel from './Settings/SlickCarousel';

export default function HeroSlider() {
    const slides = [
        {
            id: 1,
            title: "WEALTH IS POWER",
            description: "Join us in promoting social democracy and equitable governance for all citizens.",
            media: {
                type: "image",
                url: "/storage/images/slides/1.jpeg"
            },
            cta: "Register for Membership Today",
            cta_link: route('register'),
        },
        {
            id: 2,
            title: "WEALTH IS POWER",
            description: "Join us in promoting social democracy and equitable governance for all citizens.",
            media: {
                type: "image",
                url: "/storage/images/slides/2.jpeg"
            },
            cta: "Check for Membership Status",
            cta_link: route('register'),
        },
    ];

    const settings = {
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 6000,
        speed: 800,
        customSettings: {
            infinite: true,
            arrows: true,
            dots: true,
            pauseOnHover: true,
            appendDots: (dots) => (
                <div className="custom-dots">
                    <ul>{dots}</ul>
                </div>
            ),
            customPaging: (i) => (
                <div className="custom-dot">
                    <div className="dot-inner"></div>
                </div>
            ),
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        dots: false
                    }
                }
            ]
        },
    };

    return (
        <div className="slick-carousel-container">
            <SlickCarousel {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="slick-slide">
                        <div className="slide-background">
                            {slide.media.type === "image" ? (
                                <img
                                    src={slide.media.url}
                                    alt={slide.title}
                                    className="background-media"
                                />
                            ) : (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    poster={slide.media.poster}
                                    className="background-media"
                                >
                                    <source src={slide.media.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            <div className="slide-overlay"></div>
                            <Container className="h-100 d-flex align-items-center slide-content">
                                <Col md={7}>
                                    <h3 className="slide-title animate__animated animate__fadeInDown">
                                        {slide.title}
                                    </h3>
                                    <p className="slide-description animate__animated animate__fadeInUp">
                                        {slide.description}
                                    </p>
                                    <a href={slide.cta_link} className='btn btn-primary btn-lg rounded-pill animate__animated animate__fadeInUp'>
                                        {slide.cta} <i className="bi bi-arrow-right"></i>
                                    </a>
                                </Col>
                            </Container>
                        </div>
                    </div>
                ))}
            </SlickCarousel>
        </div>
    );
}