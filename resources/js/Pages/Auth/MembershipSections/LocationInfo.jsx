import { Form, Row, Col, FloatingLabel, Spinner, } from 'react-bootstrap';
import { BsGeoFill, } from 'react-icons/bs';

export default function LocationInformation({
    data,
    setData,
    errors,
    counties,
    constituencies,
    wards,
    locationLoading,
    handleCountyChange,
    handleConstituencyChange
}) {
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
                        <FloatingLabel controlId="county" label="County" className="mb-3">
                            <Form.Select
                                value={data.county}
                                onChange={(e) => handleCountyChange(e.target.value)}
                                isInvalid={!!errors.county}
                                required
                                disabled={locationLoading.counties}
                            >
                                <option value="">Select County</option>
                                {counties.map(county => (
                                    <option key={county.id} value={county.id}>
                                        {county.county_name}
                                    </option>
                                ))}
                            </Form.Select>
                            {locationLoading.counties && (
                                <div className="position-absolute end-0 top-0 mt-3 me-3">
                                    <Spinner animation="border" size="sm" />
                                </div>
                            )}
                            <Form.Control.Feedback type="invalid">
                                {errors.county}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <FloatingLabel controlId="constituency" label="Constituency" className="mb-3">
                            <Form.Select
                                value={data.constituency}
                                onChange={(e) => handleConstituencyChange(e.target.value)}
                                isInvalid={!!errors.constituency}
                                required
                                disabled={!data.county || locationLoading.constituencies}
                            >
                                <option value="">Select Constituency</option>
                                {constituencies.map(constituency => (
                                    <option key={constituency.id} value={constituency.id}>
                                        {constituency.constituency_name}
                                    </option>
                                ))}
                            </Form.Select>
                            {locationLoading.constituencies && (
                                <div className="position-absolute end-0 top-0 mt-3 me-3">
                                    <Spinner animation="border" size="sm" />
                                </div>
                            )}
                            <Form.Control.Feedback type="invalid">
                                {errors.constituency}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col md={4}>
                        <FloatingLabel controlId="ward" label="Ward" className="mb-3">
                            <Form.Select
                                value={data.ward}
                                onChange={(e) => setData('ward', e.target.value)}
                                isInvalid={!!errors.ward}
                                required
                                disabled={!data.constituency || locationLoading.wards}
                            >
                                <option value="">Select Ward</option>
                                {wards.map(ward => (
                                    <option key={ward.id} value={ward.id}>
                                        {ward.ward_name}
                                    </option>
                                ))}
                            </Form.Select>
                            {locationLoading.wards && (
                                <div className="position-absolute end-0 top-0 mt-3 me-3">
                                    <Spinner animation="border" size="sm" />
                                </div>
                            )}
                            <Form.Control.Feedback type="invalid">
                                {errors.ward}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}
