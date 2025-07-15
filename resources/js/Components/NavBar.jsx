import { Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    Navbar,
    Nav,
    NavDropdown,
    Container,
    Offcanvas,
} from 'react-bootstrap';
import ApplicationLogo from './ApplicationLogo';
import '../../css/NavBar.css';

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const navItems = [
        { href: route('/'), icon: 'bi-house-door', text: 'Home' },
        { href: route('about'), icon: 'bi-info-circle', text: 'About' },
        { href: route('event'), icon: 'bi-calendar-event', text: 'Events' },
        {
            text: 'Resource',
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

    return (
        <Navbar expand="lg" className="main-navbar p-0" bg="light">
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
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
