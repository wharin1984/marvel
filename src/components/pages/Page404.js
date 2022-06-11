import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Row, Col} from 'react-bootstrap';
import img404 from '../../resources/img/404.png';

const Page404 = () => {
    return(
        <>
            <Helmet>
              <meta
                name="description"
                content="Page error"
              />
              <title>404 Page error</title>
            </Helmet>

            <div className="page-404 mt-5">
                <Row className="align-items-center">
                    <Col xs={12} md={6} lg={6}>
                        <img src={img404} alt="" className="img-fluid" />
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                        <div className="">
                            <h2>404 PAGE NOT FOUND</h2>
                            <p>Intrinsicly benchmark seamless solutions without sticky web services. Rapidiously optimize integrated quality vectors before strategic schemas. Efficiently matrix low-risk high-yield e-commerce before enterprise innovation. Competently.</p>
                            <Link to="/" className="btn btn-primary btn-bd-primary rounded-0">go to HomePage</Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default Page404;