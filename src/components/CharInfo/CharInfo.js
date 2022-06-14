import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, ListGroup, Image, Button} from 'react-bootstrap';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoader)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoader = (char) => {
        setChar(char);
    }

    

    return (
        <>
        <div className='shadow h-100 p-3 bg-light bg-gradient border rounded-3 mb-lg-5 mb-3'>
            {setContent(process, View, char)}
        </div>
        </>
    );
    
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return (
        
        <>
            <Row className='mb-3'>
                <Col xs={12} md={4} lg={5}>
                    <Image fluid src={thumbnail} alt={name} style={imgStyle} width={150} height={150}/>
                </Col>
                <Col xs={12} md={8} lg={7}>
                    <div className="">
                        <h4 className='mb-3'>{name}</h4>
                        <div className="d-grid gap-2">
                            <Button href={homepage} variant="btn-bd-primary rounded-0">Homepage</Button>
                            <Button href={wiki} variant="btn btn-outline-secondary rounded-0">WIKI</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <p>{description}</p>
            <h4 className='mb-3'>Comics</h4>
            <ListGroup variant="flush">
                {comics.length > 0 ? null : "There is not comicks with this character."}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <ListGroup.Item key={i} className='shadow mb-2'>
                                <a href={item.resourceURI} className="btn btn-link">{item.name}</a>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </>
        
    );
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;