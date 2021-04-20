import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from "reactstrap";

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { SEARCH_VALUES, SEARCH_BY_STORE } from '../../store/search/actionsTypes'

import { ProductService } from '../../services/productService';
import ProductList from '../products/ProductList';
import ProductFilters from '../products/ProductFilters';
import { FILTERS_POSITION_BOTTOM } from 'react-bootstrap-table-next';
import { ApiConstants } from '../../common/apiConstants';


export default function StoreProducts() {
    const params = useParams();
    const searchParams = useSelector(state => state.Search)
    const [products, setProducts] = useState([]);
    const [shownProducts, setShownProducts] = useState([]);
    const [localFilters, setLocalFilters] = useState({ sort: ApiConstants.SORT.DEFAULT, min: null, max: null })
    const productService = new ProductService();
    const defaultFilters = { ...localFilters, keyWord: "", opciones: [] }

    const getProductsByStore = async (filter) => {
        let products = await productService.getProductsByStore(params.id)
        if (filter){
            if (filter.discount){
                products = products.filter(x => x.productDetailModel.descuento == filter.discount)
            }
        }
        setProducts(products ?? []);
    }

    const newFilters = async (newFilters) => {
        setLocalFilters({ min: newFilters.min, max: newFilters.max, sort: newFilters.sort })

        //El endpoint de filtros solo funciona si le paso al menos un elemento en "opciones"
        //por eso es necesario validar y llamar un endpoint diferente si se quiere filtrar por texto y no por opciones
        let products = [];

        if (newFilters.opciones.length == 0 && searchParams.keyWord) {
            //si no tiene filtros pero tiene palabra clave
            products = await productService.getByKeyWord(searchParams.keyWord, params.id);
            
            setProducts(products ?? []);
        } else if (newFilters.opciones.length > 0) {
            //si tiene filtros 
            debugger
            newFilters = {
                ...newFilters,
                keyWord: searchParams.keyWord ? searchParams.keyWord : "",
                IdTienda: parseInt(params.id),
                característica: ""
            }
            products = await productService.GetBySpecificFiltersStore(newFilters);
            setProducts(products ?? []);
        } else if (newFilters.opciones.length == 0 && !searchParams.keyWord) {
            //si no tiene ni filtros, ni palabra clave
            getProductsByStore(newFilters);
        }
                 

    }

    useEffect(() => {
        getProductsByStore();
    }, [])

    useEffect(() => {
        newFilters({ ...defaultFilters, keyWord: searchParams.keyWord });
    }, [searchParams])

    useEffect(() => {
        let productsTmp;
        switch (localFilters.sort) {
            case ApiConstants.SORT.ASC:
                productsTmp = products.sort((a, b) => a.productDetailModel.valor - b.productDetailModel.valor)
                break;
            case ApiConstants.SORT.ASC:
                productsTmp = products.sort((a, b) => b.productDetailModel.valor - a.productDetailModel.valor)
                break;
            default:
                productsTmp = products.sort((a, b) => a.productDetailModel.id - b.productDetailModel.id)
                break
        }

        if (localFilters.min)
            productsTmp = products.filter(x => x.productDetailModel.valor >= Number.parseInt(localFilters.min))

        if (localFilters.max)
            productsTmp = products.filter(x => x.productDetailModel.valor <= Number.parseInt(localFilters.max))

        console.log("Entro");
        setShownProducts(productsTmp)
    }, [products])

    return (
        <React.Fragment>
            <div className="page-content">
                <Row style={{ marginTop: "10px" }}>
                    <Col lg="3">
                        <ProductFilters sendFilters={newFilters} params={{
                            searchType: SEARCH_BY_STORE,
                            searchValue: params.id
                        }} />
                    </Col>
                    <Col md="8">
                        <ProductList products={shownProducts || []} />
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}