import { Form, Row, Col, FloatingLabel, FormCheck, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BsPersonFill, BsGenderMale, BsGeoFill, BsInfoCircle } from 'react-icons/bs';
import { useState, useEffect } from 'react';

export default function PersonalInformation({
    data,
    setData,
    errors,
    handleCheckboxChange,
    countries
}) {
    const [age, setAge] = useState(0);

    // Calculate age from date of birth and update whenever dob changes
    useEffect(() => {
        if (data.dob) {
            const birthDate = new Date(data.dob);
            const difference = Date.now() - birthDate.getTime();
            const calculatedAge = new Date(difference);
            setAge(Math.abs(calculatedAge.getUTCFullYear() - 1970));

            // Automatically remove Youth category if age exceeds 35
            if (age > 35 && data.membershipCategory.includes('Youth')) {
                const updatedCategories = data.membershipCategory.filter(cat => cat !== 'Youth');
                setData('membershipCategory', updatedCategories);
            }
        } else {
            setAge(0);
        }
    }, [data.dob, age, data.membershipCategory, setData]);

    // Validate name field to only allow alphabets and special characters
    const validateName = (value) => {
        return /^[a-zA-Z\s\-.'()]+$/.test(value);
    };

    // Handle name change with validation
    const handleNameChange = (field, value) => {
        if (value === '' || validateName(value)) {
            setData(field, value);
        }
    };

    // Handle ID/Passport number change with max length validation
    const handleIdNumberChange = (value) => {
        if (value.length <= 8) {
            setData('idNumber', value);
        }
    };

    // Handle gender change to deactivate other gender options
    const handleGenderChange = (gender) => {
        setData('sex', gender);
    };

    // Tooltip for disabled Youth checkbox
    const youthTooltip = (
        <Tooltip id="youth-tooltip">
            Youth category is only available for ages 35 and below
        </Tooltip>
    );

    return (
        <Col md={12} className="section-frame personal-information mb-5">
            <div className="title">
                <span>
                    <BsPersonFill className="me-2" />
                    Personal Information
                </span>
            </div>

            <div className="p-3">
                <Row>
                    <Col md={12}>
                        <FloatingLabel controlId="idNumber" label="ID/Passport Number (max 8 chars)" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="ID/Passport Number"
                                value={data.idNumber}
                                onChange={(e) => handleIdNumberChange(e.target.value)}
                                isInvalid={!!errors.idNumber}
                                maxLength={8}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idNumber || "ID/Passport number must be 8 characters or less"}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <FloatingLabel controlId="sirName" label="Sur Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Sur Name"
                                value={data.sirName}
                                onChange={(e) => handleNameChange('sirName', e.target.value)}
                                isInvalid={!!errors.sirName}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.sirName || "Only alphabets and special characters allowed"}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="First Names"
                                value={data.firstName}
                                onChange={(e) => handleNameChange('firstName', e.target.value)}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName || "Only alphabets and special characters allowed"}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <FloatingLabel controlId="lastName" label="Other Names" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Other Names"
                                value={data.lastName}
                                onChange={(e) => handleNameChange('lastName', e.target.value)}
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName || "Only alphabets and special characters allowed"}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <FloatingLabel controlId="dob" label="Date of Birth" className="mb-3">
                            <Form.Control
                                type="date"
                                placeholder="Date of Birth"
                                value={data.dob}
                                onChange={(e) => setData('dob', e.target.value)}
                                isInvalid={!!errors.dob}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.dob}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <Form.Group controlId="sex" className="mb-3">
                            <Form.Label>
                                <BsGenderMale className="me-2" />
                                Sex <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="d-flex gap-4">
                                <Form.Check
                                    type="radio"
                                    id="male"
                                    label="Male"
                                    name="sex"
                                    value="Male"
                                    checked={data.sex === 'Male'}
                                    onChange={() => handleGenderChange('Male')}
                                    isInvalid={!!errors.sex}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    id="female"
                                    label="Female"
                                    name="sex"
                                    value="Female"
                                    checked={data.sex === 'Female'}
                                    onChange={() => handleGenderChange('Female')}
                                    isInvalid={!!errors.sex}
                                    disabled={data.sex === 'Male'}
                                />
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors.sex}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <FloatingLabel controlId="ethnicity" label="Ethnicity" className="mb-3">
                            <Form.Select
                                value={data.ethnicity}
                                onChange={(e) => setData('ethnicity', e.target.value)}
                                isInvalid={!!errors.ethnicity}
                            >
                                <option value="">Select Ethnicity</option>
                                <option value="Kikuyu">Kikuyu</option>
                                <option value="Luhya">Luhya</option>
                                <option value="Kalenjin">Kalenjin</option>
                                <option value="Luo">Luo</option>
                                <option value="Kamba">Kamba</option>
                                <option value="Somali">Somali</option>
                                <option value="Kisii">Kisii</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.ethnicity}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <Form.Group controlId="membershipCategory" className="mb-3">
                            <Form.Label>SIG Category</Form.Label>
                            {data.dob && (
                                <small className="text-muted d-block">
                                    Age: {age} years {age > 35 && "(Too old for Youth category)"}
                                </small>
                            )}
                            <div className="d-flex flex-wrap gap-3">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={youthTooltip}
                                    show={age > 35 ? undefined : false}
                                >
                                    <div className="d-inline-block">
                                        <FormCheck
                                            type="checkbox"
                                            id="youth"
                                            label="Youth"
                                            value="Youth"
                                            checked={data.membershipCategory.includes('Youth')}
                                            onChange={handleCheckboxChange}
                                            disabled={age > 35}
                                        />
                                    </div>
                                </OverlayTrigger>

                                <FormCheck
                                    type="checkbox"
                                    id="women"
                                    label="Women"
                                    value="Women"
                                    checked={data.membershipCategory.includes('Women')}
                                    onChange={handleCheckboxChange}
                                    disabled={data.sex === 'Male'}
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="pwd"
                                    label="PWD"
                                    value="PWD"
                                    checked={data.membershipCategory.includes('PWD')}
                                    onChange={handleCheckboxChange}
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="minority"
                                    label="Minority"
                                    value="Minority"
                                    checked={data.membershipCategory.includes('Minority')}
                                    onChange={handleCheckboxChange}
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="marginalized"
                                    label="Marginalized"
                                    value="Marginalized"
                                    checked={data.membershipCategory.includes('Marginalized')}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    {data.membershipCategory.includes('PWD') && (
                        <Col md={4}>
                            <FloatingLabel controlId="pwdNumber" label="PWD Number" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="PWD Number"
                                    value={data.pwdNumber}
                                    onChange={(e) => setData('pwdNumber', e.target.value)}
                                    isInvalid={!!errors.pwdNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.pwdNumber}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    )}

                    <Col md={4}>
                        <Form.Group controlId="resideInKenya" className="mb-3">
                            <Form.Label>
                                <BsGeoFill className="me-2" />
                                Do you reside in Kenya? <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="d-flex gap-4">
                                <Form.Check
                                    type="radio"
                                    id="resideYes"
                                    label="Yes"
                                    name="resideInKenya"
                                    value="Yes"
                                    checked={data.resideInKenya === 'Yes'}
                                    onChange={() => setData('resideInKenya', 'Yes')}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    id="resideNo"
                                    label="No"
                                    name="resideInKenya"
                                    value="No"
                                    checked={data.resideInKenya === 'No'}
                                    onChange={() => setData('resideInKenya', 'No')}
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    {data.resideInKenya === 'No' && (
                        <Col md={4}>
                            <FloatingLabel controlId="countryOfResidence" label="Country of Residence" className="mb-3">
                                <Form.Select
                                    value={data.countryOfResidence}
                                    onChange={(e) => setData('countryOfResidence', e.target.value)}
                                    isInvalid={!!errors.countryOfResidence}
                                    required={data.resideInKenya === 'No'}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.countryOfResidence}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    )}

                    <Col md={4}>
                        <FloatingLabel controlId="religion" label="Religion" className="mb-3">
                            <Form.Select
                                value={data.religion}
                                onChange={(e) => setData('religion', e.target.value)}
                                isInvalid={!!errors.religion}
                            >
                                <option value="">Select Religion</option>
                                <option value="Christianity">Christianity</option>
                                <option value="Islam">Islam</option>
                                <option value="Hinduism">Hinduism</option>
                                <option value="African Traditional Religions">
                                    African Traditional Religions
                                </option>
                                <option value="Atheism">Atheism</option>
                                <option value="Others">Others</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.religion}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}