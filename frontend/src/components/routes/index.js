import React,{useEffect,useState} from 'react'
import {useFetch} from '../../hooks/useFetch'
import {Tab, Tabs, Card, Button, Container, Row, Col} from "react-bootstrap";
import dateFormat from 'dateformat';
import {Link} from "react-router-dom";

const inicioProd = "https://web2020-api.herokuapp.com/";
const inicioDev = "http://localhost:3000/";
const inicio = inicioProd;
const url = inicio + "routes/";

const Routes = () => {
    const {isLoading, data} = useFetch({url});
    localStorage.setItem("idUsuario", "5fc239bd81249d00176aa6d0");

    return (
        <>
            <Button style={{margin: '20px', float: 'right'}} as={Link} to='/new-route' variant="primary">Create New
                Route</Button>
            <h1 style={{float: 'none', margin: '20px', justifyContent: 'center'}}>Routes</h1>
            {/*Aquí irían los filtros*/}
            <Tabs defaultActiveKey="listado" id="uncontrolled-tab-example" >
                <Tab eventKey="listado" title="List">
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>{isLoading && 'loading...'}</h2>
                    {isLoading || <ListRoutes routes={data}/>}
                </Tab>
                <Tab eventKey="mapa" title="Map">
                    <h1>Not Developed</h1>
                </Tab>
            </Tabs>
        </>
    )
}

const ListRoutes = ({routes}) => {
    return (
        <>
            <Container>
                <Row lg={3} className="show-grid">
                    {routes.map((route) => {
                        return <RouteCard key={route._id} route={route}/>
                    })}
                </Row>
            </Container>
        </>
    )
}

const borrarRuta=(idRuta)=>{
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(url+idRuta._id, requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result);    window.location.reload(false);})
        .catch(error => console.log('error', error));

}

const RouteCard = (props) => {
    let {_id, title, author, city, date, description} = props.route;
    return (
        <Col style={{paddingTop: '20px'}}>
            <Card border="primary" style={{width: '18rem'}}>
                {/*  <Card.Header>Header</Card.Header>*/}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{city}</Card.Subtitle>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Button as={Link} operation="read" to={`/routes/${_id}`} variant="primary">Details</Button>
                    {localStorage.getItem("idUsuario") === author.author_id &&
                        <Button as={Link} style={{marginLeft:"20px"}} operation="edit" to={`/edit-route/${_id}`} variant="secondary">Edit</Button>}

                    {localStorage.getItem("idUsuario") === author.author_id &&
                    <Button style={{float:"right"}} onClick={()=>{borrarRuta({_id})}} variant="danger">Delete</Button>}
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted" style={{float: 'left'}}>{author.name}</small>
                    <small className="text-muted" style={{float: 'right'}}>{dateFormat(date, "yyyy-mm-dd")}</small>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default Routes;
