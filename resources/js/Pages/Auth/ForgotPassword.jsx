import React from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Container className="d-flex justify-content-center">
                <Card style={{ width: '100%', maxWidth: '500px' }} className="p-3">
                    <Card.Body>
                        <Alert variant="info" className="mb-4">
                            Forgot your password? No problem. Just let us know your email
                            address and we will email you a password reset link that will
                            allow you to choose a new one.
                        </Alert>

                        {status && (
                            <Alert variant="success" className="mb-4">
                                {status}
                            </Alert>
                        )}

                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    isInvalid={!!errors.email}
                                    autoFocus
                                />
                                {errors.email && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Sending...' : 'Email Password Reset Link'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </GuestLayout>
    );
}