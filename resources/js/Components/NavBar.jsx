import { Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    Offcanvas,
    Form,
    InputGroup,
    Button,
} from 'react-bootstrap';
import ApplicationLogo from './ApplicationLogo';
import '../../css/NavBar.css';

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    const navItems = [
        { href: route('/'), icon: 'bi-house-door', text: 'Home' },
        { href: route('about'), icon: 'bi-info-circle', text: 'About' },
        { href: route('event'), icon: 'bi-calendar-event', text: 'Events' },
        {
            text: 'Resources',
            icon: 'bi-file-earmark-text',
            dropdownItems: [
                { href: route('resource.downloads'), icon: 'bi-download', text: 'Downloads' },
                { href: route('resource.privacy'), icon: 'bi-shield-lock', text: 'Privacy Policy' },
                { href: route('resource.faq'), icon: 'bi-question-circle', text: 'FAQs' },
            ]
        },
        {
            text: 'Donations',
            icon: 'bi-heart-fill',
            dropdownItems: [
                { href: route('donation.appeal'), icon: 'bi-megaphone', text: 'General Appeal' },
                { href: route('donation.financial'), icon: 'bi-cash-stack', text: 'Financial Support' },
                { href: route('donation.office'), icon: 'bi-building', text: 'Office Space' },
                { href: route('donation.specialized'), icon: 'bi-tools', text: 'Specialized Skills' },
            ]
        },
        { href: route('careers'), icon: 'bi-briefcase', text: 'Careers' },
        { href: route('contact'), icon: 'bi-telephone-fill', text: 'Contact', },
        { href: route('register'), icon: 'bi-person-plus', text: 'Become Member', isButton: true }
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Handle search submission here
        console.log('Searching for:', searchQuery);
        // You can redirect to search page or perform search here
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };

        if (searchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.classList.add('search-active');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.classList.remove('search-active');
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.classList.remove('search-active');
        };
    }, [searchOpen]);

    return (
        <>
            {/* Full-page search overlay */}
            {searchOpen && (
                <div className="search-overlay">
                    <Form onSubmit={handleSearchSubmit} className="search-form">
                        <InputGroup>
                            <Form.Control
                                ref={inputRef}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="search-input"
                            />
                            <Button
                                variant="outline-secondary"
                                type="submit"
                                className="search-submit"
                            >
                                <i className="bi bi-search"></i>
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={() => setSearchOpen(false)}
                                className="search-close"
                            >
                                <i className="bi bi-x-lg"></i>
                            </Button>
                        </InputGroup>
                    </Form>
                </div>
            )}

            <Navbar expand="lg" className={`main-navbar p-0 ${searchOpen ? 'search-open' : ''}`} bg="light">
                <Container className="navbar-container p-0">
                    <Navbar.Brand as={Link} href="/" className="navbar-brand py-2">
                        <ApplicationLogo className="brand-logo" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" className="navbar-toggle">
                        <i className="bi bi-list navbar-toggle-icon"></i>
                    </Navbar.Toggle>

                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="ms-auto">
                                {navItems.map((item, index) => {
                                    if (item.dropdownItems) {
                                        return (
                                            <NavDropdown
                                                key={index}
                                                title={
                                                    <span className="nav-dropdown-title">
                                                        <i className={`bi ${item.icon}`}></i> {item.text}
                                                    </span>
                                                }
                                                id={`${item.text.toLowerCase()}-dropdown`}
                                                show={dropdownOpen === item.text}
                                                onMouseEnter={() => setDropdownOpen(item.text)}
                                                onMouseLeave={() => setDropdownOpen(null)}
                                                className="nav-dropdown"
                                            >
                                                {item.dropdownItems.map((subItem, subIndex) => (
                                                    <NavDropdown.Item
                                                        key={subIndex}
                                                        as={Link}
                                                        href={subItem.href}
                                                        className="dropdown-item"
                                                    >
                                                        <i className={`bi ${subItem.icon}`}></i> {subItem.text}
                                                    </NavDropdown.Item>
                                                ))}
                                            </NavDropdown>
                                        );
                                    } else {
                                        return (
                                            <Nav.Link
                                                key={index}
                                                as={Link}
                                                href={item.href}
                                                className={`nav-link ${item.isButton ? 'button' : ''}`}
                                                active={item.isRoute && route().current(item.href)}
                                            >
                                                <i className={`bi ${item.icon}`}></i> {item.text}
                                            </Nav.Link>
                                        );
                                    }
                                })}

                                {/* Search Icon */}
                                <div ref={searchRef}>
                                    <Nav.Link
                                        onClick={() => setSearchOpen(true)}
                                        className="nav-link search-icon"
                                    >
                                        <i className="bi bi-search"></i>
                                    </Nav.Link>
                                </div>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}