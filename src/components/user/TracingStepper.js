import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Card, CardBody, Table } from "reactstrap";
import profile from "../../assets/images/LogoF_Color.png";
import { UserService } from "../../services/userService";
// Rating Plugin
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import * as moment from 'moment';
import LabelStepper from "./Stepper";


export default function TracingStepper(props) {
    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const params = useParams();
    const [detail, setDetail] = useState([]);
    const [step, setStep] = useState(0);

    const ordersSaved = async () => {
        const data = await userService.getOrders(user.id);
        const filtro = data.filter(x => x.id == parseInt(params.id));
        setDetail(filtro)
        console.log(filtro)
        setStep(data.find(x => x.id == params.id)?.estadosOrden.filter(x => x.finalizado)
            .sort((a, b) => b.idEstadoOrden - a.idEstadoOrden)[0].idEstadoOrden)

    }

    useEffect(() => {
        ordersSaved()
    }, [])


    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="" style={{ height: "auto" }}>
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h3>Seguimiento</h3></label>
                                </Row>
                                <CardBody>
                                    <Row>
                                        {
                                            detail.map((order, key) => {
                                                return <li key={key} className="list-group-item col-md-12">
                                                    <Row>
                                                        <Col>
                                                            <h6 className="store-name">No. Orden: {order.id}</h6>
                                                            <h6>Estado: {order.estado}</h6>
                                                            <hr></hr>
                                                        </Col>
                                                    </Row>
                                                </li>

                                            })
                                        }

                                    </Row>
                                    <div>
                                        <LabelStepper step={step} />
                                    </div>
                                    <div>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Estado</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    detail.find(x => x.id == params.id)?.estadosOrden.map((order, key) => (
                                                        <tr key={order.id}>

                                                            <td>{order.finalizado ? moment(order.fecha).format('MM/DD/YYYY') : "   --"}</td>
                                                            <td> {order.finalizado ? moment(order.fecha).format('LT') : "   --"}</td>
                                                            <td>{order.nombre}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </React.Fragment>

    );

}
