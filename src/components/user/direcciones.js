import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, FormGroup, Row, Col, CardBody, Card, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { UserService } from "../../services/userService";
import profile from "../../assets/images/LogoF_Color.png";
import "./direcciones.scss";
import toastr, { success } from 'toastr'
import ModalAddAddress from "./ModalAddAddress";



export default function AddressesUser(props) {

    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const [lista, setLista] = useState([]);
    console.log(user)
    const [modalInsertar, setInsertar] = useState(false);
    const [dirEdit, setDirEdit] = useState();

    const editDirections = (dir) => {
        setInsertar(true);
        setDirEdit(dir);
    }

    const addressSaved = async () => {
        setInsertar(false);
        const lista = await userService.listAddress(user.id);
        setLista(lista)
    }


    useEffect(async () => {
        const lista = await userService.listAddress(user.id);
        setLista(lista)
    }, [])


    const eliminar = async (id) => {

        const dele = await userService.deleteAddress(id);
        if (dele, success) {
            toastr.info("Dirección eliminada");
            const lista = await userService.listAddress(user.id);
            setLista(lista)
        } else {
            toastr.info("No borro");
        }

    }


    return (

        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="bx bx-home h2"></i>
                </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="" style={{ height: "80vh" }}>
                                <Row className="d-flex justify-content-center pt-4 pb-3">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h5> Mis direcciones </h5></label>
                                </Row>
                                <CardBody className="pt-0 overflow-y-scroll">
                                    <div className="p-2">
                                        <Formik>
                                            <Form>
                                                <div className="container-fluid text-center">
                                                    <ul class="list-group">
                                                        {
                                                            lista.length === 0 ?
                                                                <span>No hay direcciones registradas.</span>
                                                                :

                                                                lista.map(c => {
                                                                    return <li className="list-group-item">
                                                                        <Row>

                                                                            {/* <Col className="col-1"><Button>C</Button></Col> */}
                                                                            <input className="mt-4" type="checkbox" id="check" onChange={() => toastr.success("Dirección principal")}></input>

                                                                            <Col>
                                                                                <p className="text-justify" onClick={() => editDirections(c)} >
                                                                                    <b>Alias:</b> {c.referencia}<br></br>
                                                                                    <b>Dirección:</b> {c.nomenclatura}<br></br>
                                                                                    <b>Recible:</b> {c.nombreRecibe}</p>

                                                                            </Col>
                                                                            <Col className="col-1 mt-3">
                                                                                <input onClick={() => eliminar(c.idDireccionPersona)}
                                                                                    className="boton-imagen" type="button" value="  " />
                                                                            </Col>

                                                                        </Row>
                                                                    </li>
                                                                })
                                                        }
                                                    </ul>
                                                </div>
                                                <div className="container text-center py-5 px-5">
                                                    <Row className="row justify-context-center">
                                                        <Col>
                                                            <button className="btn btn-info btn-block waves-effect waves-light" type="button"
                                                                onClick={() => setInsertar(true)}> Ingresa una nueva dirección</button>
                                                        </Col>
                                                    </Row>

                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal isOpen={modalInsertar}>
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="mySmallModalLabel" >
                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                        <label htmlFor="Nomenclatura" className="control-label m-3">Crear Dirección</label>
                    </h5>
                    <button onClick={() => setInsertar(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <ModalAddAddress addressSaved={addressSaved} />

                </div>
            </Modal>
        </React.Fragment>

    );

}

// los datos se van a :{{url}}/NomenclaturaPersona/AgregarNomenclaturaPersona
// {
//     "Id": 0,
//     "IdPersona": 429,
//     "Barrio": null,
//     "EsPrincipal": "No",
//     "Latitud": "",
//     "Longitud": "",
//     "NombreRecible": "Carla m",
//     "Referencia": "Cerca ms",
//     "Telefono": "7202202",
//     "UserId": "429",
//     "DateRegister": "2020-01-01T00:00:00",
//     "Nomenclatura": "calle 26-98",
//     "TipoIdRecibe": null,
//     "NumDocRecibe": null
// }