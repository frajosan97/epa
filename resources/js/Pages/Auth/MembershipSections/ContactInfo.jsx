import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { BsTelephone, BsEnvelope, BsFillCheckCircleFill } from "react-icons/bs";
import { useEffect } from "react";

export default function ContactInformation({
    data,
    setData,
    errors,
    phoneVerified,
    emailVerified,
    sendingOTP,
    verifyingOTP,
    sendOTP,
    verifyOTP,
    onPhoneChange,
    onEmailChange,
    processing,
}) {
    useEffect(() => {
        if (!data.preferredChannel) setData("preferredChannel", "phone");
    }, [data.preferredChannel, setData]);

    const handlePreferredChannelChange = (channel) => {
        setData("preferredChannel", channel);
        // Don't reset the other verification state — user may have verified both
    };

    const isPhone = data.preferredChannel === "phone";
    const isEmail = data.preferredChannel === "email";

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
                            <Form.Label className="d-block mb-2 fw-semibold">
                                Preferred Communication Channel
                            </Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Phone"
                                    name="preferredChannel"
                                    id="preferredChannel_phone"
                                    checked={isPhone}
                                    onChange={() =>
                                        handlePreferredChannelChange("phone")
                                    }
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Email"
                                    name="preferredChannel"
                                    id="preferredChannel_email"
                                    checked={isEmail}
                                    onChange={() =>
                                        handlePreferredChannelChange("email")
                                    }
                                />
                            </div>
                            {errors.preferredChannel && (
                                <Form.Text className="text-danger">
                                    {errors.preferredChannel}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                {/* ---------- Phone ---------- */}
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                <BsTelephone className="me-2" />
                                Phone Number
                                {isPhone && (
                                    <span className="text-danger"> *</span>
                                )}
                            </Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type="tel"
                                    placeholder="e.g., 2547XXXXXXXX"
                                    value={data.phone}
                                    onChange={(e) =>
                                        onPhoneChange(e.target.value)
                                    }
                                    isInvalid={!!errors.phone}
                                    disabled={phoneVerified}
                                    required={isPhone}
                                />
                                <Button
                                    variant={
                                        phoneVerified ? "success" : "primary"
                                    }
                                    onClick={() =>
                                        phoneVerified ? null : sendOTP("phone")
                                    }
                                    disabled={sendingOTP.phone || phoneVerified}
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    {sendingOTP.phone ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : phoneVerified ? (
                                        <BsFillCheckCircleFill className="me-1" />
                                    ) : (
                                        <BsTelephone className="me-1" />
                                    )}
                                    {phoneVerified ? "Verified" : "Send OTP"}
                                </Button>
                            </div>
                            {errors.phone && (
                                <Form.Text className="text-danger">
                                    {errors.phone}
                                </Form.Text>
                            )}
                            {isPhone && !phoneVerified && !errors.phone && (
                                <Form.Text className="text-muted">
                                    Phone verification is required
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    {!phoneVerified && isPhone && (
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="d-block mb-2 fw-semibold">
                                    Phone OTP Code
                                </Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={data.phoneOTP}
                                        onChange={(e) =>
                                            setData("phoneOTP", e.target.value)
                                        }
                                        isInvalid={!!errors.phoneOTP}
                                    />
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => verifyOTP("phone")}
                                        disabled={verifyingOTP.phone}
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        {verifyingOTP.phone ? (
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                            />
                                        ) : (
                                            "Verify"
                                        )}
                                    </Button>
                                </div>
                                {errors.phoneOTP && (
                                    <Form.Text className="text-danger">
                                        {errors.phoneOTP}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    )}
                </Row>

                {/* ---------- Email ---------- */}
                <Row>
                    <Col md={8}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                <BsEnvelope className="me-2" />
                                Email Address
                                {isEmail && (
                                    <span className="text-danger"> *</span>
                                )}
                            </Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type="email"
                                    placeholder="your.email@example.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        onEmailChange(e.target.value)
                                    }
                                    isInvalid={!!errors.email}
                                    disabled={emailVerified}
                                    required={isEmail}
                                />
                                <Button
                                    variant={
                                        emailVerified ? "success" : "primary"
                                    }
                                    onClick={() =>
                                        emailVerified ? null : sendOTP("email")
                                    }
                                    disabled={sendingOTP.email || emailVerified}
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    {sendingOTP.email ? (
                                        <Spinner animation="border" size="sm" />
                                    ) : emailVerified ? (
                                        <BsFillCheckCircleFill className="me-1" />
                                    ) : (
                                        <BsEnvelope className="me-1" />
                                    )}
                                    {emailVerified ? "Verified" : "Send OTP"}
                                </Button>
                            </div>
                            {errors.email && (
                                <Form.Text className="text-danger">
                                    {errors.email}
                                </Form.Text>
                            )}
                            {isEmail && !emailVerified && !errors.email && (
                                <Form.Text className="text-muted">
                                    Email verification is required
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    {!emailVerified && isEmail && (
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="d-block mb-2 fw-semibold">
                                    Email OTP Code
                                </Form.Label>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={data.emailOTP}
                                        onChange={(e) =>
                                            setData("emailOTP", e.target.value)
                                        }
                                        isInvalid={!!errors.emailOTP}
                                    />
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => verifyOTP("email")}
                                        disabled={verifyingOTP.email}
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        {verifyingOTP.email ? (
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                            />
                                        ) : (
                                            "Verify"
                                        )}
                                    </Button>
                                </div>
                                {errors.emailOTP && (
                                    <Form.Text className="text-danger">
                                        {errors.emailOTP}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    )}
                </Row>
            </div>
        </Col>
    );
}
