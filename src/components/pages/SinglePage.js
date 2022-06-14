import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { useParams } from 'react-router-dom'
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

            switch (dataType) {
                case 'comic':
                    getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
            }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }



    return(
        <div className="single-comic">
            <AppBanner/>
            {setContent(process, Component, data)}
        </div>
    );
}


export default SinglePage;