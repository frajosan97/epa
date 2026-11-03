import { Form, Row, Col, Spinner } from "react-bootstrap";
import { BsGeoFill } from "react-icons/bs";

export default function LocationInformation({
    data,
    errors,
    counties,
    constituencies,
    wards,
    selectedCounty,
    selectedConstituency,
    selectedWard,
    locationLoading,
    handleCountyChange,
    handleConstituencyChange,
    handleWardChange,
    SelectComponent,
    selectStyles,
}) {
    const loadingCounties = locationLoading?.counties;
    const loadingConstituencies = locationLoading?.constituencies;
    const loadingWards = locationLoading?.wards;

    return (
        <Col md={12} className="section-frame location-information mb-5">
            <div className="title">
                <span>
                    <BsGeoFill className="me-2" />
                    Location Information
                </span>
            </div>

            <div className="p-3">
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                County
                            </Form.Label>
                            <div className="position-relative">
                                <SelectComponent
                                    options={counties}
                                    value={selectedCounty}
                                    onChange={handleCountyChange}
                                    isLoading={loadingCounties}
                                    isClearable
                                    placeholder="Select County"
                                    styles={selectStyles}
                                />
                                {loadingCounties && (
                                    <div className="position-absolute end-0 top-50 translate-middle-y me-5 pe-4">
                                        <Spinner animation="border" size="sm" />
                                    </div>
                                )}
                            </div>
                            {errors.county && (
                                <Form.Text className="text-danger">
                                    {errors.county}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                Constituency
                            </Form.Label>
                            <SelectComponent
                                options={constituencies}
                                value={selectedConstituency}
                                onChange={handleConstituencyChange}
                                isDisabled={
                                    !data.county || loadingConstituencies
                                }
                                isLoading={loadingConstituencies}
                                isClearable
                                placeholder={
                                    data.county
                                        ? "Select Constituency"
                                        : "Select county first"
                                }
                                styles={selectStyles}
                            />
                            {errors.constituency && (
                                <Form.Text className="text-danger">
                                    {errors.constituency}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label className="d-block mb-2 fw-semibold">
                                Ward
                            </Form.Label>
                            <SelectComponent
                                options={wards}
                                value={selectedWard}
                                onChange={handleWardChange}
                                isDisabled={!data.constituency || loadingWards}
                                isLoading={loadingWards}
                                isClearable
                                placeholder={
                                    data.constituency
                                        ? "Select Ward"
                                        : "Select constituency first"
                                }
                                styles={selectStyles}
                            />
                            {errors.ward && (
                                <Form.Text className="text-danger">
                                    {errors.ward}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}
