import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

const SingleComicLayout = ({data}) => {

    const {title, description, pageCount, thumbnail, language, price} = data;

    return (
        <>
            <Helmet>
              <meta
                name="description"
                content={`${title} comics book`}
              />
              <title>{title}</title>
            </Helmet>
            <Row>
                <Col xs={12} className="d-flex justify-content-end">
                    <Link to="/comics" className="btn btn-primary rounded-0">Back to all</Link>
                </Col>
                <Col xs={12} md={4} lg={3}>
                    <img src={thumbnail} alt={title}  className="img-fluid"/>
                </Col>
                <Col xs={12} md={4} lg={9}>
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language:{language}</p>
                    <div className="single-comic__price h3">{price}</div>
                </Col>
            </Row>
        </>
    )
}

export default SingleComicLayout;