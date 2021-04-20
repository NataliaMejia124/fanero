import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Container, Button, Input } from "reactstrap";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import './button.scss';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
// Rating Plugin
import toastr, { success } from 'toastr'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteProductCart, delete_products_from_cart } from '../../store/auth/cart/actions'
import { connect } from 'react-redux'


function CartList({ countercart }) {
    const user = useSelector(x => x.Login.user);
    const storeService = new StoreService();
    const params = useParams();
    const history = useHistory();
    const cart = useSelector(store => store.cart.countercart);
    const dispatch = useDispatch()
    const [productsByStore, setproductsByStore] = useState(cart.filter(store => store.idStore == params.id))

    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    const validationToBuy = () => {
        if (user) {
            history.push({
                pathname: `/SendProducts/${params.id}`,
                state:{productos: productsByStore} 
            })
        }

        else { 
            toastr.info('Para realizar esta accón debe estar logueado, por favor inicie sesión o cree una cuenta en fanero', <button type="button" class="btn clear">Cancelar</button>, 'Información',
            {
                "preventDuplicates": true,
                "tapToDismiss": false
            })
            //falta poner dos botones, uno que cierre el toastr y otro con el link de iniciar sesion
        }


    }
    useEffect(() => {
        const data = cart.filter(store => store.idStore == params.id)
        setproductsByStore(data)
        console.log(data)
    }, [cart])


    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={6}>
                            <Card className="" style={{ height: "auto" }}>
                                {/* Jose: Cambié el Row de abajo */}
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <div className="col-md-2">
                                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    </div>
                                    <h3 className="col-md-6 m-auto">Carro de compras</h3> {/* Jose: Borré labels y otros*/}
                                    <h3 className="col-md-4 m-auto">
                                        {formatterPeso.format(productsByStore.reduce((a, b) => { return a + b.price * b.count }, 0))}
                                    </h3>
                                </Row>
                                <CardBody>
                                    <Row>
                                        {productsByStore.length === 0 ?
                                            <span className="text-aling-center">No hay productos</span>
                                            :
                                            productsByStore.map((product, key) => {
                                                return <li className="list-group-item col-md-12" key={key}>
                                                    <Row>
                                                        <Col className="md-4 ml-1">
                                                            <img src={product.image} alt={product.name} style={{ height: "75px" }} />
                                                        </Col>
                                                        <Col md={7}>

                                                            {/* Jose: Cambié varias clases por aquí */}
                                                            <span className="store-name">{product.name}</span><br></br>
                                                            <strong className="store-name">{formatterPeso.format(product.price * product.count)}</strong><br></br>
                                                            <div className="d-flex justify-content-left pt-4" >
                                                                <span className="mr-3">Cantidad</span>
                                                                <button className="btn btn-primary rounded" style={{ padding: '3px 6px' }}
                                                                    onClick={() => dispatch(deleteProductCart(product))}>
                                                                    <i className="fas fa-minus"></i>
                                                                </button>

                                                                {/* Jose: esto no debería ser un H5 */}
                                                                <h5 className="m-1">{product.count}</h5>

                                                                <button className="btn btn-primary rounded " style={{ padding: '3px 6px' }}
                                                                    onClick={() => dispatch(addToCart(product))}>
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </Col>
                                                        <Col className="col-1 mt-3">
                                                            <input onClick={() => dispatch(delete_products_from_cart(product.id))} className="boton-imagen" type="button" value="  " />
                                                        </Col>
                                                    </Row>
                                                </li>

                                            })
                                        }
                                    </Row>
                                    <Row>
                                        <Col className="mt-4 col-lg-6 col-md-6">
                                            <button className="boton2-fanero btn-block text-center" onClick={() => validationToBuy()}>Comprar</button>
                                            {/* <Link to={{
                                                pathname: user ? `/SendProducts/${params.id}` : toastr.info('Para realizar esta accón debe estar logueado, por favor inicie sesión o cree una cuenta en fanero', <button type="button" class="btn clear">Cancelar</button>, 'Información',
                                                {
                                                    "preventDuplicates": true
                                                }),
                                                state: {
                                                    productos: productsByStore
                                                }
                                            }} className="boton2-fanero btn-block text-center">
                                                <span style={{ color: '#FFFFFF' }} >Comprar</span></Link> */}

                                        </Col>
                                        <Col className="mt-4 col-lg-6 col-md-6">
                                            <Link to={'/Search'} className="boton3-fanero btn-block text-center">
                                                <span style={{ color: '#FFFFFF' }} >Seguir comprando</span></Link>
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
const mapStateToProps = state => {
    const { countercart } = state.cart;
    return { countercart };
}
export default connect(mapStateToProps, null)(CartList);