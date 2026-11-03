import {
    Form,
    Row,
    Col,
    Tooltip,
    OverlayTrigger,
    FormCheck,
} from "react-bootstrap";
import { BsPersonFill, BsGenderMale, BsGeoFill } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function PersonalInformation({
    data,
    setData,
    errors,
    handleCheckboxChange,
    countries,
    SelectComponent,
    selectStyles,
}) {
    const [age, setAge] = useState(0);

    useEffect(() => {
        if (data.dob) {
            const birthDate = new Date(data.dob);
            const difference = Date.now() - birthDate.getTime();
            const calculatedAge = new Date(difference);
            const a = Math.abs(calculatedAge.getUTCFullYear() - 1970);
            setAge(a);

            if (a > 35 && data.membershipCategory.includes("Youth")) {
                setData(
                    "membershipCategory",
                    data.membershipCategory.filter((c) => c !== "Youth"),
                );
            }
        } else {
            setAge(0);
        }
    }, [data.dob, data.membershipCategory, setData]);

    const validateName = (v) => /^[a-zA-Z\s\-.'()]+$/.test(v);
    const handleNameChange = (field, value) => {
        if (value === "" || validateName(value)) setData(field, value);
    };
    const handleIdNumberChange = (v) => {
        if (v.length <= 9) setData("idNumber", v);
    };

    const youthTooltip = (
        <Tooltip id="youth-tooltip">
            Youth category is only available for ages 35 and below
        </Tooltip>
    );

    const ethnicityOptions = [
        "Kikuyu",
        "Luhya",
        "Luo",
        "Kalenjin",
        "Kamba",
        "Kisii",
        "Meru",
        "Maasai",
        "Mijikenda",
        "Turkana",
        "Somali",
        "Embu",
        "Taita",
        "Taveta",
        "Pokot",
        "Samburu",
        "Rendille",
        "Borana",
        "Gabra",
        "Orma",
        "Swahili",
        "Tharaka",
        "Nubi",
        "Kurya",
        "Teso",
        "Suba",
        "Bajuni",
        "Basuba",
        "Ogiek",
        "El Molo",
        "Sakuye",
        "Boni",
        "Burji",
        "Digo",
        "Gosha",
        "Isukha",
        "Khayo",
        "Maragoli",
        "Tachoni",
        "Chonyi",
        "Kuria",
        "Ilchamus",
        "Other",
    ].map((e) => ({ value: e.toLowerCase().replace(/\s+/g, "-"), label: e }));

    const religionOptions = [
        "Christianity",
        "Islam",
        "Hinduism",
        "African Traditional Religions",
        "Atheism",
        "Others",
    ].map((r) => ({ value: r, label: r }));

    /* ------- name-field config (label + placeholder together) ------- */
    const nameFields = [
        {
            field: "sirName",
            label: "Surname",
            placeholder: "Enter your surname",
            required: true,
        },
        {
            field: "firstName",
            label: "First Name",
            placeholder: "Enter your first name(s)",
            required: false,
        },
        {
            field: "lastName",
            label: "Other Names",
            placeholder: "Enter your other names",
            required: false,
        },
    ];

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
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                ID/Passport Number (max 9 chars)
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter your ID/Passport number"
                                value={data.idNumber}
                                onChange={(e) =>
                                    handleIdNumberChange(e.target.value)
                                }
                                isInvalid={!!errors.idNumber}
                                maxLength={9}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.idNumber ||
                                    "ID/Passport number must be 9 characters or less"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    {nameFields.map(
                        ({ field, label, placeholder, required }) => (
                            <Col md={4} key={field}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-block mb-2 fw-semibold">
                                        {label}
                                        {required && (
                                            <span className="text-danger">
                                                {" "}
                                                *
                                            </span>
                                        )}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={placeholder}
                                        value={data[field]}
                                        onChange={(e) =>
                                            handleNameChange(
                                                field,
                                                e.target.value,
                                            )
                                        }
                                        isInvalid={!!errors[field]}
                                        required={required}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors[field] ||
                                            "Only alphabets and special characters allowed"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        ),
                    )}

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                Date of Birth
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={data.dob}
                                onChange={(e) => setData("dob", e.target.value)}
                                isInvalid={!!errors.dob}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.dob}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                <BsGenderMale className="me-2" />
                                Sex <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="d-flex gap-4 pt-2">
                                <Form.Check
                                    type="radio"
                                    id="male"
                                    label="Male"
                                    name="sex"
                                    checked={data.sex === "Male"}
                                    onChange={() => setData("sex", "Male")}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    id="female"
                                    label="Female"
                                    name="sex"
                                    checked={data.sex === "Female"}
                                    onChange={() => setData("sex", "Female")}
                                />
                            </div>
                            {errors.sex && (
                                <Form.Text className="text-danger">
                                    {errors.sex}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                Ethnicity
                            </Form.Label>
                            <SelectComponent
                                options={ethnicityOptions}
                                value={
                                    ethnicityOptions.find(
                                        (o) => o.value === data.ethnicity,
                                    ) || null
                                }
                                onChange={(opt) =>
                                    setData("ethnicity", opt?.value || "")
                                }
                                isClearable
                                placeholder="Select Ethnicity"
                                styles={selectStyles}
                            />
                            {errors.ethnicity && (
                                <Form.Text className="text-danger">
                                    {errors.ethnicity}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                SIG Category
                            </Form.Label>
                            {data.dob && (
                                <small className="text-muted d-block mb-1">
                                    Age: {age} years{" "}
                                    {age > 35 &&
                                        "(You MUST be 35 years or below)"}
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
                                            checked={data.membershipCategory.includes(
                                                "Youth",
                                            )}
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
                                    checked={data.membershipCategory.includes(
                                        "Women",
                                    )}
                                    onChange={handleCheckboxChange}
                                    disabled={data.sex === "Male"}
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="pwd"
                                    label="PWD"
                                    value="PWD"
                                    checked={data.membershipCategory.includes(
                                        "PWD",
                                    )}
                                    onChange={handleCheckboxChange}
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="minority"
                                    label="Minority"
                                    value="Minority"
                                    checked={data.membershipCategory.includes(
                                        "Minority",
                                    )}
                                    onChange={handleCheckboxChange}
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="marginalized"
                                    label="Marginalized"
                                    value="Marginalized"
                                    checked={data.membershipCategory.includes(
                                        "Marginalized",
                                    )}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    {data.membershipCategory.includes("PWD") && (
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="d-block mb-2 fw-semibold">
                                    PWD Number
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your PWD number"
                                    value={data.pwdNumber}
                                    onChange={(e) =>
                                        setData("pwdNumber", e.target.value)
                                    }
                                    isInvalid={!!errors.pwdNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.pwdNumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    )}

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                <BsGeoFill className="me-2" />
                                Do you reside in Kenya?{" "}
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <div className="d-flex gap-4 pt-2">
                                <Form.Check
                                    type="radio"
                                    id="resideYes"
                                    label="Yes"
                                    name="resideInKenya"
                                    checked={data.resideInKenya === "Yes"}
                                    onChange={() =>
                                        setData("resideInKenya", "Yes")
                                    }
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    id="resideNo"
                                    label="No"
                                    name="resideInKenya"
                                    checked={data.resideInKenya === "No"}
                                    onChange={() =>
                                        setData("resideInKenya", "No")
                                    }
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    {data.resideInKenya === "No" && (
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="d-block mb-2 fw-semibold">
                                    Country of Residence
                                </Form.Label>
                                <SelectComponent
                                    options={countries}
                                    value={
                                        countries.find(
                                            (o) =>
                                                o.value ===
                                                data.countryOfResidence,
                                        ) || null
                                    }
                                    onChange={(opt) =>
                                        setData(
                                            "countryOfResidence",
                                            opt?.value || "",
                                        )
                                    }
                                    isClearable
                                    placeholder="Select Country"
                                    styles={selectStyles}
                                />
                                {errors.countryOfResidence && (
                                    <Form.Text className="text-danger">
                                        {errors.countryOfResidence}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </Col>
                    )}

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                Religion
                            </Form.Label>
                            <SelectComponent
                                options={religionOptions}
                                value={
                                    religionOptions.find(
                                        (o) => o.value === data.religion,
                                    ) || null
                                }
                                onChange={(opt) =>
                                    setData("religion", opt?.value || "")
                                }
                                isClearable
                                placeholder="Select Religion"
                                styles={selectStyles}
                            />
                            {errors.religion && (
                                <Form.Text className="text-danger">
                                    {errors.religion}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}
