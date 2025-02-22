import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Card, CardBody } from "reactstrap";
import profile from "../../assets/images/LogoF_Color.png";
import { UserService } from "../../services/userService";
// Rating Plugin
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import * as moment from 'moment';


export default function OrderDetail(props) {
    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const params = useParams();
    const [detail, setDetail] = useState([]);
    
    const ordersSaved = async () => {
        const data = await userService.getOrders(user.id);
        const filtro = data.filter(x => x.id == parseInt(params.id));
        setDetail(filtro)
        console.log(filtro)
    }

    useEffect(() => {
        ordersSaved()
    },[])

    
    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="" style={{ height: "auto" }}>
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h3>Detalle de la orden</h3></label>
                                </Row>
                                <CardBody>
                                    <Row>
                                        {
                                             detail.map((order, key) => {
                                                return <li key={key} className="list-group-item col-md-12">
                                                    <Row>
                                                        <Col>
                                                            <h5 className="store-name">No. Orden: {order.id}</h5>
                                                            <h5>Estado: {order.estado}</h5>
                                                            <hr></hr>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <div className="ml-3">
                                                            <h6>Fecha: {moment(order.fecha).format('MM/DD/YYYY - LT')}</h6>
                                                            <h6>Dirección: {order.direccionPersona.nomenclatura}</h6>
                                                            <h6>Ciudad: {order.municipio}</h6>
                                                            <h6>Tienda: {order.nombreTienda}</h6>
                                                            <h6>Forma de pago: {order.nombreTipoPago}</h6>
                                                            <h6>Cantidad de artículos: {order.cantidadArticulos}</h6>
                                                            <h6>Productos:</h6>
                                                            {
                                                                order.productos.map((product, key) => {
                                                                    return (<ul>
                                                                        <li>{product.descripcion}</li>
                                                                    </ul>
                                                                    )

                                                                })
                                        
                                                            }
                                                            <h6>Observaciones: {order.observacion}</h6>
                                                            <h6>Subtotal: {order.subTotalMoneda}</h6>
                                                            <h6>Servicio de envío: {order.totalEnvioMoneda}</h6>
                                                            <h6>IVA: {order.iva}</h6>
                                                            <h6>Total:{order.totalMoneda}</h6>
                                                        </div>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Link to={`/TracingStepper/${params.id}`} className="boton3-fanero btn-block text-center">
                                                        <span style={{color:'#FFFFFF'}} >Seguimiento</span></Link>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Link to={`/PayMethod/${order.id}`} className="boton2-fanero btn-block text-center">
                                                        <span style={{color:'#FFFFFF'}} >Ir a pagar</span></Link>
                                                    </Row>
                                                   
                                                </li>
    
                                            })
                                        }
                                        
                                    </Row>
                                </CardBody>
                            </Card>   
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>

    );

}
