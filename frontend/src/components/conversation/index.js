import React, {useEffect, useState} from 'react';
import Chat from './Chat'

import {ListGroup, Button, Form, Container, Row, Col} from "react-bootstrap";
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Link} from "react-router-dom";

const remotebaseUrl = 'https://web2020-api.herokuapp.com/conversations'; //remote
const localbaseUrl = 'http://localhost:3030/conversations'; //local

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [conversation, setConversation] = useState({
        user0Id: '',
        user0nickname: '',
        user1Id: '',
        user1nickname : ''
    });

    const removeConversation = async (id) =>{
        const url =  remotebaseUrl+"/"+ id;
        await fetch(url, {method : "DELETE"});
        getConversations();
    }

    const handleChange= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setConversation({...conversation, [name]:value });
        //console.log(conversation);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(conversation.user0nickname && conversation.user0nickname
        && conversation.user1Id && conversation.user1nickname){
            createConversation();
        }
    }

    const createConversation = async () => {
        const url = remotebaseUrl;
        console.log(conversation);
        await fetch(url, {
            method : "POST",
            body : JSON.stringify({
                users: [
                    {
                        _id: conversation.user0Id,
                        nickname: conversation.user0nickname
                    },
                    {
                        _id: conversation.user1Id,
                        nickname: conversation.user1nickname
                    }
                ]
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            redirect: "follow"
        });
        setConversation({
            user0Id: '',
            user0nickname: '',
            user1Id: '',
            user1nickname : ''
        });
        getConversations();
    }

    const getConversations = async () => {
        try {
            const res = await fetch(remotebaseUrl);
            const conversations = await res.json();
            //console.log(conversations);
            setConversations(conversations);
        }catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        getConversations(); //fetch data
    }, []);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <h1>Create a conversation</h1>
                        </Row>
                        <Row>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId = "firstUser">
                                            <Form.Label>First user id</Form.Label>
                                            <Form.Control name = "user0Id" type="text" value = {conversation.user0Id}
                                                          onChange ={handleChange}/>
                                            <Form.Label>First user nickname</Form.Label>
                                            <Form.Control name = "user0nickname" type="text" value = {conversation.user0nickname}
                                                          onChange ={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId = "secondUser">
                                            <Form.Label>Second user id</Form.Label>
                                            <Form.Control name = "user1Id" type="text" value = {conversation.user1Id}
                                                          onChange ={handleChange}/>
                                            <Form.Label>Second user nickname</Form.Label>
                                            <Form.Control name = "user1nickname" type="text" value = {conversation.user1nickname}
                                                          onChange ={handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button variant = "primary" type = "submit" onClick ={handleSubmit}>
                                        Create
                                    </Button>
                                </Row>
                            </Form>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <h3>Conversations</h3>
                        </Row>
                        <Row>
                            <ListGroup>
                                {conversations.map((conversation)=>{
                                    const {_id, last_updated, users, messages} = conversation;
                                    return (
                                        <ListGroup.Item key = {_id}>
                                            <Link to = {`/conversations/${_id}`}>
                                                {users[0].nickname} and {users[1].nickname}
                                            </Link>
                                            <Button variant = "danger" onClick ={()=>removeConversation(_id)}>
                                                Delete
                                            </Button>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
/*
const Conversation = (conversation)=>{
    const alertClick = () =>{
        alert(conversation.id + " " +
            conversation.users[0].nickname
            + conversation.users[1].nickname);
    }

}*/
export default Conversations;