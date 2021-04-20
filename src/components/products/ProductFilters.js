import React, { useState, useEffect } from 'react';
import { Row, Col, Label, Input, Card, CardTitle, CardBody, i } from "reactstrap";

import { SEARCH_BY_STORE } from '../../store/search/actionsTypes'
import { useParams } from 'react-router-dom';
import { StoreService } from '../../services/storeService';
import { ApiConstants } from '../../common/apiConstants';
import './button.scss';

export default function ProductFilter(props) {

    const storeService = new StoreService();
    const [filters, setFilters] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [response, setResponse] = useState({ IdTienda: props.params.searchValue, opciones: [] })
    const [clearForm, setClearForm] = useState(false);
    const params = useParams();

    const getStoreFilters = async () => {
        switch (props.params.searchType) {
            case SEARCH_BY_STORE:
                let filters = await storeService.getStoreFilters(props.params.searchValue);
                    setFilters(filters ?? [])
                    console.log(JSON.stringify(filters))
                break;
        }

    }

    const getStoreCatalog = async (id) => {
        const data = await storeService.getStoreCatalog(id);
        if(data)
            setCatalog(data);
            console.log(JSON.stringify(data))
    }

    const checkboxChange = (event, value) => {
        let previosOptions = response.opciones;
        if (event.currentTarget.checked) {
            previosOptions.push(value);
        } else {
            previosOptions = previosOptions.filter(x => x.valor !== value.valor);
        }
        setResponse({ ...response, opciones: previosOptions })
    }

    const applyFilters = () => {
        props.sendFilters({ ...response });
    }

    const clearFilters = () => {
        setClearForm(true);
        setResponse({
            ...response,
            min: null,
            max: null,
            discount: null,
            opciones: []
        })
    }

    useEffect(() => {
        getStoreFilters();
        getStoreCatalog(params.id);

    }, [])

    useEffect(() => {
        if (clearForm) {
            props.sendFilters({ ...response });
            setClearForm(false)
        }
    }, [response])

    return (
        <React.Fragment>
            {/* TODO: cambiar los estilos a una clase  */}
            <Card className="" style={{ height: 'auto' }}>
                <CardBody>
                    <CardTitle className="mb-4"> Filtros </CardTitle>
                    <form className="form-horizontal" onSubmit={(e) => { e.preventDefault() }} >
                        <div className="mt-3 pt-1">
                            <h5 className="font-size-14 mb-4">Rango de Precio</h5>
                            <div className="form-group">
                                <Row>
                                    <Col md="5">
                                        <input name="min" min="0" id="min" className="form-control" placeholder="Mínimo" type="number" onChange={(e) => { setResponse({ ...response, min: e.target.value }) }} />
                                    </Col>
                                    <Col md="5">
                                        <input name="max" min="0" id="max" className="form-control" placeholder="Máximo" type="number" onChange={(e) => { setResponse({ ...response, max: e.target.value }) }} />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <hr />
                        <div className="mt-3 pt-1">
                            <div className="custom-control custom-switch mb-2" dir="ltr">
                                <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked/>    
                                <label className="custom-control-label" htmlFor="customSwitch1">Mejor calificados</label>
                            </div>
                        </div>
                        <div className="mt-3 pt-1">
                            <div>
                                <label>Descuentos:</label>
                                <div className="btn-group btn-group-xs">
                                    <button type="button" className="btn btn-default" onClick={(e) => { setResponse({ ...response, discount: 10 }) }}>10%</button>
                                    <button type="button" className="btn btn-default" onClick={(e) => { setResponse({ ...response, discount: 20 }) }}>20%</button>
                                    <button type="button" className="btn btn-default" onClick={(e) => { setResponse({ ...response, discount: 30 }) }}>30%</button>
                                    <button type="button" className="btn btn-default" onClick={(e) => { setResponse({ ...response, discount: 40 }) }}>40%+</button>
                                </div>
                            </div>
                        </div>

                        {
                            filters.filter(x => x.característica != "imagen" && x.característica != "video").map((x, key) => {
                                return (
                                    <React.Fragment key={key}>
                                        <div className=" mt-3 overflow-y-scroll" style={{ height: "15vh" }}>
                                            <h5 className="font-size-14 mb-3">{x.característica}</h5>
                                            {
                                                x.opciones.map((item, i) => {
                                                    return (
                                                        <div className="custom-control custom-checkbox mt-2" key={i}>
                                                            <Input type="checkbox" value="0" onChange={(e) => { checkboxChange(e, item) }} className="custom-control-input" id={item.valor} />
                                                            <Label className="custom-control-label" htmlFor={item.valor}>{item.valor}</Label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                )
                            })
                        }
                        <Row>
                            <div className="mt-4 col-md-6">
                                <button className="boton3-fanero btn-block" type="button" onClick={applyFilters} > Aplicar filtros </button>
                            </div>
                            <div className="mt-4 col-md-6">
                                <button className="boton2-fanero btn-block" type="reset" onClick={clearFilters}> Limpiar filtros </button>
                            </div>
                        </Row>
                    </form>
                </CardBody>
            </Card>

            <Card style={{ height: 'fit-content', overflowX: 'hidden' }}>
                <CardBody>
                    <CardTitle className="mb-4"> Ordenar </CardTitle>
                    <form className="form-horizontal" onSubmit={(e) => { e.preventDefault() }} >
                        <div className="mt-3 pt-1">
                            <div className="form-group row">
                                <label className="col-md-5 col-form-label">Ordenar por</label>
                                <div className="col-md-7">
                                    <select className="form-control" onChange={(e) => { setResponse({ ...response, sort: e.target.value }) }}>
                                        <option value={ApiConstants.SORT.DEFAULT}>Por defecto</option>
                                        <option value={ApiConstants.SORT.ASC}>Menor Precio </option>
                                        <option value={ApiConstants.SORT.DESC}>Mayor Precio </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <Row>
                            <div className="mt-4 col-md-6">
                                <button className="boton2-fanero btn-block" type="button" onClick={applyFilters} > Ordenar </button>
                            </div>
                            <div className="mt-4 col-md-6">
                                <button className="boton3-fanero btn-block" type="reset" onClick={clearFilters}> Cancelar </button>
                            </div>
                        </Row>
                    </form>
                </CardBody>
            </Card>
            <Card className="" style={{ height: "60vh" }}>
                <CardBody className="overflow-y-scroll">
                    <CardTitle className="mb-4"> Catálogos de tienda: </CardTitle>
                    <form className="form-horizontal" onSubmit={(e) => { e.preventDefault() }} >
                        <hr />
                        {
                            catalog.map((cat, key) => {
                                return (
                                    <React.Fragment key={key}>
                                        <div className="mt-3 pt-1">
                                            <h5 className="font-size-14 mb-3">{cat.nombre}</h5>
                                            {
                                                cat.subCategorias.map((item,i) => {
                                                    return (
                                                        <div className="custom-control custom-checkbox mt-2" key={item.id}>
                                                            <Input type="checkbox" className="custom-control-input" id={item.id} />
                                                            <Label className="custom-control-label" htmlFor={item.id}>{item.nombre}</Label>
                                                        </div>                                              
                                                    )
                                                })
                                            }

                                        </div>
                                        <hr />
                                    </React.Fragment>
                                )
                            })
                        }
                        <Row>
                            <div className="mt-4 col-md-6">
                                <button className="boton2-fanero btn-block" type="button" onClick={applyFilters} > Aplicar filtros </button>
                            </div>
                            <div className="mt-4 col-md-6">
                                <button className="boton3-fanero btn-block" type="reset" onClick={clearFilters}> Limpiar filtros </button>
                            </div>
                        </Row>
                    </form>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

