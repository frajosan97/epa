import React from 'react';
import { Alert, Button, Card, Container, Form, Stack } from 'react-bootstrap';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Container className="d-flex justify-content-center">
                <Card style={{ width: '100%', maxWidth: '500px' }} className="p-3">
                    <Card.Body>
                        <Alert variant="info" className="mb-4">
                            Thanks for signing up! Before getting started, could you verify
                            your email address by clicking on the link we just emailed to
                            you? If you didn't receive the email, we will gladly send you
                            another.
                        </Alert>

                        {status === 'verification-link-sent' && (
                            <Alert variant="success" className="mb-4">
                                A new verification link has been sent to the email address
                                you provided during registration.
                            </Alert>
                        )}

                        <Form onSubmit={submit}>
                            <Stack direction="horizontal" gap={3} className="justify-content-between">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Sending...' : 'Resend Verification Email'}
                                </Button>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="btn btn-link text-decoration-none"
                                >
                                    Log Out
                                </Link>
                            </Stack>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </GuestLayout>
    );
}