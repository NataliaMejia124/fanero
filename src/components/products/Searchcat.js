import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Container, Button, Input } from "reactstrap";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import './button.scss';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
// Rating Plugin
import toastr, { success } from 'toastr'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'


export default function Searchcat(props) {
    const user = useSelector(x => x.Login.user);
    const storeService = new StoreService();
    const params = useParams();

    useEffect(() => {
    }, [])


    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={6}>
                            <Card className="" style={{ height: "auto" }}>
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <div className="col-md-2">
                                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    </div>
                                    <h3 className="col-md-6 m-auto">Buscar</h3>
                                </Row>
                                <CardBody>
                                    <Row>
                                        {
                                            // productsByStore.map((product, key) => {
                                            //     return <li className="list-group-item col-md-12">
                                            //         <Row>
                                                        
                                            //         </Row>
                                            //     </li>

                                            // })
                                        }
                                    </Row>
                                    <Row>
                                        <Col className="mt-4 col-lg-6 col-md-6">
                                            <button className="btn-block">Tiendas</button>{'   '}
                                        </Col>
                                        <Col className="mt-4 col-lg-6 col-md-6">
                                            <button className="btn-block">Catalogos</button>{'   '}
                                        </Col>
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
