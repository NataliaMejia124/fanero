import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Container, Button, Input } from "reactstrap";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import { useParams } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";
// Rating Plugin
import toastr, { success } from 'toastr'
import { useDispatch, useSelector } from 'react-redux'
import { ProductService } from "../../services/productService";
import "./Catalogs.scss";
import ProductList from '../../components/products/ProductList'


export default function Catalogs(props) {
    const user = useSelector(x => x.Login.user);
    const storeService = new StoreService();
    const productService = new ProductService();
    const history = useHistory();

    const [options, setOptions] = useState([])
    const [subCategoria, setSubCategoria] = useState([])
    const [listCatalogs, setListCatalogs] = useState([])
    const [filter, setFilter] = useState([])

    const getCat = async () => {
        let data = await productService.getCatalogs();
        setListCatalogs(data)
        console.log(listCatalogs);
    }

    const subCat = (cat) => {
        setSubCategoria(cat.subCategorias)
        console.log(cat)
    }

    const filterSubCat = async (id) => {
        let data = await productService.getProductsByIdCatalog(id);
        setFilter(data)
        console.log(data)
        // history.push({
        //     pathname: '/searchProducts'
        // })
    }

    useEffect(() => {
        getCat()
        console.log(filter)

    }, [])


    return (

        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={6}>
                            {/* <Card className="" style={{ height: "auto" }}> */}
                                <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
                                    <div className="col-md-2">
                                        <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
                                    </div>
                                    <h3 className="col-md-6 m-auto">Catalogos</h3>
                                </Row>
                                {/* <CardBody> */}

                                    {
                                        <div>
                                            <Row>
                                                {
                                                    subCategoria.length === 0 &&
                                                    listCatalogs.map((cat, key) => {
                                                        return (
                                                            <Col md={4}>
                                                                <button onClick={() => subCat(cat)} class="box mb-4" key={key} style={{ backgroundColor: cat.colorFondo }}>
                                                                    {
                                                                        cat.icono ?
                                                                            <img className="icon-img" src={cat.icono} />
                                                                            :
                                                                            <i className="fas fa-tags m-4 icon-img" style={{ color: 'white' }}></i>
                                                                    }
                                                                    {cat.nombre}
                                                                </button>
                                                            </Col>)

                                                    })

                                                }
                                            </Row>
                                        </div>
                                    }
                                    <div>
                                        <Row>
                                            <Col md={4}>
                                                <button class="box mb-4" onClick={() => setSubCategoria([])}>
                                                    Volver
                                                </button>
                                            </Col>
                                            {
                                                subCategoria.length > 0 && subCategoria.map((cat, key) => {
                                                    return (
                                                        <Col md={4}>
                                                            <button onClick={() => filterSubCat(cat.id)} class="box mb-4 text-aling-center" key={key} style={{ backgroundColor: cat.colorFondo }}>
                                                                {
                                                                    cat.icono ?
                                                                        <img className="icon-img" src={cat.icono} />
                                                                        :
                                                                        <i className="fas fa-tags m-4 icon-img" style={{ color: 'white' }}></i>
                                                                }
                                                                {cat.nombre}
                                                            </button>
                                                        </Col>)

                                                })

                                            }
                                        </Row>
                                    </div>
                                {/* </CardBody>
                            </Card> */}
                        </Col>
                    </Row>
                    <ProductList products={filter || []} />
                </Container>
            </div>
        </React.Fragment>

    );

}
