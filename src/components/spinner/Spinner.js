import { Spinner } from "react-bootstrap"

const Spinners = () => {
    return(
        <div className="my-spinner">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Spinners;