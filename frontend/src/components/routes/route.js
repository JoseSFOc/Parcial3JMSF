import {useParams} from 'react-router-dom';
import React from 'react'
import {useFetch} from "../../hooks/useFetch";
import Error from "../error";
import {Form} from "react-bootstrap";
import Comments from "../comment/Comments";

const inicioProd="https://web2020-api.herokuapp.com/";
const inicioDev="http://localhost:3000/";
const inicio=inicioProd;
const inicioUrl = inicio+'routes/';

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

const Route = () => {
    const {id} = useParams();
    const url=inicioUrl+id;
    const {isLoading, data,isError} = useFetch({url,requestOptions});

    if(isError){
        return (
            <>
            <Error/>
            </>
        );
    }

    return (
        <>
            <h1 style={{display: 'flex', justifyContent: 'center',marginTop:"20px"}}>{data.title}</h1>

            <div>
                <h2 style={{display: 'flex', justifyContent: 'center'}}>{isLoading && 'loading...'}</h2>
                <Form as="form" style={{width:"80%",marginLeft: '10%',marginRight:"10%"}}>
                    <Form.Group controlId="title">
                        <Form.Label>Title </Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            maxLength="30"
                            value={data.title}
                            required
                            disabled={true}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            required
                            maxLength="500"
                            value={data.description}
                            disabled={true}
                        />
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>City </Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            required
                            maxLength="30"
                            value={data.city}
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group controlId="selectedGraffitis">
                        <Form.Label>Graffitis</Form.Label><br/>
                        <Form.Control name="selectedGraffitis" as="select" htmlSize={6} disabled={true}
                                      custom>
                            {data.graffitis && data.graffitis.map((graffiti) => {
                                return <option key={graffiti.graffiti_id} value={graffiti.graffiti_id}>{graffiti.title}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <hr style={{marginLeft: '10%',marginRight:"10%"}}/>
                <Comments
                    userName="ElPepe"
                    userId="5fc239bd81249d00176aa6d0"
                    type="Route"
                    typeId={id}/>
                    <br/>
            </div>
        </>
    );
};

export default Route;
