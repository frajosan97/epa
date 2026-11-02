import React from 'react';
import { Form, Button, Alert, Container, Card, Stack } from 'react-bootstrap';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Container className="d-flex justify-content-center">
                <Card style={{ width: '100%', maxWidth: '500px' }} className="p-3">
                    <Card.Body>
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
                                    autoComplete="username"
                                    autoFocus
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    isInvalid={!!errors.password}
                                    autoComplete="current-password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="remember">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                            </Form.Group>

                            <Stack direction="horizontal" gap={3} className="justify-content-between">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-decoration-none"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                    className="ms-auto"
                                >
                                    {processing ? 'Logging in...' : 'Log in'}
                                </Button>
                            </Stack>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </GuestLayout>
    );
}