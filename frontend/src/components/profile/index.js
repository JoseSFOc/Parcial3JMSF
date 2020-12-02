import React, { useState, useEffect } from "react";
import { useFetch } from "../../custom-hooks/useFetch";
import defaultUser from '../../assets/images/defaultUser.jpg';
import editIcon from '../../assets/images/edit.png';
import deleteIcon from '../../assets/images/delete.png';
import { Link } from "react-router-dom";
import UserEdit from "./UserEdit";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './profile.css';


const url = "https://web2020-api.herokuapp.com/users/";

const UserList = () => {


    const [users, setUsers] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [userSeleccionado, setUserSelected] = useState({
        _id: "",
        rol: "",
        name: "",
        image: "",
        banner: "",
        experience: 0,
    })

    const options = [
        'user', 'admin', 'artist'
    ];
    const defaultOption = options[0];

    const selectUser = (elemento, caso) => {
        setUserSelected(elemento);
        (caso === "Editar") && setModalEditar(true);
    }

    const removeUser = (id) => {
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

    }, [users]);

    const handleChange = e => {
        const { name, value } = e.target;
        setUserSelected((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const editar = () => {
        var dataNueva = users;
        dataNueva.map(user => {
            if (user.id === userSeleccionado.id) {
                user.rol = userSeleccionado.rol;
                user.name = userSeleccionado.name;
                user.experience = userSeleccionado.experience;
                updateUser(user);
            }
        });
        setUsers(dataNueva);
        setModalEditar(false);
    }
    const updateUser = async (user) => {
        console.log(JSON.stringify(user));
        const response = await fetch(url + user._id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            redirect: "follow",
        });
        console.log(response);
    };

    const abrirModalInsertar = () => {
        setUserSelected(null);
        setModalInsertar(true);
    }

    const insertar = () => {
        createUser(userSeleccionado);
        setModalInsertar(false);
    }

    const createUser = async (user) => {
        console.log(JSON.stringify(user));
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            redirect: "follow",
        });
        console.log(response);
    };

    if (users) {
        return (
            <div className="container">
                <h1>Users</h1>
                <br></br>
                <table className="table">
                    <thead >
                        <tr style={{textAlign: "center"}}>
                            <th className="justify-content-center">ID</th>
                            <th className="justify-content-center">Name</th>
                            <th className="justify-content-center">Rol</th>
                            <th className="justify-content-center">Experience</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    {users.map((user) => (

                        <tbody>
                            <tr key={user._id} style={{textAlign: "center"}}>
                                <td className="align-middle">{user._id}</td>
                                <td className="align-middle">{user.name}</td>
                                <td className="align-middle">{user.rol}</td>
                                <td className="align-middle">{user.experience}</td>
                                <td className="align-middle"><Link onClick={() => selectUser(user, "Editar")}><img src={editIcon} width="40px" /></Link></td>
                                <td className="align-middle"><Link onClick={() => removeUser(user._id)} to="/profile"><img src={deleteIcon} width="80px" /></Link></td>
                            </tr>
                        </tbody>
                    ))
                    }

                </table>
                <button class="botonF1" onClick={() => abrirModalInsertar()}>
                    <span>+</span>
                </button>

                <Modal isOpen={modalEditar}>
                    <ModalHeader>
                        <div>
                            <h3>User edit</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>ID</label>
                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                name="_id"
                                value={userSeleccionado && userSeleccionado._id}
                            />
                            <br />

                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={userSeleccionado && userSeleccionado.name}
                                onChange={handleChange}
                            />
                            <br />

                            <label>Rol</label>
                            <Dropdown options={options} value={defaultOption} placeholder="Select a rol" />
            <br />
                            <label>Experience</label>
                            <input
                                className="form-control"
                                type="number"
                                name="experience"
                                value={userSeleccionado && userSeleccionado.experience}
                                onChange={handleChange}
                            />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => editar()}>
                            Edit
          </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => setModalEditar(false)}
                        >
                            Cancel
          </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalInsertar}>
                    <ModalHeader>
                        <div>
                            <h3>Insert User</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={userSeleccionado ? userSeleccionado.name : ''}
                                onChange={handleChange}
                            />
                            <br />

                            <label>Rol</label>
                            <Dropdown options={options} value={defaultOption} placeholder="Select a rol" />
                            <br />
                            <label>Experience</label>
                            <input
                                className="form-control"
                                type="number"
                                name="experience"
                                value={userSeleccionado && userSeleccionado.experience}
                                onChange={handleChange}
                            />
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary"
                            onClick={() => insertar()}>
                            Insert
          </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => setModalInsertar(false)}
                        >
                            Cancel
          </button>
                    </ModalFooter>
                </Modal>

            </div>

        );
    } else {
        return (
            <h1>User not found</h1>
        );
    }
}

export default UserList;
