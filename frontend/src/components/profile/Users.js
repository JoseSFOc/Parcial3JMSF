import React, { useState, useEffect } from "react";
import { useFetch } from "../../custom-hooks/useFetch";
import defaultUser from '../../assets/images/defaultUser.jpg';
import editIcon from '../../assets/images/edit.png';
import deleteIcon from '../../assets/images/delete.png';
import { Link } from "react-router-dom";
import UserForm from "./UserEdit";
import {Modal, ModalBody} from 'react-bootstrap';


const url = "https://web2020-api.herokuapp.com/users/";

const Users = () => {


    const [users,setUsers] = useState([]);
    const [modalEditar,setModalEditar]=useState(false);
    const [userSeleccionado,setUserSelected] = useState({
        _id: "",
        rol: "",
        name:"",
        image:"",
        banner:"",
        experience: 0,
    })

    const selectUser = (elemento,caso) =>{
        setUserSelected(elemento);
        (caso === "Editar") && setModalEditar(true);
    }

    const  removeUser = (id) =>{
        fetch(url + id, {
            method: "DELETE",
          })
        
    }

    useEffect(() => {
        fetch(url)
    .then((response) => response.json())
    .then(userList => {
        setUsers(userList);
    });
        
      },[users]);
    
    if(users){
        return(
            <div className ="container">
                <h1>Users</h1>
                <br></br>
                <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Rol</th>
                    <th>Experience</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                
                {users.map((user)=>(
                    
                    <tbody>
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.rol}</td>
                      <td>{user.experience}</td>
                      <td><Link onClick={() => selectUser(user._id,"Editar")} to="/profile"><img src={editIcon} width="40px"/></Link></td>
                      <td><Link onClick={() => removeUser(user._id)} to="/profile"><img src={deleteIcon} width="80px"/></Link></td>
                    </tr> 
                    </tbody>
                ))
                }
                  </table> 
                  <Modal isOpen={modalEditar}>
          
          <div>
            <h3>Editar País</h3>
          </div>
          
        <ModalBody>
                        <UserForm></UserForm>
                        </ModalBody>
                  </Modal>
            </div>
            
        );
    }else{
        return(
            <h1>User not found</h1>
        );
    }
}

export default Users;
