import { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { BsShieldLock, BsCheckCircle } from 'react-icons/bs';

export default function PrivacyPolicy({
    data,
    setData,
    errors,
    processing
}) {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    const handleAcceptanceChange = (e) => {
        setData('privacyAcceptance', e.target.checked);
    };

    return (
        <Col md={12} className="section-frame contact-information mb-3">
            <div className="title">
                <span>
                    <BsShieldLock className="me-2" />
                    Data Protection & Terms
                </span>
            </div>

            <div className="p-3">
                <Row>
                    <Col>
                        <div className="privacy-intro">
                            <div className="d-flex align-items-start">
                                <BsCheckCircle className="text-success mt-1 me-2 flex-shrink-0" />
                                <div>
                                    <h5>Your Data Protection Rights</h5>
                                    <p className="text-muted mb-0">
                                        We process your personal data in compliance with Kenya's Data Protection Act (2019)
                                        and the Political Parties Act Cap 7D.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`acceptance-box mt-4 ${errors.privacyAcceptance ? 'is-invalid' : ''}`}>
                            <Form.Check
                                type="checkbox"
                                id="privacyAcceptance"
                                label={
                                    <span>
                                        I acknowledge that I have read and understood the{' '}
                                        <Button
                                            variant="link"
                                            className="p-0 text-decoration-none"
                                            onClick={() => setShowPrivacyPolicy(true)}
                                        >
                                            Privacy Policy
                                        </Button>{' '}
                                        and agree to the processing of my personal data as described.
                                    </span>
                                }
                                checked={data.privacyAcceptance}
                                onChange={handleAcceptanceChange}
                            />
                            {errors.privacyAcceptance && (
                                <div className="invalid-feedback d-block animated-feedback">
                                    {errors.privacyAcceptance}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Full Policy Modal */}
            <Modal
                show={showPrivacyPolicy}
                onHide={() => setShowPrivacyPolicy(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton className="bg-purple text-white">
                    <Modal.Title>
                        <BsShieldLock className="me-2" />
                        Privacy Statement - Economic Patriotic Alliance (EPA)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="privacy-policy-modal-body p-4">
                    <div className="policy-content">
                        <p className="mb-4">
                            The Economic Patriotic Alliance (EPA) is committed to protecting your personal information in accordance with the Political Parties Act Cap 7D, the Data Protection Act, 2019, and related regulations.
                        </p>

                        <h5 className="mb-3">1. Information We Collect</h5>
                        <p>
                            In compliance with Form PPM1 of the Political Parties (Membership) Regulations, 2021, and for purposes of registration, verification, and compliance, we collect the following personal information from members:
                        </p>
                        <ul>
                            <li>Full Name</li>
                            <li>National ID/Passport Number</li>
                            <li>Date of Birth</li>
                            <li>Gender</li>
                            <li>Phone Number</li>
                            <li>Email Address</li>
                            <li>County</li>
                            <li>Constituency</li>
                            <li>Ward</li>
                            <li>Preferred Notification Channel (SMS, Email)</li>
                            <li>Consent to join the party</li>
                            <li>Date and method of registration (online, USSD, manual)</li>
                            <li>Photograph or signature (where applicable)</li>
                        </ul>
                        <p>
                            This information is collected solely for the purpose of fulfilling legal obligations under the Political Parties Act, Cap 7D, including submission to the Office of the Registrar of Political Parties (ORPP) for verification and enrollment into the Integrated Political Parties Management System (IPPMS).
                        </p>

                        <h5 className="mt-4 mb-3">2. How Your Data Is Used</h5>
                        <ul>
                            <li>To register you as a member of the EPA.</li>
                            <li>To verify your eligibility and prevent duplicate or fraudulent entries.</li>
                            <li>To communicate with you regarding party events, updates, and elections.</li>
                            <li>To fulfill statutory reporting requirements to ORPP and other relevant authorities.</li>
                        </ul>

                        <h5 className="mt-4 mb-3">3. Data Sharing and Protection</h5>
                        <p>
                            Your personal data is not shared with any third parties except as required by law or with authorized institutions such as ORPP. All data is stored securely with appropriate access controls, encryption, and audit trails.
                        </p>

                        <h5 className="mt-4 mb-3">4. Your Rights</h5>
                        <p>
                            Under the Data Protection Act, you have the right to:
                        </p>
                        <ul>
                            <li>Access your personal data.</li>
                            <li>Request correction or deletion of inaccurate data.</li>
                            <li>Withdraw your consent at any time.</li>
                            <li>Lodge a complaint with the Office of the Data Protection Commissioner.</li>
                        </ul>

                        <h5 className="mt-4 mb-3">5. Contact Information</h5>
                        <p>
                            If you have any questions regarding this privacy statement or how your data is handled, please contact us at:
                        </p>
                        <p>
                            📧 Email: <a href="mailto:info@epa.or.ke">info@epa.or.ke</a><br />
                            📞 Phone: +254 733868843
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={() => setShowPrivacyPolicy(false)}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary-2"
                        onClick={() => {
                            setData('privacyAcceptance', true);
                            setShowPrivacyPolicy(false);
                        }}
                    >
                        Accept Policy
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}