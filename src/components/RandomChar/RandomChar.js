import { useState, useEffect } from 'react';
import {Row, Col, Button, Image} from 'react-bootstrap';
import useMarvelService from '../../services/MarvelService';
import Spinners from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoader = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoader);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinners/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return(
        <>
            <Row className='my-5'>
                <Col xs={12} lg={6}>
                    <div className="shadow h-100 p-3 bg-light bg-gradient border rounded-3">
                        {errorMessage}
                        {spinner}
                        {content}
                    </div>
                </Col>
                <Col xs={12} lg={6}>
                <div className="shadow h-100 p-3 text-white bg-dark bg-gradient rounded-3 bg-block-home">
                    <div className='bg-block-home-text'>
                        <h4>Random character for today! Do you want to get to know him better?</h4>
                        <h5 className='my-4'>Or choose another one</h5>
                        <Button onClick={updateChar} variant="btn-bd-primary rounded-0 me-3">Try it!</Button>
                    </div>
                </div>
                </Col>
            </Row>
        </>
    );
}
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    return (
        
        <Row>
            <Col xs={12} lg={5}>
                <Image fluid src={thumbnail} thumbnail alt={name} />
            </Col>
            <Col xs={12} lg={7}>
                <div className="d-flex flex-column justify-content-between h-100">
                    <h2>{name}</h2>
                    <p>{description ? `${description}`:`no description`}</p>
                    <div className="d-flex">
                        <a href={homepage} className='btn btn-primary btn-bd-primary rounded-0 me-3'>Homepage</a>
                        <a href={wiki} className='btn btn-outline-secondary rounded-0'>WIKI</a>
                    </div>
                </div>
            </Col>
        </Row>
        
    );
}

export default RandomChar;