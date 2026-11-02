import React from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Container className="d-flex justify-content-center">
                <Card style={{ width: '100%', maxWidth: '500px' }} className="p-3">
                    <Card.Body>
                        <Form onSubmit={submit}>
                            <input type="hidden" name="token" value={data.token} />

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    isInvalid={!!errors.email}
                                    autoComplete="username"
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
                                    autoComplete="new-password"
                                    autoFocus
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password_confirmation">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    isInvalid={!!errors.password_confirmation}
                                    autoComplete="new-password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password_confirmation}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </GuestLayout>
    );
}