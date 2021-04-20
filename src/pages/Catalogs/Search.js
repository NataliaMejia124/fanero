import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Container, Button, Input } from "reactstrap";
import 'toastr/build/toastr.min.css';
import profile from "../../assets/images/LogoF_Color.png";
import { StoreService } from '../../services/storeService';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
// Rating Plugin
import toastr, { success } from 'toastr'
import { useDispatch, useSelector } from 'react-redux'
import { ProductService } from "../../services/productService";
import "./Search.scss";


export default function Search(props) {
  const user = useSelector(x => x.Login.user);
  const storeService = new StoreService();
  const params = useParams();
  const productService = new ProductService();

  const [options, setOptions] = useState([])
  const [subCategoria, setSubCategoria] = useState([])
  const [listCatalogs, setListCatalogs] = useState([])
  const [listStore, setListStore] = useState([])
  const [showStore, setShowStore] = useState(true)


  const getCat = async () => {
    let data = await productService.getCatalogs();
    setListCatalogs(data)
    console.log(listCatalogs);
  }

  const getActiveStores = async () => {
    let data = await storeService.getActive();
    setListStore(data);
    console.log(data);
  }

  const subCat = (cat) => {
    setSubCategoria(cat.subCategorias)
    console.log(cat)
  }


  useEffect(() => {
    getCat()
    getActiveStores()
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
                  <Row className="">
                    <form className="app-search d-lg-block" >
                      <div className="position-relative">
                        <input
                          type="text"
                          id="searchHeader"
                          className=""
                          placeholder="Buscar productos..."
                          autoComplete="false"
                        />
                        <span className="bx bx-search-alt"></span>
                      </div>
                    </form>
                  </Row>
                  <Row className="mb-4">
                    <Col className="mt-4 col-lg-6 col-md-6">
                      <button className="btn-block" onClick={() => setShowStore(true)}>Tiendas</button>{'   '}
                    </Col>
                    <Col className="mt-4 col-lg-6 col-md-6">
                      <button className="btn-block" onClick={() => setShowStore(false)}>Catalogos</button>{'   '}
                    </Col>

                  </Row>
                  {
                    showStore ?
                      <div>
                        {
                          listStore.map((store, key) => {
                            return <li className="list-group-item">
                              <Row>

                                <Link to={`/storeProducts/${store.id}`}>
                                  <img src={store.logo} alt={store.nombre} style={{ height: '60px', width: '60px' }} />
                                </Link>

                                <Col className="justify-context-left">
                                  <span className="store-name">{store.nombre}</span> <br></br>
                                  <span className="text-muted">{store.descripcion}</span> <br></br>
                                  <Link to={`/storeProducts/${store.id}`} className="boton3-fanero text-center">
                                    <span style={{ color: '#FFFFFF' }} >Productos</span>
                                  </Link>
                                </Col>
                              </Row>
                            </li>
                          })
                        }
                      </div>
                      :
                      <div>
                        <Row>
                          {
                            subCategoria.length === 0 &&
                            listCatalogs.map((cat, key) => {
                              return (
                                <Col md={4}>
                                  <button onClick={() => subCat(cat)} class="box mb-4" key={key} style={{ backgroundColor: cat.colorFondo }}>
                                    <img  className="icon-img" src={cat.icono} />
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
                        <button class="box mb-4" onClick={()=> setSubCategoria([])}>
                          Volver
                        </button>
                      </Col>
                      {
                        !showStore && subCategoria.length > 0 && subCategoria.map((cat, key) => {
                          return (
                            <Col md={4}>
                              <button class="box mb-4" key={key} style={{ backgroundColor: cat.colorFondo }}>
                                <img src={cat.icono} />
                                {cat.nombre}
                              </button>
                            </Col>)

                        })

                      }
                    </Row>
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
