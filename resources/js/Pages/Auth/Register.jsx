import { useState, useCallback, useMemo } from "react";
import { Form, Button, Container, Col, Spinner, Modal } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import useLocationData from "@/Hooks/useLocationData";
import PersonalInformation from "./MembershipSections/PersonalInfo";
import LocationInformation from "./MembershipSections/LocationInfo";
import ContactInformation from "./MembershipSections/ContactInfo";
import PrivacyPolicy from "./MembershipSections/PrivacyPolicy";

const reactSelectStyles = {
    control: (base) => ({ ...base, minHeight: 38, borderRadius: 6 }),
    menu: (base) => ({ ...base, zIndex: 1000 }),
    valueContainer: (base) => ({ ...base, padding: "2px 8px" }),
};

export default function MembershipRegistration() {
    const { data, setData, post, processing, errors, reset } = useForm({
        idNumber: "",
        sirName: "",
        firstName: "",
        lastName: "",
        dob: "",
        sex: "",
        ethnicity: "",
        membershipCategory: [],
        pwdNumber: "",
        resideInKenya: "Yes",
        countryOfResidence: "",
        religion: "",
        county: "",
        constituency: "",
        ward: "",
        preferredChannel: "phone",
        phone: "",
        phoneOTP: "",
        email: "",
        emailOTP: "",
        privacyAcceptance: false,
    });

    const [phoneVerified, setPhoneVerified] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [sendingOTP, setSendingOTP] = useState({
        phone: false,
        email: false,
    });
    const [verifyingOTP, setVerifyingOTP] = useState({
        phone: false,
        email: false,
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmMethod, setConfirmMethod] = useState("id");
    const [confirmValue, setConfirmValue] = useState("");
    const [isCheckingMembership, setIsCheckingMembership] = useState(false);
    const [memberInfo, setMemberInfo] = useState(null);

    const [unsubscribing, setUnsubscribing] = useState(false);
    const [showUnsubscribeVerification, setShowUnsubscribeVerification] =
        useState(false);
    const [unsubscribeOTP, setUnsubscribeOTP] = useState("");
    const [sendingUnsubscribeOTP, setSendingUnsubscribeOTP] = useState(false);
    const [unsubscribeOTPVerified, setUnsubscribeOTPVerified] = useState(false);

    const {
        counties,
        constituencies,
        wards,
        countries,
        loading: locationLoading,
        fetchConstituencies,
        fetchWards,
    } = useLocationData(data.county, data.constituency);

    /* ------------------ helpers ------------------ */
    const toastError = useCallback((prefix, err) => {
        const msg =
            err?.response?.data?.message || err?.message || "Unknown error";
        toast.error(`${prefix}: ${msg}`);
    }, []);

    const findOption = useCallback(
        (options, value) => options.find((o) => o.value === value) || null,
        [],
    );

    /* ------------------ location ------------------ */
    const handleCountyChange = useCallback(
        (option) => {
            const county = option?.value || "";
            setData((prev) => ({
                ...prev,
                county,
                constituency: "",
                ward: "",
            }));
            if (county) fetchConstituencies(county);
        },
        [setData, fetchConstituencies],
    );

    const handleConstituencyChange = useCallback(
        (option) => {
            const constituency = option?.value || "";
            setData((prev) => ({ ...prev, constituency, ward: "" }));
            if (constituency) fetchWards(constituency);
        },
        [setData, fetchWards],
    );

    const handleWardChange = useCallback(
        (option) => setData("ward", option?.value || ""),
        [setData],
    );

    /* ------------------ categories ------------------ */
    const handleCheckboxChange = useCallback(
        (e) => {
            const { value, checked } = e.target;
            const current = data.membershipCategory || [];
            const updated = checked
                ? [...current, value]
                : current.filter((c) => c !== value);
            setData("membershipCategory", updated);
        },
        [data.membershipCategory, setData],
    );

    /* ------------------ OTP ------------------ */
    const sendOTP = useCallback(
        async (type) => {
            const field = type === "phone" ? "phone" : "email";
            if (!data[field]) {
                toast.error(`Please enter your ${type} first`);
                return;
            }
            if (sendingOTP[type]) return;

            setSendingOTP((p) => ({ ...p, [type]: true }));
            try {
                const { data: res } = await axios.post(route("api.otp.send"), {
                    [field]: data[field],
                    type,
                });
                res.success
                    ? toast.success(`OTP sent to your ${type}`)
                    : toast.error(res.message || "Failed to send OTP");
            } catch (err) {
                toastError("Failed to send OTP", err);
            } finally {
                setSendingOTP((p) => ({ ...p, [type]: false }));
            }
        },
        [data, sendingOTP, toastError],
    );

    const verifyOTP = useCallback(
        async (type) => {
            const otpField = type === "phone" ? "phoneOTP" : "emailOTP";
            const addressField = type === "phone" ? "phone" : "email";

            if (!data[otpField]) {
                toast.error("Please enter the OTP code");
                return;
            }
            if (verifyingOTP[type]) return;

            setVerifyingOTP((p) => ({ ...p, [type]: true }));
            try {
                const { data: res } = await axios.post(
                    route("api.otp.verify"),
                    {
                        [addressField]: data[addressField],
                        otp: data[otpField],
                        type,
                    },
                );
                if (res.success) {
                    type === "phone"
                        ? setPhoneVerified(true)
                        : setEmailVerified(true);
                    toast.success(`${type} verified successfully!`);
                } else {
                    toast.error(res.message || "Verification failed");
                }
            } catch (err) {
                toastError("Verification failed", err);
            } finally {
                setVerifyingOTP((p) => ({ ...p, [type]: false }));
            }
        },
        [data, verifyingOTP, toastError],
    );

    const handlePhoneChange = useCallback(
        (value) => {
            setPhoneVerified(false);
            setData("phoneOTP", "");
            setData("phone", value);
        },
        [setData],
    );

    const handleEmailChange = useCallback(
        (value) => {
            setEmailVerified(false);
            setData("emailOTP", "");
            setData("email", value);
        },
        [setData],
    );

    /* ------------------ membership check ------------------ */
    const resetConfirmModal = useCallback(() => {
        setShowConfirmModal(false);
        setMemberInfo(null);
        setConfirmValue("");
        setShowUnsubscribeVerification(false);
        setUnsubscribeOTP("");
        setUnsubscribeOTPVerified(false);
    }, []);

    const checkMembership = useCallback(async () => {
        if (!confirmValue) {
            toast.error(
                `Please enter your ${confirmMethod === "id" ? "ID number" : "phone number"}`,
            );
            return;
        }
        setIsCheckingMembership(true);
        try {
            const { data: res } = await axios.post(route("api.confirm"), {
                type: confirmMethod,
                value: confirmValue,
            });
            if (res.success) {
                setMemberInfo(res.member);
                toast.success("Member information retrieved successfully");
            } else {
                setMemberInfo(null);
                toast.error(
                    res.message || "No member found with those details",
                );
            }
        } catch (err) {
            setMemberInfo(null);
            toastError("Error checking membership", err);
        } finally {
            setIsCheckingMembership(false);
        }
    }, [confirmValue, confirmMethod, toastError]);

    /* ------------------ unsubscribe ------------------ */
    const sendUnsubscribeOTP = useCallback(async () => {
        if (!memberInfo) return;
        const channel =
            memberInfo.prefered_channel === "email" ? "email" : "phone";
        const address =
            channel === "email" ? memberInfo.email : memberInfo.phone;

        setSendingUnsubscribeOTP(true);
        try {
            const { data: res } = await axios.post(route("api.otp.send"), {
                type: channel,
                [channel]: address,
            });
            res.success
                ? toast.success(`OTP sent to your ${channel}`)
                : toast.error(res.message || "Failed to send OTP");
        } catch (err) {
            toastError("Failed to send OTP", err);
        } finally {
            setSendingUnsubscribeOTP(false);
        }
    }, [memberInfo, toastError]);

    const verifyUnsubscribeOTP = useCallback(async () => {
        if (!unsubscribeOTP) {
            toast.error("Please enter the OTP code");
            return;
        }
        const channel =
            memberInfo.prefered_channel === "email" ? "email" : "phone";
        const address =
            channel === "email" ? memberInfo.email : memberInfo.phone;

        try {
            const { data: res } = await axios.post(route("api.otp.verify"), {
                [channel]: address,
                otp: unsubscribeOTP,
                type: channel,
            });
            if (res.success) {
                setUnsubscribeOTPVerified(true);
                toast.success("OTP verified successfully!");
            } else {
                toast.error(res.message || "Verification failed");
            }
        } catch (err) {
            toastError("Verification failed", err);
        }
    }, [memberInfo, unsubscribeOTP, toastError]);

    const handleUnsubscribe = useCallback(async () => {
        if (!memberInfo) return;
        const result = await Swal.fire({
            title: "Confirm Unsubscribe",
            text: "Are you sure you want to unsubscribe? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, unsubscribe",
            cancelButtonText: "No, cancel",
            reverseButtons: true,
        });
        if (!result.isConfirmed) return;

        setShowUnsubscribeVerification(true);
        await sendUnsubscribeOTP();
    }, [memberInfo, sendUnsubscribeOTP]);

    const confirmUnsubscribe = useCallback(async () => {
        if (!unsubscribeOTPVerified) {
            toast.error("Please verify the OTP first");
            return;
        }
        setUnsubscribing(true);
        try {
            const { data: res } = await axios.post(route("api.unsubscribe"), {
                member_id: memberInfo.id,
                otp: unsubscribeOTP,
                verification_channel: memberInfo.prefered_channel,
            });
            if (res.success) {
                toast.success("You have been unsubscribed successfully");
                resetConfirmModal();
            } else {
                toast.error(res.message || "Failed to unsubscribe");
            }
        } catch (err) {
            toastError("Unsubscribe failed", err);
        } finally {
            setUnsubscribing(false);
        }
    }, [
        unsubscribeOTPVerified,
        memberInfo,
        unsubscribeOTP,
        resetConfirmModal,
        toastError,
    ]);

    /* ------------------ submit ------------------ */
    const submit = useCallback(
        async (e) => {
            e.preventDefault();

            if (data.preferredChannel === "phone" && !phoneVerified) {
                toast.error("Please verify your phone number first");
                return;
            }
            if (data.preferredChannel === "email" && !emailVerified) {
                toast.error("Please verify your email address first");
                return;
            }
            if (!data.privacyAcceptance) {
                toast.error("You must accept the privacy statement");
                return;
            }

            const result = await Swal.fire({
                title: "Confirm Submission",
                text: "Are you sure you want to submit your membership registration?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, submit!",
                cancelButtonText: "No, cancel",
                reverseButtons: true,
            });
            if (!result.isConfirmed) return;

            post(route("register"), {
                onSuccess: () => {
                    Swal.fire({
                        title: "Success!",
                        text: "Your membership registration was successful.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                    reset();
                    setPhoneVerified(false);
                    setEmailVerified(false);
                },
                onError: (errs) => {
                    const msg =
                        errs && typeof errs === "object"
                            ? Object.values(errs).join("\n")
                            : "There were errors with your submission.";
                    toast.error(msg);
                },
            });
        },
        [
            phoneVerified,
            emailVerified,
            data.preferredChannel,
            data.privacyAcceptance,
            post,
            reset,
        ],
    );

    /* ------------------ memoized options ------------------ */
    const countyOptions = useMemo(
        () =>
            (counties || []).map((c) => ({
                value: c.id,
                label: c.county_name,
            })),
        [counties],
    );
    const constituencyOptions = useMemo(
        () =>
            (constituencies || []).map((c) => ({
                value: c.id,
                label: c.constituency_name,
            })),
        [constituencies],
    );
    const wardOptions = useMemo(
        () => (wards || []).map((w) => ({ value: w.id, label: w.ward_name })),
        [wards],
    );
    const countryOptions = useMemo(
        () => (countries || []).map((c) => ({ value: c, label: c })),
        [countries],
    );

    return (
        <AppLayout>
            <Head title="Membership Registration" />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                pauseOnHover
                draggable
            />

            <Container className="py-5">
                <Col md={9} className="mx-auto">
                    <blockquote className="border-start border-5 border-warning p-2 rounded-0 bg-light mb-5">
                        <h5>
                            <strong>Instructions</strong>
                        </h5>
                        <ol>
                            <li>
                                Please also ensure you have unblocked
                                promotional messages by dialling{" "}
                                <strong>*456*9*5*5*1#</strong> from your
                                Safaricom or Airtel line
                            </li>
                            <li>
                                You will receive a verification sms immediately
                                you register.
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className="p-0 text-decoration-none"
                                    onClick={() => setShowConfirmModal(true)}
                                >
                                    Confirm Your Membership
                                </Button>{" "}
                                if you had registered with us
                            </li>
                        </ol>
                    </blockquote>

                    <Form onSubmit={submit} noValidate>
                        <PersonalInformation
                            data={data}
                            setData={setData}
                            errors={errors}
                            handleCheckboxChange={handleCheckboxChange}
                            countries={countryOptions}
                            SelectComponent={Select}
                            selectStyles={reactSelectStyles}
                        />

                        <LocationInformation
                            data={data}
                            setData={setData}
                            errors={errors}
                            counties={countyOptions}
                            constituencies={constituencyOptions}
                            wards={wardOptions}
                            selectedCounty={findOption(
                                countyOptions,
                                data.county,
                            )}
                            selectedConstituency={findOption(
                                constituencyOptions,
                                data.constituency,
                            )}
                            selectedWard={findOption(wardOptions, data.ward)}
                            locationLoading={locationLoading}
                            handleCountyChange={handleCountyChange}
                            handleConstituencyChange={handleConstituencyChange}
                            handleWardChange={handleWardChange}
                            SelectComponent={Select}
                            selectStyles={reactSelectStyles}
                        />

                        <ContactInformation
                            data={data}
                            setData={setData}
                            errors={errors}
                            phoneVerified={phoneVerified}
                            emailVerified={emailVerified}
                            sendingOTP={sendingOTP}
                            verifyingOTP={verifyingOTP}
                            sendOTP={sendOTP}
                            verifyOTP={verifyOTP}
                            onPhoneChange={handlePhoneChange}
                            onEmailChange={handleEmailChange}
                            processing={processing}
                        />

                        <PrivacyPolicy
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                        />

                        <Col className="mt-4">
                            <Button
                                variant="primary"
                                size="lg"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                            className="me-2"
                                        />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Registration"
                                )}
                            </Button>
                        </Col>
                    </Form>
                </Col>

                {/* ---- Confirm Membership Modal ---- */}
                <Modal
                    centered
                    show={showConfirmModal}
                    onHide={resetConfirmModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Membership</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="d-block mb-2 fw-semibold">
                                    Search by
                                </Form.Label>
                                <div className="d-flex gap-2">
                                    <Button
                                        className="flex-fill"
                                        variant={
                                            confirmMethod === "id"
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        onClick={() => setConfirmMethod("id")}
                                    >
                                        ID Number
                                    </Button>
                                    <Button
                                        className="flex-fill"
                                        variant={
                                            confirmMethod === "phone"
                                                ? "primary"
                                                : "outline-primary"
                                        }
                                        onClick={() =>
                                            setConfirmMethod("phone")
                                        }
                                    >
                                        Phone Number
                                    </Button>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="d-block mb-2 fw-semibold">
                                    {confirmMethod === "id"
                                        ? "ID Number"
                                        : "Phone Number"}
                                </Form.Label>
                                <Form.Control
                                    type={
                                        confirmMethod === "id" ? "text" : "tel"
                                    }
                                    value={confirmValue}
                                    onChange={(e) =>
                                        setConfirmValue(e.target.value)
                                    }
                                    placeholder={`Enter your ${confirmMethod === "id" ? "national ID" : "phone number"}`}
                                />
                            </Form.Group>

                            {memberInfo && (
                                <div className="alert alert-success border-0 border-start border-5 border-success mt-3">
                                    <h4>Member Found</h4>
                                    <hr />
                                    <p>
                                        <strong>Name:</strong>{" "}
                                        <span className="text-capitalize">
                                            {`${memberInfo.sir_name} ${memberInfo.first_name} ${memberInfo.last_name}`}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>ID Number:</strong>{" "}
                                        {memberInfo.id_number}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong>{" "}
                                        {memberInfo.phone}
                                    </p>
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {memberInfo.email}
                                    </p>
                                    <p>
                                        <strong>Preferred Channel:</strong>{" "}
                                        {memberInfo.prefered_channel}
                                    </p>
                                    <p>
                                        <strong>Membership Status:</strong>{" "}
                                        {memberInfo.status}
                                    </p>

                                    <Button
                                        variant="danger"
                                        onClick={handleUnsubscribe}
                                        disabled={unsubscribing}
                                        className="mt-3 w-100"
                                    >
                                        {unsubscribing ? (
                                            <>
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                    className="me-2"
                                                />
                                                Unsubscribing...
                                            </>
                                        ) : (
                                            "Unsubscribe from Membership"
                                        )}
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-secondary"
                            onClick={resetConfirmModal}
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
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Checking...
                                </>
                            ) : (
                                "Check Membership"
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* ---- Unsubscribe Verification Modal ---- */}
                <Modal
                    centered
                    show={showUnsubscribeVerification}
                    onHide={() => {
                        setShowUnsubscribeVerification(false);
                        setUnsubscribeOTP("");
                        setUnsubscribeOTPVerified(false);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Verify Unsubscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="mb-4">
                            We&apos;ve sent a verification code to your{" "}
                            {memberInfo?.prefered_channel}. Please enter it
                            below to confirm your unsubscription.
                        </p>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                Verification Code
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={unsubscribeOTP}
                                onChange={(e) =>
                                    setUnsubscribeOTP(e.target.value)
                                }
                                placeholder={`Enter OTP sent to your ${memberInfo?.prefered_channel}`}
                                disabled={unsubscribeOTPVerified}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center">
                            <Button
                                variant="outline-secondary"
                                onClick={sendUnsubscribeOTP}
                                disabled={
                                    sendingUnsubscribeOTP ||
                                    unsubscribeOTPVerified
                                }
                            >
                                {sendingUnsubscribeOTP ? (
                                    <>
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                            className="me-2"
                                        />
                                        Resending...
                                    </>
                                ) : (
                                    "Resend OTP"
                                )}
                            </Button>
                            <Button
                                variant={
                                    unsubscribeOTPVerified
                                        ? "success"
                                        : "primary"
                                }
                                onClick={verifyUnsubscribeOTP}
                                disabled={
                                    unsubscribeOTPVerified || !unsubscribeOTP
                                }
                            >
                                {unsubscribeOTPVerified
                                    ? "Verified ✓"
                                    : "Verify OTP"}
                            </Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                setShowUnsubscribeVerification(false);
                                setUnsubscribeOTP("");
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
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Processing...
                                </>
                            ) : (
                                "Confirm Unsubscribe"
                            )}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </AppLayout>
    );
}
