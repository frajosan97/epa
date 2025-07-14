import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Button, Badge, ProgressBar, Form, InputGroup, Tab, Tabs, Accordion } from 'react-bootstrap';
import {
    BsDownload,
    BsSearch,
    BsFunnel,
    BsClock,
    BsCalendar,
    BsFileEarmark,
    BsHdd,
    BsCloud,
    BsCheckCircle,
    BsExclamationCircle,
    BsStar,
    BsBoxArrowUpRight,
    BsWindows,
    BsApple,
    BsAndroid2,
    BsUbuntu,
    BsFilter,
    BsSortDown
} from 'react-icons/bs';

export default function Downloads({ downloadItems }) {
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const categories = [...new Set(downloadItems.map(item => item.category))];
    const fileTypes = [...new Set(downloadItems.map(item => item.fileType))];
    const allTags = [...new Set(downloadItems.flatMap(item => item.tags))];

    return (
        <AppLayout>
            <Head title='Downloads' />

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay bg-dark bg-opacity-50"></div>
                <Container className="hero-content py-5">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h1
                            className="display-4 fw-bold text-white mb-4"
                            variants={heroVariants}
                        >
                            <BsDownload className="me-2" /> EPA Resources
                        </motion.h1>
                        <motion.p
                            className="lead text-white mb-5"
                            variants={heroVariants}
                        >
                            Access all EPA documents, tools, and resources in one place
                        </motion.p>
                    </motion.div>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="py-5">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Search and Filter Section */}
                    <motion.div variants={itemVariants}>
                        <Card className="mb-4 shadow-sm border-0">
                            <Card.Body>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-light">
                                                <BsSearch />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="search"
                                                placeholder="Search resources..."
                                                className="border-start-0"
                                            />
                                            <Button variant="primary">
                                                <BsFunnel className="me-1" /> Filter
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                    <Col md={3}>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-light">
                                                <BsFilter />
                                            </InputGroup.Text>
                                            <Form.Select>
                                                <option>All Categories</option>
                                                {categories.map((category, index) => (
                                                    <option key={index}>{category}</option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                    <Col md={3}>
                                        <InputGroup>
                                            <InputGroup.Text className="bg-light">
                                                <BsSortDown />
                                            </InputGroup.Text>
                                            <Form.Select>
                                                <option>Sort by: Most Recent</option>
                                                <option>Sort by: Most Downloads</option>
                                                <option>Sort by: Name (A-Z)</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </motion.div>

                    {/* Mobile Filters (Accordion) */}
                    <motion.div variants={itemVariants} className="d-lg-none mb-4">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <BsFilter className="me-2" /> Filter Options
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="mb-3">
                                        <h6 className="mb-2">Categories</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {categories.map((category, index) => (
                                                <Badge key={index} pill bg="light" text="dark" className="px-3 py-2">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h6 className="mb-2">File Types</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {fileTypes.map((type, index) => (
                                                <Badge key={index} pill bg="light" text="dark" className="px-3 py-2">
                                                    {type}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h6 className="mb-2">Tags</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {allTags.map((tag, index) => (
                                                <Badge key={index} pill bg="light" text="dark" className="px-3 py-2">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </motion.div>

                    <Row>
                        {/* Sidebar Filters - Desktop */}
                        <Col lg={3} className="d-none d-lg-block">
                            <motion.div variants={itemVariants}>
                                <Card className="shadow-sm mb-4 border-0">
                                    <Card.Header className="bg-light">
                                        <h5 className="mb-0"><BsFilter className="me-2" /> Categories</h5>
                                    </Card.Header>
                                    <Card.Body className="p-0">
                                        <div className="list-group list-group-flush">
                                            <a href="#" className="list-group-item list-group-item-action active">
                                                All Resources
                                            </a>
                                            {categories.map((category, index) => (
                                                <a key={index} href="#" className="list-group-item list-group-item-action">
                                                    {category}
                                                </a>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>

                                <Card className="shadow-sm border-0">
                                    <Card.Header className="bg-light">
                                        <h5 className="mb-0"><BsFunnel className="me-2" /> Filter by</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <h6 className="mt-3">File Types</h6>
                                        <div className="d-flex flex-column gap-2 mt-2">
                                            {fileTypes.map((type, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="checkbox"
                                                    id={`type-${index}`}
                                                    label={type.toUpperCase()}
                                                />
                                            ))}
                                        </div>

                                        <h6 className="mt-4">Popular Tags</h6>
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {allTags.map((tag, index) => (
                                                <Badge key={index} pill bg="light" text="dark" className="px-3 py-2">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>

                        {/* Main Content Area */}
                        <Col lg={9}>
                            <motion.div variants={itemVariants}>
                                <Tabs defaultActiveKey="all" className="mb-4">
                                    <Tab eventKey="all" title="All Resources">
                                        <div className="downloads-list">
                                            {downloadItems.map((item) => (
                                                <motion.div key={item.id} variants={itemVariants}>
                                                    <DownloadCard item={item} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </Tab>
                                    <Tab eventKey="popular" title="Most Popular">
                                        <div className="downloads-list">
                                            {downloadItems
                                                .sort((a, b) => b.downloads - a.downloads)
                                                .map((item) => (
                                                    <motion.div key={item.id} variants={itemVariants}>
                                                        <DownloadCard item={item} />
                                                    </motion.div>
                                                ))}
                                        </div>
                                    </Tab>
                                    <Tab eventKey="featured" title="Featured">
                                        <div className="downloads-list">
                                            {downloadItems
                                                .filter(item => item.featured)
                                                .map((item) => (
                                                    <motion.div key={item.id} variants={itemVariants}>
                                                        <DownloadCard item={item} />
                                                    </motion.div>
                                                ))}
                                        </div>
                                    </Tab>
                                </Tabs>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </Container>
        </AppLayout>
    );
}

// Download Card Component
function DownloadCard({ item }) {
    const getFileIcon = () => {
        switch (item.fileType) {
            case 'pdf':
                return <BsFileEarmark className="text-danger" size={24} />;
            case 'docx':
                return <BsFileEarmark className="text-primary" size={24} />;
            case 'exe':
                return <BsWindows className="text-primary" size={24} />;
            default:
                return <BsFileEarmark size={24} />;
        }
    };

    const getFileTypeBadge = () => {
        return (
            <Badge bg="light" text="dark" className="me-2">
                {item.fileType.toUpperCase()}
            </Badge>
        );
    };

    return (
        <Card className="mb-3 shadow-sm border-0 download-item">
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <div className="bg-light p-3 rounded">
                            {getFileIcon()}
                        </div>
                    </Col>
                    <Col>
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 className="mb-1">
                                    {item.title}
                                    {item.featured && (
                                        <Badge bg="warning" className="ms-2">
                                            <BsStar size={14} className="me-1" /> Featured
                                        </Badge>
                                    )}
                                </h5>
                                <p className="text-muted mb-2">{item.description}</p>
                                <div className="d-flex flex-wrap gap-2 mb-2">
                                    {getFileTypeBadge()}
                                    <Badge bg="light" text="dark" className="d-flex align-items-center">
                                        <BsCalendar className="me-1" size={12} /> {item.date}
                                    </Badge>
                                    <Badge bg="light" text="dark">
                                        v{item.version}
                                    </Badge>
                                    <Badge bg="light" text="dark">
                                        {item.fileSize}
                                    </Badge>
                                    <Badge bg="light" text="dark" className="d-flex align-items-center">
                                        <BsDownload className="me-1" size={12} /> {item.downloads}
                                    </Badge>
                                    <div className="d-flex flex-wrap gap-1">
                                        {item.tags.map((tag, index) => (
                                            <Badge key={index} pill bg="light" text="dark">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                                <a href={`/storage/documents/downloads/${item.url}`} className='btn btn-sm btn-primary text-nowrap mb-2' download>
                                    <BsDownload className="me-1" /> Download
                                </a>
                                <Button variant="outline-secondary" size="sm" className='text-nowrap'>
                                    <BsBoxArrowUpRight className="me-1" /> Details
                                </Button>
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="d-flex justify-content-between small text-muted mb-1">
                                <span>Download popularity</span>
                                <span>{(item.downloads / 2500 * 100).toFixed(0)}%</span>
                            </div>
                            <ProgressBar now={item.downloads / 2500 * 100} style={{ height: '4px' }} />
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}