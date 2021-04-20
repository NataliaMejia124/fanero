import React, { useEffect, useRef, useState } from "react";
import { Table, FormGroup, Row, Col, CardBody, Card, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from 'react-router-dom';
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import { useParams } from 'react-router-dom';
import './button.scss';
// Rating Plugin
import StarRatingComponent from "react-star-rating-component";
import { addToCart } from '../../store/auth/cart/actions';
import { useDispatch, useSelector } from 'react-redux';
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ProductDetail.scss"
import * as moment from 'moment';

export default function ProductDetail(props) {

    var Carousel = require("react-responsive-carousel").Carousel;

    const myRef = useRef(null);
    const storeService = new StoreService();
    const [products, setProducts] = useState([])
    const [counter, setCounter] = useState(1)
    const [comment, setComment] = useState([])
    const params = useParams();
    const [modalComments, setModalComments] = useState(false);
    const tiendasGuardadas = JSON.parse(localStorage.getItem('tiendas'))
    const dispatch = useDispatch()
    const sele = useSelector(store => store.cart.countercart)
    const [zoom, setZoom] = useState(false);

    // const getnata = async (urlFromRoot) => {
    //     let url = url incial del servicio https://faneroapi.azurewebsites.net/api;
    //     try {
    //         let response = await fetch(url, {
    //             method: 'GET',
    //         })
    //         return await response.json();
    //     } catch (error) {
    //         //this.handleError(error);
    //     }
    // }

    const getProduct = async (id) => {
        const data = await storeService.getDetailProducts(id);

        if (data) {
            setProducts(data);
            let imagesTmp = data.caracteristicasModel?.filter(x => x.nombre == "imagen").map((c) => {
                return {
                    original: c.valor,
                    thumbnail: c.valor
                }
            })
            imagesTmp.push({
                original: data.productDetailModel?.fotoPrincipal,
                thumbnail: data.productDetailModel?.fotoPrincipal
            })
            setImages(imagesTmp);
        }
    }
    const [addressStore] = useState(tiendasGuardadas.filter(store => store.id == 99)) // products.productDetailModel?.idTienda) si  le escribo el id quemado si sale en consola linea 74

    const sendProduct = (item) => {
        let productNew = {
            id: item.productDetailModel.id,
            image: item.productDetailModel.fotoPrincipal,
            name: item.productDetailModel.descripcion,
            store: item.productDetailModel.nombreTienda,
            rating: item.productDetailModel.calificacion,
            newPrice: item.productDetailModel.valorMoneda,
            price: item.productDetailModel.valor,
            idStore: item.productDetailModel.idTienda,
            counter: counter,
            Referencia: item.productDetailModel.referencia,
            Iva: item.productDetailModel.iva,
            Descuento: item.productDetailModel.descuento,
        }
        dispatch(addToCart(productNew))
    }

    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    const getComment = async () => {

        const data = await storeService.getCommentProduct(params.id);
        if (data)
            setComment(data);
        console.log(data)

    }

    useEffect(() => {
        getProduct(params.id);
        getComment()
        console.log(addressStore)
    }, [])

    const [images, setImages] = useState([])
    const [fullScreen, setFullScreen] = useState(false);

    const galleryProps = {
        showBullets: true,
        thumbnailPosition: "left",
        showPlayButton: false,
        onClick: (e) => {
            if (fullScreen) {
                myRef.current.exitFullScreen()
                setFullScreen(false);
            } else {
                myRef.current.fullScreen()
                setFullScreen(true);
            }

        }
    }

    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-left">
                        <Col md={6} lg={6} xl={5}>
                            <Row className="d-flex justify-content-left pt-4 pb-3">
                                {/* <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} /> */}
                                <label htmlFor="" className="control-label m-3"><h3> Detalle del producto</h3></label>
                            </Row>
                            <div>
                                <ReactImageGallery items={images} {...galleryProps} ref={myRef} />;
                            </div>
                        </Col>

                        <Col md={6} lg={6} xl={5}>
                            <div className="text-center py-5">
                                <h3>{products.productDetailModel?.descripcion}</h3>
                                <Row>
                                    <Col md={4}>
                                        <StarRatingComponent
                                            value={products.productDetailModel?.calificacion}
                                            starCount={5}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <div>
                                            < h4> <strong>{formatterPeso.format(products.productDetailModel?.valor * counter)}</strong> </h4>
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <span style={{ color: "#00a3e8" }}>{products.productDetailModel?.descuento}% Dto </span>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </div>

                            <div className="p-1 text-left">
                                <h5> Detalles del producto</h5>
                                <span>{products.productDetailModel?.detalle}<br>
                                </br> Marca: {products.productDetailModel?.marca}</span>
                            </div>
                            <div className="p-1 text-left">
                                <h5> Garantia</h5>
                                {products.productDetailModel?.garantia}  <span>Sin garantia</span>
                            </div>
                            <div className="p-1 text-lef">
                                <button onClick={() => setModalComments(true)} style={{ border: '0px' }}  > Comentarios </button>

                            </div>

                            <div className="p-1 text-lefth">
                                <h5> Información de la tienda</h5>
                                <span>{addressStore?.direccion}</span>
                            </div>
                            <div className="display-flex justify-content-center">
                                <div className="DIV display-flex justify-content-center mt-2 ">
                                    <button className="boton-cant"
                                        onClick={() => setCounter(counter > 1 ? counter - 1 : counter)}>
                                        <i className="fas fa-minus" style={{ color: '#47BFC0' }}></i>
                                    </button>

                                    <strong className="ml-3">{counter}</strong>

                                    <button className="boton-cant ml-3"
                                        onClick={() => setCounter(counter + 1)}>
                                        <i className="fas fa-plus" style={{ color: '#47BFC0' }}></i>
                                    </button>
                                </div>

                            </div>

                            <div className="container text-center py-5 px-5">
                                <Row className="row justify-context-center">
                                    <Col md={6}>
                                        <button className="boton3-fanero btn-block" onClick={() => sendProduct(products)}
                                        > Agregar al carrito</button>
                                    </Col>

                                    <Col>
                                        <Link to={"/cart"} className="boton2-fanero btn-block">
                                            <span style={{ color: '#FFFFFF' }} >ir al carrito</span>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>

                    </Row>

                </Container>
            </div>
            <Modal isOpen={modalComments}>
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="mySmallModalLabel" >
                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                        <label htmlFor="Nomenclatura" className="control-label m-3">Valoración del producto</label>
                    </h5>
                    <button onClick={() => setModalComments(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {
                        comment.length === 0 ?
                            <span>Aún no hay comentarios de este producto</span>
                            :
                            comment.map((com, key) => {
                                return <div className="card" style={{ height: "auto" }} key={key}>
                                    <div className="card-header">
                                        <Row>
                                            <Col md={8}>
                                                <h6>{com.nombres}</h6>
                                            </Col>
                                            <Col md={4}>
                                                <h6>{moment(com.fechaCalificacion).format('DD/MM/YYYY')}</h6>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="card-body">
                                        <Row className="card-text">
                                            <Col>
                                                <h1><span className="blue">{(com.nombres).charAt(0)}</span></h1>
                                            </Col>
                                            <Col>
                                                <p className="card-text">{com.comentario}</p>
                                            </Col>
                                            <Col>
                                                <StarRatingComponent
                                                    value={com.calificacion1}
                                                    starCount={5}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            })
                    }
                </div>
            </Modal>
            <Modal isOpen={zoom}>
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="mySmallModalLabel" >
                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                    </h5>
                    <button onClick={() => setZoom(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <h1>holi</h1>
            </Modal>

        </React.Fragment>

    );

}
