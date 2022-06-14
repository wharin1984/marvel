import { useState, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Link } from 'react-router-dom';
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

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setnewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setnewItemLoading(false) : setnewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setnewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr){

        const items = arr.map((item, i) => {

            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <CSSTransition key={i} timeout={500} classNames="char__item">
                <Col xs={12} md={4} lg={3}>
                    <Card className='shadow bg-dark text-white item-card'>
                        <Card.Img variant="top" src={item.thumbnail} alt={item.name} style={imgStyle} width={304} height={462}/>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text className="price">
                                {item.price}
                            </Card.Text>
                            <Link
                                to={`/comics/${item.id}`}
                                className="btn btn-primary btn-bd-primary rounded-0">
                                    WIKI
                            </Link>
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

    return(
        <div className="cont-page mb-lg-5 mb-3">
            <Row>
                {setContent(process, () => renderItems(comicsList), newItemLoading)}
                <Col xs={12} className='text-center mt-5'>
                    <Button 
                        variant="btn-bd-primary rounded-0"
                        disabled={newItemLoading}
                        onClick={() => onRequest(offset)}
                        style={{'display': comicsEnded ? 'none' : 'inline-block'}}
                    >load more</Button>
                    
                </Col>
            </Row>
        </div>
    );
}

export default ComicsList;