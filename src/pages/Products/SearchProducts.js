import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Container, Row, Col, Label, Input, Card, CardTitle, CardBody } from "reactstrap";
import { useSelector } from "react-redux";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Product Images
import ProductList from '../../components/products/ProductList'
import { ProductService } from "../../services/productService";

export default function SearchProducts(props) {
    const productService = new ProductService();
    const [products, setProducts] = useState([]);
    const keyWord = useSelector(state => state.Search.keyWord)

    //Temporal
    const [filter, setFilter] = useState([
        { id: 1, name: "T-shirts", link: "#" },
        { id: 2, name: "Shirts", link: "#" },
        { id: 3, name: "Jeans", link: "#" },
        { id: 4, name: "Jackets", link: "#" },
    ]);

    // useEffect(()=>{        
    //     console.log(keyWord);
    // });
    const getProduct = async () => {
        const lista = await productService.getByKeyWord(keyWord);
        setProducts(lista)
    }

    useEffect(() => {
        getProduct();
    })

    return (
        <React.Fragment>
            <div className="page-content">
                <Container>
                    <Row>
                        <Col lg="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">
                                        Filter
                                        </CardTitle>
                                    {/* <div>
                                        <h5 className="font-size-14 mb-3">Clothes</h5> */}
                                        {/* Render Cloth Categories
                                        {/* <ul className="list-unstyled product-list">
                                            {
                                                filter.map((cloth, key) =>
                                                    <li key={"_li_" + key}><Link to={cloth.link}><i className="mdi mdi-chevron-right mr-1"></i>{cloth.name}</Link></li>
                                                )
                                            }
                                        </ul>
                                    </div> */}
                                    <div className="mt-4 pt-3">
                                        <h5 className="font-size-14 mb-4">Price</h5>
                                        <br />

                                        <Nouislider range={{ min: 0, max: 600 }} tooltips={true} start={[100, 500]} connect />

                                    </div>

                                    <div className="mt-4 pt-3">
                                        <h5 className="font-size-14 mb-3">Discount</h5>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <Input type="checkbox" value="0" className="custom-control-input" id="productdiscountCheck1" />
                                            <Label className="custom-control-label" htmlFor="productdiscountCheck1">Less than 10%</Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <Input type="checkbox" value="1" className="custom-control-input" id="productdiscountCheck2" />
                                            <Label className="custom-control-label" htmlFor="productdiscountCheck2">10% or more</Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <Input type="checkbox" value="2" className="custom-control-input" id="productdiscountCheck3" defaultChecked />
                                            <Label className="custom-control-label" htmlFor="productdiscountCheck3">20% or more</Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <Input type="checkbox" value="3" className="custom-control-input" id="productdiscountCheck4" />
                                            <Label className="custom-control-label" htmlFor="productdiscountCheck4">30% or more</Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <Input type="checkbox" value="4" className="custom-control-input" id="productdiscountCheck5" />
                                            <Label className="custom-control-label" htmlFor="productdiscountCheck5">40% or more</Label>
                                        </div>
                                        <div className="custom-control custom-checkbox mt-2">
                                            <Input type="checkbox" value="5" className="custom-control-input" id="productdiscountCheck6" />
                                            <Label className="custom-control-label" htmlFor="productdiscountCheck6">50% or more</Label>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3">
                                        <h5 className="font-size-14 mb-3">Customer Rating</h5>
                                        <div>
                                            <div className="custom-control custom-checkbox mt-2">
                                                <Input type="checkbox" className="custom-control-input" id="productratingCheck1" />
                                                <Label className="custom-control-label" htmlFor="productratingCheck1">4 <i className="bx bx-star text-warning"></i>  & Above</Label>
                                            </div>
                                            <div className="custom-control custom-checkbox mt-2">
                                                <Input type="checkbox" className="custom-control-input" id="productratingCheck2" />
                                                <Label className="custom-control-label" htmlFor="productratingCheck2">3 <i className="bx bx-star text-warning"></i>  & Above</Label>
                                            </div>
                                            <div className="custom-control custom-checkbox mt-2">
                                                <Input type="checkbox" className="custom-control-input" id="productratingCheck3" />
                                                <Label className="custom-control-label" htmlFor="productratingCheck3">2 <i className="bx bx-star text-warning"></i>  & Above</Label>
                                            </div>
                                            <div className="custom-control custom-checkbox mt-2">
                                                <Input type="checkbox" className="custom-control-input" id="productratingCheck4" />
                                                <Label className="custom-control-label" htmlFor="productratingCheck4">1 <i className="bx bx-star text-warning"></i></Label>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <ProductList products={products || []} />
                </Container>
            </div>
        </React.Fragment>
    );

}