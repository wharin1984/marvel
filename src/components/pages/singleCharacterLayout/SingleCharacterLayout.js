import { Helmet } from 'react-helmet';
import {Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const SingleCharacterLayout = ({data}) => {

    const {name, description, thumbnail} = data;

    return (
        <>
        <Helmet>
            <meta
            name="description"
            content={`${name} chapter`}
            />
            <title>{name}</title>
        </Helmet>
        <Row>
            <Col xs={12} className="d-flex justify-content-end">
                <Link to="/comics" className="btn btn-primary rounded-0">Back to all</Link>
            </Col>
            <Col xs={12} md={4} lg={3}>
                <img src={thumbnail} alt={name}  className="img-fluid"/>
            </Col>
            <Col xs={12} md={4} lg={9}>
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </Col>
        </Row>
    </>
    )
}

export default SingleCharacterLayout;