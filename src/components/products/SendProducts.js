import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, FormGroup, Row, Col, CardBody, Card, Container, Label, Input } from "reactstrap";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { UserService } from "../../services/userService";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import toastr, { success } from 'toastr'
import { useParams } from 'react-router-dom';
import { Button } from "bootstrap";
import ModalAddAddress from "../user/ModalAddAddress";
import { SelectionState } from "draft-js";

export default function SendProducts(props) {
    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const storeService = new StoreService();
    const [lista, setLista] = useState([]);
    const [site, setSite] = useState([]);
    const params = useParams();
    const [modalInsertar, setInsertar] = useState(false);
    const [establishment, setEstablishment] = useState(false);
    const location = useLocation();
    const cart = useSelector(store => store.cart.countercart);
    const productsByStore = cart.filter(store => store.idStore == params.id)
    const [addressId, setAddressId] = useState()
    const [area, setArea] = useState()
    const history = useHistory();


    let initialValues = {
        "idPersona": user.id,
        "idTienda": parseInt(params.id),
        "fecha": "2021-03-11T10:45:37.333089-05:00",
        "observacion": '',
        "total": productsByStore.reduce((a, b) => { return a + b.price * b.count }, 0),
        "tipoPago": "",
        "totalEnvio": 0,
        "userId": `${user.id}`,
        "TipoEntrega": "Envio",
        "dateRegister": "2021-03-11T10:45:37.333089-05:00",
        "productosPorOrden": productsByStore.map((x) => {
            return {
                "IdProducto": x.id,
                "Referencia": x.Referencia,
                "ValorUnitario": x.price,
                "CantidadComprada": x.count,
                "Iva": x.Iva,
                "Descuento": x.Descuento,
                "IdTienda": x.idStore
            }
        }),
        "CountyId": "001",
        "StateId": "52",
        "Municipio": "Pasto (Nariño)"

    }

    const getSite = async () => {
        const data = await storeService.getSite(params.id);
        if (data)
            setSite(data);
        console.log(data);
    }

    const addressSaved = async () => {
        setInsertar(false);
        const lista = await userService.listAddress(user.id);
        setLista(lista)
        console.log(lista)

    }

    const [productsToBuy, setProductsToBuy] = useState()
    useEffect(() => {
        getSite()
        addressSaved()
        console.log(productsByStore)
        setProductsToBuy(location.state?.productos)
        console.log(location.state?.productos)
    }, [])


    const [name, setName] = useState([])

    const getValue = (e) => {
        let data = e.nomenclatura;
        let id = e.idDireccionPersona;
        setName(data)
        setAddressId(id)
        console.log(e)

    }

    const onSubmit = async values => {
        console.log(values)
        const ivaTotal = productsByStore.reduce((a, b) => { return a + (b.count * b.Iva) }, 0);
        let request = {
            ...values,
            idDireccion: addressId,
            observacion: area || "Sin observaciones",
            iva: ivaTotal,
            subTotal: productsByStore.reduce((a, b) => { return a + b.price * b.count }, 0) - ivaTotal

        }
        console.log(request)
        console.log(JSON.stringify(request))
        try {
            console.log(JSON.stringify(request));
            const response = await userService.addOrder(request);
            toastr.success("orden agregada exitosamente");
            console.log(response.idOrden)
            console.log(response.valorDomicilio)
            history.push({
                pathname: `/PayMethod/${response.idOrden}`,
                state: {
                    addressChecked: name,
                    paramId: params.id,
                    productsToBuy: productsToBuy
                }
            })
        }
        catch {
            toastr.info("pailax no se creo la orden");
        }

    }

    return (

        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="bx bx-home h2"></i>
                </Link>
            </div>
            <div className="account-pages mt-5 mb-1 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="" style={{ height: "110vh" }}>
                                <Row className="d-flex justify-content-center pt-4 pb-3">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h5> Envió Productos </h5></label>
                                </Row>
                                <CardBody>
                                    <div className="p-2">
                                        {
                                            site.estado
                                                ?
                                                <Label><input className="mb-4" type="checkbox" id="checkE" checked={establishment}
                                                    onChange={() => setEstablishment(!establishment)}></input> Pedir en establecimiento</Label>
                                                :
                                                <div></div>

                                        }
                                        {
                                            establishment
                                                ?
                                                <div>
                                                    <h6>Pedido en establecimiento</h6>
                                                    <hr></hr>
                                                    <div className="text-aling-center mb-3">
                                                        <p>Su orden será entregada en el establecimiento de {site.nombreTienda}.
                                                        por favor indique su número de mesa:</p>
                                                        <span>No. </span> <input type="text"></input>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <h6>Escoge una dirección</h6>
                                                    <hr></hr>
                                                    <div className=" mt-3 overflow-y-scroll" style={{ height: "20vh" }}>
                                                        <ul className="list-group">
                                                            {
                                                                lista.map((c, key) => {
                                                                    return <li className="list-group-item" key={key}>
                                                                        <Row>
                                                                            <Col md={12}>
                                                                                <Label for='checkAddress'>
                                                                                    <input className="mt-4" type="radio" name="checkAddress" value={c}
                                                                                        onClick={() => getValue(c)}></input>
                                                                                    {c.referencia} ({c.nomenclatura})
                                                                                </Label>
                                                                            </Col>
                                                                        </Row>
                                                                    </li>
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                    <Row className="m-4">
                                                        <u style={{ color: '#47BFC0' }}><span onClick={() => setInsertar(true)} style={{ color: '#47BFC0' }}> Agregar otra dirección</span></u>
                                                    </Row>
                                                </div>
                                        }

                                        <Row className="ml-4">
                                            <Label>Ciudad: Pasto(Nariño)</Label>
                                        </Row>
                                        <Row className="m-4">
                                            <h6>Descripción de la orden</h6>
                                            <hr></hr>
                                            <p><textarea onChange={(e) => setArea(e.target.value)} name="Descripcion orden" cols="50" rows="5"
                                                placeholder="Escribe aquí las instrucciones, sugerencias y observaciones de tu pedido"></textarea></p>
                                        </Row>

                                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                            <Form>
                                                <div>
                                                    <button className="boton3-fanero btn-block text-center" type="submit">Ir a pagar</button>
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

