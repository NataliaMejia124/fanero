import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, FormGroup, Row, Col, CardBody, Card, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { UserService } from "../../services/userService";
import profile from "../../assets/images/LogoF_Color.png";
import toastr, { success } from 'toastr'
import { StoreService } from '../../services/storeService';


export default function Contacts(props) {

    const initialValues = {
        Asunto: '',
        Observacion: '',
    }

    const formValidation = Yup.object().shape({
        Asunto: Yup.string().required("requerido"),
        Observacion: Yup.string().required("requerido")
    })

    const user = useSelector(x => x.Login.user);
    const [modalInsertar, setInsertar] = useState(false);
    const storeService = new StoreService();
    const [stores, setStores] = useState([])
    const userService = new UserService();
    const [currentStore, setCurrentStore] = useState()

    useEffect(() => {
        getActiveStores();
    }, [])

    const getActiveStores = async () => {
        const data = await storeService.getActive();
        if (data)
            setStores(data);
    }

    const funIdStore = async (id) => {
        setCurrentStore(id)
        setInsertar(true)
    }

    const onSubmit = async values => {
        console.log(values)
        let request = {
            ...values,
            IdTienda: currentStore,
            IdPersona: user.id,

        }
        try {
            console.log(JSON.stringify(request));
            const response = await userService.sendComment(request);

            toastr.success('Su comentario ha sido enviado con éxito y pronto atenderan su petición.', 'Envío exitoso');
            setInsertar(false)

        } catch (e) {
            toastr.info('No ha sido posible enviar su comentario. Por favor inténtelo más tarde.', 'Advertencia');
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
                            <Card className="" style={{ height: "160vh" }}>
                                <Row className="d-flex justify-content-center pt-4 pb-3">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h3>Enviar comentarios</h3></label>
                                </Row>
                                <Row>
                                    <Col className="col-12 text-center">
                                        <p> ¿Tienes algúna duda o comentario? Comunícate <br></br> con las tiendas de Fanero</p>
                                        <hr></hr>
                                    </Col>
                                </Row>
                                <CardBody className="pt-0 overflow-scroll">
                                    {
                                        stores.map((store, key) => {
                                            return <li className="list-group-item" key={key}    >
                                                <Row>

                                                    <Link to={`/storeProducts/${store.id}`}>
                                                        <img src={store.logo} alt={store.nombre} style={{ height: '60px', width: '60px' }} />
                                                    </Link>

                                                    <Col className="justify-context-left">
                                                        <span className="store-name">{store.nombre}</span> <br></br>
                                                        <span className="text-muted">{store.direccion}</span> <br></br>
                                                        <Button className="text-aling-center p-1 mt-2" onClick={() => funIdStore(store.id)} style={{ height: '25px' }} color="info" ><span>Nuevo comentario</span></Button>{' '}
                                                    </Col>

                                                </Row>
                                            </li>



                                        })
                                    }
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
                        <label htmlFor="asunto" className="control-label m-3">¿Como podemos ayudarte?</label>
                    </h5>
                    <button onClick={() => setInsertar(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Row>
                    <Col className="col-12 text-center">
                        <p className="text-muted m-2"> Contacta con el servicio de asistencia. Se quedará atento
                        a tus solicitudes, consultas y sugerencias. La información enviada se utilizará
                            para mejorar nuestros servicios.</p>
                        <hr></hr>
                    </Col>
                </Row>
                <div className="modal-body">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidation}>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="Asunto" className="control-label">Asunto</label>
                                <Field name="Asunto" id="Asunto" type="text" className="form-control" required placeholder="" />
                                <ErrorMessage name="Asunto" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Observacion" className="control-label">Detalles</label>
                                <Field name="Observacion" id="Observacion" type="text" className="form-control" required placeholder="" />
                                <ErrorMessage name="Observacion" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                            </div>

                            <div className="mt-4">
                                <Row>
                                    <Col>
                                        <button className="btn btn-info btn-block" type="submit" >Enviar</button>
                                    </Col>
                                    <Col>
                                        <button className="btn btn-danger btn-block" onClick={() => setInsertar(false)}> Cancelar </button>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Modal>
        </React.Fragment>

    );

}


// {
//     "IdTTienda": 99,
//     "IdPersona": 438,
//     "Asunto": "prueba1",
//     "Observacion": "funIdStore nada"
// }