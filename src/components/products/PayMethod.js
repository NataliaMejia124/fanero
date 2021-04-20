import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Modal, FormGroup, Row, Col, CardBody, Card, Container, Label, Input } from "reactstrap";
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { UserService } from "../../services/userService";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import credito from "./credito.png"
import efectivo from "./efectivo.png"
import pse from "./pse.png"
import { StoreService } from '../../services/storeService';
import toastr, { success } from 'toastr'
import { useParams } from 'react-router-dom';
import CreditCard from "./CreditCard";
import PSE from "./PSE";
import Cash from "./Cash";
import { registerVersion } from "firebase";

export default function PayMethod(props) {

    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const storeService = new StoreService();
    const params = useParams();
    const cart = useSelector(store => store.cart.countercart);
    const [modalTarjeta, setTarjeta] = useState(false);
    const [modalPse, setPse] = useState(false);
    const [modalCash, setCash] = useState(false);
    const location = useLocation();
    const [direcc, setDirecc] = useState()
    const [paramid, setParamid] = useState()
    const productsByStore = cart.filter(store => store.idStore == paramid)
    const [firstCheck, setFirstCheck] = useState(false)
    const [secondCheck, setSecondCheck] = useState(false)
    const [detail, setDetail] = useState([]);
    const [ref, setRef] = useState([]);

    const ordersSaved = async () => {
        const data = await userService.getOrders(user.id);
        const filtro = data.filter(x => x.id == parseInt(params.id));
        setDetail(filtro)
    }

    // console.log(location)
    useEffect(() => {
        ordersSaved()
        setDirecc(location.state?.addressChecked)
        setParamid(location.state?.paramId)
        setRef(location.state?.productsToBuy)

    }, [])


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
                            <Card className="" style={{ height: "95vh" }}>
                                <Row className="d-flex justify-content-center pt-4 pb-3">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h5> Pago </h5></label>
                                </Row>
                                <CardBody>
                                    <div className="">
                                        {
                                            detail.map((order, key) => {
                                                return <Row key={key}>
                                                    <Col>
                                                        <h6>Subtotal: <strong>{order.subTotalMoneda}</strong></h6>
                                                        <h6>Servicio de envío: <strong>{order.totalEnvioMoneda}</strong></h6>
                                                        <h6>Total a Pagar: <strong>{order.totalMoneda}</strong></h6>
                                                        <hr></hr>
                                                    </Col>
                                                </Row>
                                            })
                                        }

                                        <h4>Método de pago</h4>
                                        <hr></hr>
                                        <Row className="mb-5">
                                            <Col className="col-md-2 col-sm-2">
                                                <img src={credito} alt="" className="img-fluid" style={{ height: '25px' }} />
                                                <img src={pse} alt="" className="img-fluid" style={{ height: '25px' }} />

                                            </Col>

                                            {firstCheck && secondCheck ?
                                                <div>
                                                    <Link onClick={() => setTarjeta(true)}> <span style={{ color: '#000000' }}>Tarjeta de credito</span></Link><br></br>
                                                    <Link onClick={() => setPse(true)}><span style={{ color: '#000000' }}>PSE</span></Link><br></br>
                                                    {
                                                        !ref.find(x => x.Referencia.startsWith("MPS")) ?
                                                            <Row>
                                                                <img src={efectivo} alt="" className="img-fluid" style={{ height: '25px' }} />
                                                                <Link onClick={() => setCash(true)}><span style={{ color: '#000000' }}>Efectivo o datáfono</span></Link>

                                                            </Row>

                                                            :
                                                            null

                                                    }

                                                </div>

                                                :
                                                <div>
                                                    <h6 onClick={() => toastr.info('Antes de continuar con el pago debe indicar que es mayor de edad y aceptar los Terminos y condiciones de Fanero.', 'Advertencia',
                                                        {
                                                            "preventDuplicates": true
                                                        }
                                                    )}
                                                    >Tarjeta de credito</h6>
                                                    <h6 onClick={() => toastr.info('Antes de continuar con el pago debe indicar que es mayor de edad y aceptar los Terminos y condiciones de Fanero.', 'Advertencia',
                                                        {
                                                            "preventDuplicates": true
                                                        }
                                                    )}>PSE</h6>
                                                    {
                                                        !ref.find(x => x.Referencia.startsWith("MPS")) ?
                                                        <Row>
                                                             <img src={efectivo} alt="" className="img-fluid" style={{ height: '25px' }} />
                                                            <h6 onClick={() => toastr.info('Antes de continuar con el pago debe indicar que es mayor de edad y aceptar los Terminos y condiciones de Fanero.', 'Advertencia',
                                                                {
                                                                    "preventDuplicates": true
                                                                }
                                                            )}>Efectivo o datáfono</h6>

                                                        </Row>
                                                            :
                                                            null

                                                    }

                                                </div>

                                            }


                                        </Row>
                                        <Row>
                                            <Label>
                                                <input className="mt-4" type="checkbox" checked={firstCheck} onChange={() => setFirstCheck(!firstCheck)}>
                                                </input>
                                                Antes de continuar el pago confirmo que acepto
                                                <a href="https://www.fanero.co/termcondiciones.pdf">Términos y Condiciones</a>
                                                <br></br>
                                                <input className="mt-4" type="checkbox" checked={secondCheck} onChange={() => setSecondCheck(!secondCheck)}>
                                                </input>
                                                Confirmo que soy mayor de edad
                                            </Label>
                                        </Row>

                                    </div>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal isOpen={modalTarjeta}>
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="mySmallModalLabel" >
                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                        <label htmlFor="" className="control-label m-3">Tarjeta de credito</label>
                    </h5>
                    <button onClick={() => setTarjeta(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <CreditCard />
                </div>
            </Modal>
            <Modal isOpen={modalPse}>
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="mySmallModalLabel" >
                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                        <label htmlFor="" className="control-label m-3">Pago PSE</label>
                    </h5>
                    <button onClick={() => setPse(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <PSE />
                </div>
            </Modal>
            <Modal isOpen={modalCash}>
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="mySmallModalLabel" >
                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                        <label htmlFor="" className="control-label m-3">Pagar en efectivo</label>
                    </h5>
                    <button onClick={() => setCash(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Cash direccion={direcc} price={detail} />
                </div>
            </Modal>
        </React.Fragment>

    );

}
