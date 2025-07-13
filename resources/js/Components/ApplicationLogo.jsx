import { Image } from "react-bootstrap";

export default function ApplicationLogo(props) {
    return (
        <Image
            src="/storage/images/logo/logo.png"
            className="brand-logo rounded-circle me-2"
            alt="Party logo"
        />
    );
}
