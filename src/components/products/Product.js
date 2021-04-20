import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { Col, Card, CardBody, Row } from "reactstrap";

import {useDispatch, useSelector} from 'react-redux'
// import {addtocard} from '../store/auth/cart/actions'
// import {cart} from "../store/auth/cart/reducer"

//TODO:hacer esto de la manera correcta
import "../../assets/scss/custom/components/product.scss"
import {addToCart} from '../../store/auth/cart/actions'
import { StoreService } from '../../services/storeService';
import toastr, { success } from 'toastr'
import { useParams } from 'react-router-dom';
import Fav from "./Fav";



export default function Product(props) {

    const user = useSelector(x => x.Login.user);
    const storeService = new StoreService()
    const dispatch = useDispatch()
    const cart = useSelector(store => store.cart.countercart);
    const [favoritos, setFavoritos] = useState([])
    //const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos'))

    useEffect(() => {
        console.log(props.product)
    },[cart])
    
     
    return (
        <React.Fragment>
            <Col sm="4">
                <Card className="" style={{ height: "75vh" }}>
                    <div className="favorite">
                    {
                        <i className={props.product.favorite ? "fas fa-heart" : "far fa-heart"}  aria-hidden="true"
                        onClick={() => props.toggleFavorite(props.product.id, !props.product.favorite)}></i>
                    }
                    </div>
                    <CardBody>
                        <div className="product-img position-relative">
                            <div className="product-image">
                                <img src={props.product.image} alt="" className="img-fluid mx-auto d-block" style={{height:'100%'}} />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <h5 className="mb-3 text-truncate">
                                <Link to={"/ecommerce-product-detail/" + props.product.id} className="text-dark">{props.product.name} </Link>
                            </h5>
                            <div className="border border-secondary">
                                {props.product.store}
                            </div>
                            <div className="text-muted mb-3">
                                <StarRatings
                                    rating={props.product.rating}
                                    starRatedColor="#F1B44C"
                                    starEmptyColor="#2D363F"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="14px"
                                    starSpacing="3px"
                                    
                                />
                            </div>
                            <h5 className="my-0">
                                <b>{props.product.newPrice}</b>
                            </h5>
                            <Row className="mt-3">
                                <Col>
                                    <Link to={`/detailProducts/${props.product.id}`} className="boton3-fanero btn-block">
                                        <span style={{color:'#FFFFFF'}}>Ver + </span>
                                    </Link>
                                </Col>
                                <Col>
                                    <button className="btn btn-danger btn-block p-1"
                                    onClick ={ () => dispatch(addToCart(props.product))}> Agregar </button>
                                    {/* nose como hacer en el onclick dos cosas: el dispatch y la toastr
                                    toastr.info('tal nombre ha sido agregado al carrito de compras.', 'Producto Agregado',
                                        {
                                            "preventDuplicates": true
                                        }
                                        ) */}
                                   
                                </Col>
                            </Row>  
                            
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}
