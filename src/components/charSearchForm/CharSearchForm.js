import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';


const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const onCharLoader = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoader);
    }


    const errorMessage = process === 'error' ? <div className="text-danger p-1"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="d-flex align-items-center w-100 justify-content-between">
                        <div className="text-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="btn btn-link text-danger">
                            To page
                        </Link>
                    </div> : 
                    <div className="text-danger p-1">
                        The character was not found. Check the name and try again
                    </div>;

    return(
        
        <div className="shadow h-100 p-3 bg-light bg-gradient border rounded-3">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <div className="h6 mb-3">Or find a character by name:</div>
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-9">
                            <Field 
                                id="charName"
                                name="charName"
                                type="text"
                                className='form-control'
                                placeholder='Enter name'
                            />
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 text-center">
                            <button 
                                className='btn btn-primary rounded-0'
                                type="submit"
                                disabled={process === 'loading'}>
                                FIND
                            </button>
                        </div>
                        <div className="col-12">
                            {errorMessage}
                            {results}
                        </div>
                    </div>
                    <FormikErrorMessage component="div" className="text-danger p-1" name="charName" />
                </Form>
            </Formik>
        </div>
    );
}

export default CharSearchForm;