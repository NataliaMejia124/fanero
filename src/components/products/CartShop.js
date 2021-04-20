import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Card, CardBody } from "reactstrap";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import './button.scss';
// Rating Plugin
import toastr, { success } from 'toastr'
import { deleteStoreFromCart } from '../../store/auth/cart/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";


export default function CartShop(props) {
    const user = useSelector(x => x.Login.user);
    const storeService = new StoreService();
    const [tiendas, setTiendas] = useState([])
    const tiendasGuardadas = JSON.parse(localStorage.getItem('tiendas'))
    const cart = useSelector(store => store.cart.countercart);
    const [order, setOrder] = useState([])
    const dispatch = useDispatch()

    const getActiveStores = async () => {
        const data = await storeService.getActive();
        if (data)
            setTiendas(data);
    }
    useEffect(() => {
        if (!tiendasGuardadas || tiendasGuardadas.length === 0) {
            getActiveStores();
        }
        shopByStore([]);
    }, [])

    useEffect(() => {
        shopByStore([]);
    }, [cart])

    const shopByStore = () => {
        let list = [];
        for (let store of tiendasGuardadas) {
            let products = cart.filter(x => x.store == store.nombre);

            if (products.length === 0) continue;
            list.push({
                nombre: store.nombre,
                logo: store.logo,
                products: products,
                price: cart.filter(x => x.idStore === store.id)
                    .reduce((a, b) => { return a + b.price*b.count }, 0),
                idStore: store.id
            })
            setOrder(list)
            console.log(list)
        }
    }
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
                        <Col md={8} lg={6} xl={6}>
                            <Card className="" style={{ height: "auto" }}>
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    <label htmlFor="" className="control-label m-3"><h3>Carro de compras</h3></label>
                                </Row>
                                <CardBody>
                                    <Row>
                                        {
                                         cart.length === 0 ?
                                         <span>No hay Pedidos</span>
                                        :
                                        order.map((store, key) => {
                                            return <li className="list-group-item col-md-12" key={key}>
                                                <Row>
                                                    <Col md={8}>
                                                        <img src={store.logo} alt={store.nombre} style={{ height: '60px', width: '60px' }} />
                                                        <strong className="store-name ml-4">{store.nombre}</strong>
                                                    </Col>
                                                    <Col className="text-aling-right sm-4 md-4 mt-4">
                                                        <strong className="store-name">{formatterPeso.format(store.price)}</strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="mt-3">
                                                        <span className="text-muted">Productos Seleccionados: {store.products.length}</span> <br></br>
                                                        <span className="text-muted">Cantidad de productos a comprar: {store.products.reduce((a, b) => { return a + b.count }, 0)}</span> <br></br>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="mt-3">
                                                        <input className="boton-imagen mr-2" type="button" value="  "
                                                            onClick={() => dispatch(deleteStoreFromCart(store.nombre))} />Eliminar pedido
                                                    </Col>
                                                    <Col className="m-3">
                                                        <Link to={`/CartList/${store.idStore}`} className="boton3-fanero btn-block text-center">
                                                            <span style={{color:'#FFFFFF'}} >ir a pagar</span></Link>
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
