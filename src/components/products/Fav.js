import React, { useEffect, useState } from "react";
import { Table, Row, Col, CardBody, Card, Container, Button } from "reactstrap";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import { useParams } from 'react-router-dom';
import './button.scss';
// Rating Plugin
import StarRatingComponent from "react-star-rating-component";
import { useDispatch, useSelector } from 'react-redux';
import toastr, { success } from 'toastr'


export default function Fav(props) {
    const user = useSelector(x => x.Login.user);
    const storeService = new StoreService();
    const [products, setProducts] = useState([])
    const params = useParams();

    const getList = async () => {

        const data = await storeService.getFavList(user.id);
        if (data)
            setProducts(data);
        localStorage.setItem('Favoritos', JSON.stringify(data));
    }
    const deleteFavorite = async (IdPersona, idProducto) => {
        const response = await storeService.deleteFav(IdPersona, idProducto);
        if (response.success) {
            toastr.success("Eliminado");

        } else {
            toastr.info("pailax");
        }
        getList();
    }
    useEffect(() => {
        if(user){
            getList();
        }
    }, [])

    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={6}>
                            <Card className="" style={{ height: "auto" }}>
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h3> Mis Favoritos</h3></label>
                                </Row>
                                <CardBody>
                                    <Row md={12}>
                                        {
                                            !user ?
                                                <h5>Es necesario iniciar sesión para ver sus productos favoritos.</h5>
                                                :
                                                (products.length === 0 ?
                                                    <span className="text-aling-center">No hay Favoritos</span>
                                                    :
                                                    products.map((product, key) => {
                                                        return <li className="list-group-item col-md-12">
                                                            <Row>
                                                                <Col md={3}>
                                                                    <Row >
                                                                        <img id='' src={product.fotoPrincipal} alt="" className="img-fluid mx-auto d-block" style={{ height: '100px' }} />
                                                                    </Row>
                                                                    <Row className="text-justify-center pt-3 ml-2">
                                                                        <StarRatingComponent
                                                                            value={product.calificacion}
                                                                            starCount={5}
                                                                        />
                                                                    </Row>
                                                                </Col>
                                                                <Col md={9}>
                                                                    <div className="favorite">
                                                                        <i className="fas fa-heart" aria-hidden="true"
                                                                            onClick={() => deleteFavorite(user.id, product.id)}></i>
                                                                    </div>
                                                                    <span className="store-name">{product.descripcion}</span> <br></br>
                                                                    <Row className="mt-3">
                                                                        <Col>
                                                                            <h5 className="store-name">{product.valorMoneda}</h5> <br></br>
                                                                        </Col>
                                                                        <Col>
                                                                            <span style={{ color: "#00a3e8" }}>{product.descuento} % Dto</span> <br></br>
                                                                        </Col>
                                                                    </Row>

                                                                    <p className="aling-left">{product.detalle}</p> <br></br>
                                                                    <Row>
                                                                        <Col>
                                                                            <a href={`/detailProducts/${product.id}`} className="btn btn-light btn-block"> Ver producto </a>
                                                                        </Col>
                                                                        <Col>
                                                                            <button className="btn btn-light btn-block mb-3">{product.nombreTienda}</button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                            </Row>
                                                        </li>

                                                    })
                                                )

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
