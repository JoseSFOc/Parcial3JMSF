import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBarMain from "./index";
import Home from "../home";
import Profile from "../profile";
import Search from "../search";
import Routes from "../routes";
import Error from "../error";
import Ruta from "../routes/route"
import NewRoute from "../routes/new-route"
import Conversation from "../conversation/index";
import Chat from "../conversation/Chat";
import GraffitiForm from "../graffiti/Form";
import Graffiti from "../graffiti/Graffiti";


const RouterSetup = () => {
    return (
        <Router>
            <NavBarMain/>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route path='/search'>
                    <Search/>
                </Route>
                <Route path='/profile'>
                    <Profile/>
                </Route>
                <Route exact path='/routes'>
                    <Routes/>
                </Route>
                <Route exact path='/new-route'>
                    <NewRoute operation="create"/>
                </Route>
                <Route exact path='/edit-route/:id'>
                    <NewRoute operation="edit"/>
                </Route>
                <Route exact path="/conversations">
                    <Conversation/>
                </Route>
                <Route path="/conversations/:id">
                    <Chat/>
                </Route>
                <Route exact path="/graffitis" children={<GraffitiForm/>}></Route>
                <Route path="/graffitis/:_id" children={<Graffiti/>}></Route>
                <Route path="/routes/:id" children={<Ruta/>}/>
                <Route path="*">
                    <Error/>
                </Route>
            </Switch>
        </Router>
    );
};

export default RouterSetup;
