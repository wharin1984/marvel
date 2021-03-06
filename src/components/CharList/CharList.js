import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Row, Col, Card, Button} from 'react-bootstrap';
import useMarvelService from '../../services/MarvelService';
import Spinners from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinners/>;
        case 'error':
            return <ErrorMessage/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinners/>;
        case 'confirmed':
            return <Component/>;
        default:
            throw new Error ('Unexpected process state');
    }
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(310);
    const [charEnded, setCharEnded] = useState(false);
    
    
    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9){
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    const activeOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('active'));
        itemRefs.current[id].classList.add('active');
    }

    function renderItems(arr){

        const items = arr.map((item, i) => {

            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <CSSTransition  timeout={500} classNames="char__item" key={item.id}>
                    <Col xs={12} md={6} lg={4}>
                        <Card className='shadow bg-dark text-white item-card' ref={el => itemRefs.current[i] = el} >
                            <Card.Img variant="top" src={item.thumbnail} alt={item.name} style={imgStyle} width={268} height={268}/>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <button 
                                    onClick={() => {
                                        props.onCharSelected(item.id);
                                        activeOnItem(i);
                                    }} 
                                    className="btn btn-primary btn-bd-primary rounded-0">
                                        WIKI
                                </button>
                            </Card.Body>
                        </Card>
                    </Col>
                </CSSTransition>
            )
        });
        return (
            <TransitionGroup component={null}>{items}</TransitionGroup>
        )
    }
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
    }, [process])
    return(
        <Row>
            {elements}
            <Col xs={12} className='text-center mt-5'>
                <Button 
                    variant="btn-bd-primary rounded-0"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'inline-block'}}
                >load more</Button>
                
            </Col>
        </Row>
    )
}

CharList.propTypes = {
    onCharSelected:PropTypes.func.isRequired
}
export default CharList;