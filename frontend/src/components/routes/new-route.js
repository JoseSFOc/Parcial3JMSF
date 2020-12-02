import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Row, Container, Form, Col, Button} from "react-bootstrap";
import {useFetch} from "../../hooks/useFetch";
import Comments from "../comment/Comments";

const inicioProd = "https://web2020-api.herokuapp.com/";
const inicioDev = "http://localhost:3000/";
const inicio = inicioProd;
const url = inicio + "graffitis/";
const url2 = inicio + "routes/";

const addGraffiti = (idGraffiti, idRuta) => {
    console.log(idRuta)

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(idGraffiti)

    let ruta = url2 + idRuta + "/graffitis";
    fetch(ruta, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({"graffitiId": idGraffiti}),
        redirect: 'follow'
    }).then((res) => {
        console.log(res);
        return res.json()
    });
};

const createRoute = (route, selected) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(url2, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(route),
        redirect: "follow",
    }).then((res) => {
        console.log(res)
        return res.json();
    }).then((data) => {
        borrarTodosGraffitis(data._id).then(() => {
            selected.map((s) => {
                addGraffiti(s.id, data._id);
            })
        });
    }).catch();
};

const editRoute = (route, selected, idRuta) => {
    let enlace = url2 + "" + idRuta;

    fetch(enlace, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(route),
        redirect: "follow"
    }).then((res) => {
        console.log(res)
        return res.json();
    }).then((data) => {
        borrarTodosGraffitis(idRuta).then(() => {
            selected.map((s) => {
                addGraffiti(s.id, idRuta);
            })
        });
    }).catch();
};


const borrarTodosGraffitis = async (idRuta) => {
    let ruta = url2 + idRuta + "/graffitis";
    await fetch(ruta, {
        method: 'DELETE',
        redirect: 'follow'
    });
};

const NewRoute = (props) => {
    const {data} = useFetch({url});
    const {id} = useParams();
    const [route, setRoute] = useState({title: "", description: "", city: "", author: {}});
    const [goToList, setGoToList] = useState(false);
    const [selected, setSelected] = useState([]);
    const [tituloAnterior, setTituloAnterior] = useState([]);

    const {register, formState} = useForm({
        mode: "onChange",
    });

    const getDatosRuta = async () => {
        const requestGET = {
            method: 'GET',
            redirect: 'follow'
        };
        console.log(id)
        let ruta = url2 + "" + id;
        const response = await fetch(ruta, requestGET);
        const r = await response.json();
        setTituloAnterior(r.title);

        r.graffitis.map((g) => {
            selected.push({id: g.graffiti_id, title: g.title});
        })

        setSelected(selected);

        setRoute(r);
    };

    useEffect(() => {
        console.log(props.operation);
        if (props.operation === "edit") {
            getDatosRuta();
        }

        console.log(props.operation);
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (props.operation === "create") {
            const author = {author_id: localStorage.getItem("idUsuario")};
            const newRoute = {...route, author};
            createRoute(newRoute, selected);
        } else if (props.operation === "edit") {
            console.log(id);
            editRoute(route, selected, id);
        }
        setTimeout(() => {
            setGoToList(true)
        }, 500);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        e.preventDefault();

        if (name === "allGraffitis") {
            const g = selected.filter((g) => g.id === value);
            if (g.length === 0) {
                let index = e.nativeEvent.target.selectedIndex;
                let text = e.nativeEvent.target[index].text; // nombre del graffiti
                const newLabel = {id: value, title: text};
                selected.push(newLabel)
                setSelected(selected);
            }
        }
        if (name === "selectedGraffitis") {
            const n = selected.filter((g) => g.id !== value);
            setSelected(n);
        }
        setRoute({...route, [name]: value});
    };

    if (goToList) {
        return <Redirect to='/routes'/>
    }

    return (
        <Container>
            <br/>
            {props.operation === "edit" && <h1>Edit Route: {tituloAnterior}</h1>}
            {props.operation === "create" && <h1>Create a Route</h1>}


            <br/>
            <br/>
            <Form as="form" onSubmit={onSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        maxLength="30"
                        value={route.title}
                        required
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        required
                        maxLength="500"
                        value={route.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        required
                        maxLength="30"
                        value={route.city}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Row>
                    <Col> <Form.Group controlId="allGraffitis">
                        <Form.Label>All Graffitis</Form.Label><br/>
                        <Form.Control as="select" name="allGraffitis" onChange={handleChange} htmlSize={6} custom>
                            {data.map((graffiti) => {
                                return <option key={graffiti._id} value={graffiti._id}>{graffiti.title}</option>;
                            })}
                        </Form.Control>
                    </Form.Group></Col>
                    <Col>
                        <Form.Group controlId="selectedGraffitis">
                            <Form.Label>Selected Graffitis</Form.Label><br/>
                            <Form.Control name="selectedGraffitis" as="select" htmlSize={6} onChange={handleChange}
                                          custom>
                                {selected.map((graffiti) => {
                                    return <option key={graffiti.id} value={graffiti.id}>{graffiti.title}</option>;
                                })}
                            </Form.Control>
                        </Form.Group></Col>
                </Row>

                <Button
                    style={{marginBottom: "2rem"}}
                    variant="primary"
                    disabled={!formState.isValid}
                    onClick={onSubmit}
                >
                    {props.operation === "edit" && "Save"}
                    {props.operation === "create" && "Create"}
                </Button>
            </Form>
        </Container>
    );
};
export default NewRoute;
