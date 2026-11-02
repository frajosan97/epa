import { useState } from 'react';
import { Form, Button, Container, ButtonGroup, Col, Spinner, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import useLocationData from '@/Hooks/useLocationData';
import PersonalInfomation from './MembershipSections/PersonalInfo';
import LocationInformation from './MembershipSections/LocationInfo';
import ContactInformation from './MembershipSections/ContactInfo';
import PrivacyPolicy from './MembershipSections/PrivacyPolicy';
import HeroBanner from '@/Components/HeroBanner';

export default function MembershipRegistration() {
    const { data, setData, post, processing, errors, reset } = useForm({
        idNumber: '',
        sirName: '',
        firstName: '',
        lastName: '',
        dob: '',
        sex: '',
        ethnicity: '',
        membershipCategory: [],
        pwdNumber: '',
        resideInKenya: 'Yes',
        countryOfResidence: '',
        religion: '',
        county: '',
        constituency: '',
        ward: '',
        preferredChannel: '',
        phone: '',
        phoneOTP: '',
        email: '',
        emailOTP: '',
        privacyAcceptance: false
    });

    const [phoneVerified, setPhoneVerified] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [sendingOTP, setSendingOTP] = useState({ phone: false, email: false });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmMethod, setConfirmMethod] = useState('id');
    const [confirmValue, setConfirmValue] = useState('');
    const [isCheckingMembership, setIsCheckingMembership] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);
    const [unsubscribing, setUnsubscribing] = useState(false);
    const [showUnsubscribeVerification, setShowUnsubscribeVerification] = useState(false);
    const [unsubscribeOTP, setUnsubscribeOTP] = useState('');
    const [sendingUnsubscribeOTP, setSendingUnsubscribeOTP] = useState(false);
    const [unsubscribeOTPVerified, setUnsubscribeOTPVerified] = useState(false);

    // Use the location data hook
    const {
        counties,
        constituencies,
        wards,
        countries,
        loading: locationLoading,
        error: locationError,
        fetchConstituencies,
        fetchWards
    } = useLocationData(data.county, data.constituency);

    // Handle county change
    const handleCountyChange = (county) => {
        setData('county', county);
        setData('constituency', '');
        setData('ward', '');
        if (county) {
            fetchConstituencies(county);
        }
    };

    // Handle constituency change
    const handleConstituencyChange = (constituency) => {
        setData('constituency', constituency);
        setData('ward', '');
        if (constituency) {
            fetchWards(constituency);
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedCategories = [...data.membershipCategory];

        if (checked) {
            updatedCategories.push(value);
        } else {
            updatedCategories = updatedCategories.filter(cat => cat !== value);
        }

        setData('membershipCategory', updatedCategories);
    };

    const sendOTP = async (type) => {
        const field = type === 'phone' ? 'phone' : 'email';
        if (!data[field]) {
            toast.error(`Please enter your ${type} first`);
            return;
        }

        setSendingOTP({ ...sendingOTP, [type]: true });

        try {
            const response = await axios.post(route('api.otp.send'), {
                [field]: data[field],
                type
            });

            if (response.data.success) {
                toast.success(`OTP sent to your ${type}`);
            } else {
                toast.error(response.data.message || `Failed to send OTP`);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(`Failed to send OTP: ${errorMsg}`);
        } finally {
            setSendingOTP({ ...sendingOTP, [type]: false });
        }
    };

    const verifyOTP = async (type) => {
        const otpField = type === 'phone' ? 'phoneOTP' : 'emailOTP';
        if (!data[otpField]) {
            toast.error(`Please enter the OTP code`);
            return;
        }

        try {
            const response = await axios.post(route('api.otp.verify'), {
                [type]: data[type === 'phone' ? 'phone' : 'email'],
                otp: data[otpField],
                type
            });

            if (response.data.success) {
                if (type === 'phone') {
                    setPhoneVerified(true);
                } else {
                    setEmailVerified(true);
                }
                toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully!`);
            } else {
                toast.error(response.data.message || `Verification failed`);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(`Verification failed: ${errorMsg}`);
        }
    };

    const checkMembership = async () => {
        if (!confirmValue) {
            toast.error(`Please enter your ${confirmMethod === 'id' ? 'ID number' : 'phone number'}`);
            return;
        }

        setIsCheckingMembership(true);

        try {
            const response = await axios.post(route('api.confirm'), {
                type: confirmMethod,
                value: confirmValue
            });

            if (response.data.success) {
                setMemberInfo(response.data.member);
                toast.success('Member information retrieved successfully');
            } else {
                toast.error(response.data.message || 'No member found with those details');
                setMemberInfo(null);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(`Error checking membership: ${errorMsg}`);
            setMemberInfo(null);
        } finally {
            setIsCheckingMembership(false);
        }
    };

    const sendUnsubscribeOTP = async () => {
        if (!memberInfo) return;

        setSendingUnsubscribeOTP(true);

        try {
            const response = await axios.post(route('api.otp.send'), {
                type: memberInfo.prefered_channel === 'email' ? 'email' : 'phone',
                [memberInfo.prefered_channel === 'email' ? 'email' : 'phone']:
                    memberInfo.prefered_channel === 'email' ? memberInfo.email : memberInfo.phone
            });

            if (response.data.success) {
                toast.success(`OTP sent to your ${memberInfo.prefered_channel}`);
            } else {
                toast.error(response.data.message || `Failed to send OTP`);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(`Failed to send OTP: ${errorMsg}`);
        } finally {
            setSendingUnsubscribeOTP(false);
        }
    };

    const verifyUnsubscribeOTP = async () => {
        if (!unsubscribeOTP) {
            toast.error('Please enter the OTP code');
            return;
        }

        try {
            const response = await axios.post(route('api.otp.verify'), {
                [memberInfo.prefered_channel === 'email' ? 'email' : 'phone']:
                    memberInfo.prefered_channel === 'email' ? memberInfo.email : memberInfo.phone,
                otp: unsubscribeOTP,
                type: memberInfo.prefered_channel === 'email' ? 'email' : 'phone'
            });

            if (response.data.success) {
                setUnsubscribeOTPVerified(true);
                toast.success('OTP verified successfully!');
            } else {
                toast.error(response.data.message || `Verification failed`);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(`Verification failed: ${errorMsg}`);
        }
    };

    const handleUnsubscribe = async () => {
        if (!memberInfo) return;

        const result = await Swal.fire({
            title: 'Confirm Unsubscribe',
            text: 'Are you sure you want to unsubscribe from our membership? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, unsubscribe',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        });

        if (!result.isConfirmed) {
            return;
        }

        setShowUnsubscribeVerification(true);
        await sendUnsubscribeOTP();
    };

    const confirmUnsubscribe = async () => {
        if (!unsubscribeOTPVerified) {
            toast.error('Please verify the OTP first');
            return;
        }

        setUnsubscribing(true);

        try {
            const response = await axios.post(route('api.unsubscribe'), {
                member_id: memberInfo.id,
                otp: unsubscribeOTP,
                verification_channel: memberInfo.prefered_channel
            });

            if (response.data.success) {
                toast.success('You have been unsubscribed successfully');
                setMemberInfo(null);
                setConfirmValue('');
                setShowUnsubscribeVerification(false);
                setShowConfirmModal(false);
                setUnsubscribeOTP('');
                setUnsubscribeOTPVerified(false);
            } else {
                toast.error(response.data.message || 'Failed to unsubscribe');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(`Unsubscribe failed: ${errorMsg}`);
        } finally {
            setUnsubscribing(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!phoneVerified) {
            toast.error('Please verify your phone number first');
            return;
        }

        if (!data.privacyAcceptance) {
            toast.error('You must accept the privacy statement');
            return;
        }

        const result = await Swal.fire({
            title: 'Confirm Submission',
            text: 'Are you sure you want to submit your membership registration?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit!',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await post(route('register'), {
                onSuccess: () => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your membership registration was successful.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    reset();
                },
                onError: (errors) => {
                    let errorMessage = 'There were errors with your submission.';
                    if (errors && typeof errors === 'object') {
                        errorMessage = Object.values(errors).join('\n');
                    }
                    toast.error(errorMessage);
                }
            });
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <AppLayout>
            <Head title="Membership Registration" />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Hero Section */}
            {/* <HeroBanner data={{
                title: "Join EPA today",
                subtitle: "Become member at EPA and enjoy plenty of benefits"
            }} /> */}

            <Container className='py-5'>
                <blockquote className='border-start border-5 border-warning p-2 rounded bg-light mb-5'>
                    <h5>Instructions</h5>
                    <ol>
                        <li>Please also ensure you have unblocked promotional messages by dialling <strong>*456*9*5*5*1#</strong> from your Safaricom or Airtel line</li>
                        <li>You will receive a verification sms immediately you register.</li>
                        <li>
                            <Button
                                variant="link"
                                className="p-0 text-decoration-none"
                                onClick={() => setShowConfirmModal(true)}
                            >
                                Confirm Your Membership
                            </Button> if you had registered with us
                        </li>
                    </ol>
                </blockquote>

                <Form onSubmit={submit}>
                    <PersonalInfomation
                        data={data}
                        setData={setData}
                        errors={errors}
                        handleCheckboxChange={handleCheckboxChange}
                        countries={countries}
                    />

                    <LocationInformation
                        data={data}
                        setData={setData}
                        errors={errors}
                        counties={counties}
                        constituencies={constituencies}
                        wards={wards}
                        locationLoading={locationLoading}
                        handleCountyChange={handleCountyChange}
                        handleConstituencyChange={handleConstituencyChange}
                    />

                    <ContactInformation
                        data={data}
                        setData={setData}
                        errors={errors}
                        phoneVerified={phoneVerified}
                        emailVerified={emailVerified}
                        sendingOTP={sendingOTP}
                        sendOTP={sendOTP}
                        verifyOTP={verifyOTP}
                        processing={processing}
                    />

                    <PrivacyPolicy
                        data={data}
                        setData={setData}
                        errors={errors}
                    />

                    <Col>
                        <Button
                            variant="primary"
                            size="lg"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </Button>
                    </Col>
                </Form>

                {/* Confirm Membership Modal */}
                <Modal centered show={showConfirmModal} onHide={() => {
                    setShowConfirmModal(false);
                    setMemberInfo(null);
                    setConfirmValue('');
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Membership</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Search by:</Form.Label>
                                <ButtonGroup className="w-100">
                                    <Button
                                        variant={confirmMethod === 'id' ? 'primary' : 'outline-primary'}
                                        onClick={() => setConfirmMethod('id')}
                                    >
                                        ID Number
                                    </Button>
                                    <Button
                                        variant={confirmMethod === 'phone' ? 'primary' : 'outline-primary'}
                                        onClick={() => setConfirmMethod('phone')}
                                    >
                                        Phone Number
                                    </Button>
                                </ButtonGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    {confirmMethod === 'id' ? 'ID Number' : 'Phone Number'}
                                </Form.Label>
                                <Form.Control
                                    type={confirmMethod === 'id' ? 'text' : 'tel'}
                                    value={confirmValue}
                                    onChange={(e) => setConfirmValue(e.target.value)}
                                    placeholder={`Enter your ${confirmMethod === 'id' ? 'national ID' : 'phone number'}`}
                                />
                            </Form.Group>

                            {memberInfo && (
                                <div className="alert alert-success border-0 border-start border-5 border-success mt-3">
                                    <h4>Member Found</h4>
                                    <hr />
                                    <p><strong>Name:</strong> <span className="text-capitalize">{`${memberInfo.sir_name} ${memberInfo.first_name} ${memberInfo.last_name}`}</span></p>
                                    <p><strong>ID Number:</strong> {memberInfo.id_number}</p>
                                    <p><strong>Phone:</strong> {memberInfo.phone}</p>
                                    <p><strong>Email:</strong> {memberInfo.email}</p>
                                    <p><strong>Preferred Channel:</strong> {memberInfo.prefered_channel}</p>
                                    <p><strong>Membership Status:</strong> {memberInfo.status}</p>

                                    <Button
                                        variant="danger"
                                        onClick={handleUnsubscribe}
                                        disabled={unsubscribing}
                                        className="mt-3 w-100"
                                    >
                                        {unsubscribing ? (
                                            <>
                                                <Spinner animation="border" size="sm" className="me-2" />
                                                Unsubscribing...
                                            </>
                                        ) : (
                                            'Unsubscribe from Membership'
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                setShowConfirmModal(false);
                                setMemberInfo(null);
                                setConfirmValue('');
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={checkMembership}
                            disabled={isCheckingMembership}
                        >
                            {isCheckingMembership ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Checking...
                                </>
                            ) : (
                                'Check Membership'
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Unsubscribe Verification Modal */}
                <Modal centered show={showUnsubscribeVerification} onHide={() => {
                    setShowUnsubscribeVerification(false);
                    setUnsubscribeOTP('');
                    setUnsubscribeOTPVerified(false);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Verify Unsubscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <p className="mb-4">
                                We've sent a verification code to your {memberInfo?.prefered_channel}.
                                Please enter it below to confirm your unsubscription.
                            </p>

                            <Form.Group className="mb-3">
                                <Form.Label>Verification Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={unsubscribeOTP}
                                    onChange={(e) => setUnsubscribeOTP(e.target.value)}
                                    placeholder={`Enter OTP sent to your ${memberInfo?.prefered_channel}`}
                                    disabled={unsubscribeOTPVerified}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between align-items-center">
                                <Button
                                    variant="outline-secondary"
                                    onClick={sendUnsubscribeOTP}
                                    disabled={sendingUnsubscribeOTP || unsubscribeOTPVerified}
                                >
                                    {sendingUnsubscribeOTP ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            Resending...
                                        </>
                                    ) : (
                                        'Resend OTP'
                                    )}
                                </Button>

                                <Button
                                    variant={unsubscribeOTPVerified ? 'success' : 'primary'}
                                    onClick={verifyUnsubscribeOTP}
                                    disabled={unsubscribeOTPVerified || !unsubscribeOTP}
                                >
                                    {unsubscribeOTPVerified ? (
                                        'Verified ✓'
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                setShowUnsubscribeVerification(false);
                                setUnsubscribeOTP('');
                                setUnsubscribeOTPVerified(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={confirmUnsubscribe}
                            disabled={!unsubscribeOTPVerified || unsubscribing}
                        >
                            {unsubscribing ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Processing...
                                </>
                            ) : (
                                'Confirm Unsubscribe'
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </AppLayout>
    );
}