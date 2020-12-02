import React, {useState, useEffect} from "react";
import './Chat.css'
import Button from "react-bootstrap/Button";
import {ListGroup, Container, Row, Col, Form} from "react-bootstrap";
import {useParams} from 'react-router-dom';
const localBaseUrl = 'http://localhost:3030/conversations'; //local
const remotbaseUrl = 'https://web2020-api.herokuapp.com/conversations'

const Chat = () => {
    const {id} = useParams();
    const url = remotbaseUrl+"/"+id;
    //console.log(url);
    const [input, setInput] = useState("");
    const [chat, setChat] = useState({
        users : [
            {
                _id: '',
                nickname: ''
            },
            {
                _id: '',
                nickname: ''
            }
        ],
        messages : []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        if(input){
            sendMessage();
        }
    }


    const getChat = async () => {
        fetch(url)
            .then((res)=>res.json())
            .then((chat)=>setChat(chat))
            .catch((e)=>console.log(e));
    };

    useEffect(()=>{
        getChat(); //fetch data
    }, []);

    //MANDAR MENSAJE
    const sendMessage = async () => {
        const sendUrl = remotbaseUrl +"/"+ id + '/send';
        console.log(sendUrl);
        await fetch(sendUrl, {
            method : "POST",
            body : JSON.stringify({
                message : input,
                user: chat.users[0]._id
            }),
            headers: {
                "Content-type": "application/json"
            },
            redirect: "follow"
        });
        setInput("");
        getChat();
    }

    return (
        <>
            <Container>
                <Row>

                </Row>
                <Row>
                    <Col>
                        <h4>
                            Conversation between<br/>
                            {chat.users[0].nickname} and {chat.users[1].nickname}
                        </h4>
                    </Col>
                </Row>
                <Row>
                    {chat.messages.length === 0 ?
                        <h3>There are no messages yet... say something nice!</h3>
                        :
                        <ListGroup>
                            {chat.messages.map((message)=>{
                                return (
                                    <ListGroup.Item>
                                        Sent by : {message.user}<br/>
                                        {message.message}<br/>
                                        Date: {message.date}
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                    }
                </Row>

                <Row>
                    <Form>
                        <Form.Group>
                            <Form.Control name = "input" type="text" value = {input}
                                          placeholder="write something nice"
                                          onChange ={(e)=>{setInput(e.target.value);}}/>
                        </Form.Group>
                        <Button variant = "info" onClick={handleSubmit} type = "submit">
                            Send
                        </Button>
                    </Form>
                </Row>
            </Container>
        </>
        
    )
}

export default Chat;