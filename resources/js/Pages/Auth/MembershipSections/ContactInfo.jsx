import { Form, Row, Col, FloatingLabel, Button, Spinner, InputGroup } from 'react-bootstrap';
import { BsTelephone, BsEnvelope, BsFillCheckCircleFill } from 'react-icons/bs';
import { useEffect } from 'react';

export default function ContactInformation({
    data,
    setData,
    errors,
    phoneVerified,
    emailVerified,
    sendingOTP,
    sendOTP,
    verifyOTP,
    processing
}) {
    // Set phone as default preferred channel if none is selected
    useEffect(() => {
        if (!data.preferredChannel) {
            setData('preferredChannel', 'phone');
        }
    }, [data.preferredChannel, setData]);

    const handlePreferredChannelChange = (channel) => {
        setData('preferredChannel', channel);
        if (channel === 'phone') {
            setData('emailVerified', false);
        } else {
            setData('phoneVerified', false);
        }
    };

    const isPreferredChannelPhone = data.preferredChannel === 'phone';
    const isPreferredChannelEmail = data.preferredChannel === 'email';

    return (
        <Col md={12} className="section-frame contact-information mb-5">
            <div className="title">
                <span>
                    <BsTelephone className="me-2" />
                    Contact Information
                </span>
            </div>

            <div className="p-3">
                <Row className="mb-3">
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Preferred Communication Channel</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Phone"
                                    name="preferredChannel"
                                    id="preferredChannel_phone"
                                    checked={isPreferredChannelPhone}
                                    onChange={() => handlePreferredChannelChange('phone')}
                                    isInvalid={!!errors.preferredChannel}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Email"
                                    name="preferredChannel"
                                    id="preferredChannel_email"
                                    checked={isPreferredChannelEmail}
                                    onChange={() => handlePreferredChannelChange('email')}
                                    isInvalid={!!errors.preferredChannel}
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors.preferredChannel}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        <InputGroup className="mb-3">
                            <FloatingLabel controlId="phone" label="Phone Number" style={{ flex: 1 }}>
                                <Form.Control
                                    type="number"
                                    placeholder="e.g., 2547XXXXXXXX"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    isInvalid={!!errors.phone}
                                    required={isPreferredChannelPhone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone || (isPreferredChannelPhone && !phoneVerified ? 'Phone verification is required' : '')}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            {isPreferredChannelPhone && (
                                <Button
                                    variant={phoneVerified ? "success" : "primary"}
                                    onClick={() => phoneVerified ? null : sendOTP('phone')}
                                    disabled={sendingOTP.phone || phoneVerified}
                                >
                                    {sendingOTP.phone ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : phoneVerified ? (
                                        <BsFillCheckCircleFill className="me-1" />
                                    ) : (
                                        <BsTelephone className="me-1" />
                                    )}
                                    {phoneVerified ? 'Verified' : 'Send OTP'}
                                </Button>
                            )}
                        </InputGroup>
                    </Col>

                    {!phoneVerified && isPreferredChannelPhone && (
                        <Col md={4}>
                            <InputGroup className="mb-3">
                                <FloatingLabel controlId="phoneOTP" label="Phone OTP Code" style={{ flex: 1 }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter 6-digit OTP Code"
                                        value={data.phoneOTP}
                                        onChange={(e) => setData('phoneOTP', e.target.value)}
                                        isInvalid={!!errors.phoneOTP}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phoneOTP}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => verifyOTP('phone')}
                                >
                                    Verify OTP
                                </Button>
                            </InputGroup>
                        </Col>
                    )}
                </Row>

                <Row>
                    <Col md={8}>
                        <InputGroup className="mb-3">
                            <FloatingLabel controlId="email" label="Email Address" style={{ flex: 1 }}>
                                <Form.Control
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    isInvalid={!!errors.email}
                                    required={isPreferredChannelEmail}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email || (isPreferredChannelEmail && !emailVerified ? 'Email verification is required' : '')}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            {isPreferredChannelEmail && (
                                <Button
                                    variant={emailVerified ? "success" : "primary"}
                                    onClick={() => emailVerified ? null : sendOTP('email')}
                                    disabled={sendingOTP.email || emailVerified}
                                >
                                    {sendingOTP.email ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : emailVerified ? (
                                        <BsFillCheckCircleFill className="me-1" />
                                    ) : (
                                        <BsEnvelope className="me-1" />
                                    )}
                                    {emailVerified ? 'Verified' : 'Send OTP'}
                                </Button>
                            )}
                        </InputGroup>
                    </Col>

                    {!emailVerified && isPreferredChannelEmail && (
                        <Col md={4}>
                            <InputGroup className="mb-3">
                                <FloatingLabel controlId="emailOTP" label="Email OTP Code" style={{ flex: 1 }}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter 6-digit OTP Code"
                                        value={data.emailOTP}
                                        onChange={(e) => setData('emailOTP', e.target.value)}
                                        isInvalid={!!errors.emailOTP}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.emailOTP}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => verifyOTP('email')}
                                >
                                    Verify OTP
                                </Button>
                            </InputGroup>
                        </Col>
                    )}
                </Row>
            </div>
        </Col>
    );
}