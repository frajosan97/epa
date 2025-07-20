import { useState, useRef, useEffect } from 'react';
import { Form, InputGroup, Button, ListGroup, Spinner } from 'react-bootstrap';

export default function Search({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef(null);

    const handleSearch = async () => {
        if (searchQuery.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) throw new Error('Search failed');

            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim().length >= 2) {
                handleSearch();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="search-overlay">
            <div className="search-container">
                <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="search-form">
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
                            disabled={isSearching}
                        >
                            {isSearching ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                <i className="bi bi-search"></i>
                            )}
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={onClose}
                            className="search-close"
                        >
                            <i className="bi bi-x-lg"></i>
                        </Button>
                    </InputGroup>
                </Form>

                {isSearching ? (
                    <div className="search-status">
                        <Spinner animation="border" size="sm" />
                        <span>Searching...</span>
                    </div>
                ) : searchResults.length > 0 ? (
                    <ListGroup className="search-results">
                        {searchResults.map((result, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => {
                                    window.location.href = result.url;
                                    onClose();
                                }}
                            >
                                <h6>{result.title}</h6>
                                <p className="mb-0 text-muted">{result.snippet}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : searchQuery && !isSearching ? (
                    <div className="search-status">
                        No results found for "{searchQuery}"
                    </div>
                ) : null}
            </div>
        </div>
    );
}