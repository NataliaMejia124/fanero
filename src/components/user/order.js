import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Card, CardBody } from "reactstrap";
import profile from "../../assets/images/LogoF_Color.png";
import { UserService } from "../../services/userService";
// Rating Plugin
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import * as moment from 'moment';


export default function Order(props) {
    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const cart = useSelector(store => store.cart.countercart);
    const [lista, setLista] = useState([]);
    
    const ordersSaved = async () => {
        const data = await userService.getOrders(user.id);
        if(data)
            setLista(data)
        console.log(data)
    }
    useEffect(() => {
        ordersSaved()
    },[])

   
    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })


    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={5} xl={5}>
                            <Card className="mt-3" style={{ height: "auto" }}>
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h3>Mis ordenes</h3></label>
                                </Row>
                                <CardBody>
                                    <Row>
                                        {   lista.length === 0 ?
                                            <span>No hay ordenes realizadas</span>
                                            :
                                             lista.map((order, key) => {
                                                return <li className="list-group-item col-md-12">
                                                    <Row key={key}>
                                                        <Col md={6}>
                                                            <strong className="store-name">No. Orden: {order.id}</strong>
                                                        </Col>
                                                        <Col md={6}>
                                                            <h6>Fecha: {moment(order.fecha).format('MM/DD/YYYY - LT')}</h6>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="mt-3">
                                                            <span className="text-muted">Estado: {order.estado}</span> <br></br>
                                                            <span className="text-muted">Valor de pedido: {order.totalMoneda}</span> <br></br>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="mt-3">
                                                            <Link to={`/OrderDetail/${order.id}`} className="boton3-fanero btn-block text-center">
                                                            <span style={{color:'#FFFFFF'}} >Ver detalles</span></Link>
                                                        </Col>
                                                        <Col className="mt-3">
                                                            <Link to={`/PayMethod/${order.id}`} className="boton2-fanero btn-block text-center">
                                                            <span style={{color:'#FFFFFF'}} >Ir a pagar</span></Link>
                                                        </Col>
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
