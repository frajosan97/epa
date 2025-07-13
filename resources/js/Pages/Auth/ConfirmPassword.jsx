import React from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Container className="d-flex justify-content-center">
                <Card style={{ width: '100%', maxWidth: '500px' }} className="p-3">
                    <Card.Body>
                        <Alert variant="info" className="mb-4">
                            This is a secure area of the application. Please confirm your
                            password before continuing.
                        </Alert>

                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    isInvalid={!!errors.password}
                                    autoFocus
                                />
                                {errors.password && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                    className="ms-2"
                                >
                                    {processing ? 'Confirming...' : 'Confirm'}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </GuestLayout>
    );
}