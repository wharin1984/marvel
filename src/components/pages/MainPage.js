import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import RandomChar from '../RandomChar/RandomChar';
import CharList from '../CharList/CharList';
import CharInfo from '../CharInfo/CharInfo';
import CharSearchForm from '../charSearchForm/CharSearchForm';


const MainPage = () => {
    const [selectedChar, setChar] = useState(null);
    const onCharSelected = (id) => {
        setChar(id)
    }
    return(
        <>
            <Helmet>
              <meta
                name="description"
                content="Marvel information portal"
              />
              <title>Marvel information portal</title>
            </Helmet>
            <RandomChar/>
            <div className="char__content">
                <Row className='align-items-start'>
                  <Col xs={12} lg={8}>
                    <CharList onCharSelected={onCharSelected}/>
                  </Col>
                  <Col xs={12} lg={4} className="sidebar">
                    <CharInfo charId={selectedChar}/>
                    <CharSearchForm/>
                  </Col>
                </Row>
            </div>
        </>
    );
}

export default MainPage;