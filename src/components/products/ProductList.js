import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import Product from '../../components/products/Product'
import { StoreService } from '../../services/storeService';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import toastr, { success } from 'toastr'

export default function ProductList(props) {
    const [products, setProducts] = useState([]);

    const storeService = new StoreService();
    const [store, setStore] = useState([])
    const params = useParams();
    const [favoritos, setFavoritos] = useState([])
    const user = useSelector(x => x.Login.user);

    let mounted = true;
    useEffect(() => {
        getActiveStores();
        getList();
        return function cleanup() {
            mounted = false
        }
    }, [])

    React.useEffect(() => {
        setProducts(props.products);
    }, [props.products])

    const getActiveStores = async () => {
        if (!mounted) return;

        const data = await storeService.getActive();
        if (data)
            setStore(data.find(x => x.id == params.id));

    }

    const addFavoritos = async (IdPersona, idProducto) => {
        const response = await storeService.addFav(IdPersona, idProducto);
        let favorites = favoritos
        if (response.success) {
            toastr.success("Agregado a favoritos");

        } else {
            toastr.info("pailax");
        }
        getList();
    }
    const getList = async () => {
        if (user) {
            const data = await storeService.getFavList(user.id);
            if (data)
                setFavoritos(data);
        }
    }
    const deleteFavorite = async (IdPersona, idProducto) => {
        const response = await storeService.deleteFav(IdPersona, idProducto);
        // if (response.success) {
        //     toastr.success("Eliminado");

        // }else{
        //     toastr.info("pailax");
        // }
        getList();
    }
    const toggleFavorite = async (id, estado) => {
        if (estado) {
            user ? await addFavoritos(user.id, id) : toastr.info('Debe iniciar sesión para marcar un producto como favorito','Productos favoritos')
        }
        else {
            await deleteFavorite(user.id, id)
        }
    }


    return (
        <React.Fragment>
            <div className="panel panel-secundary">
                <div className="panel-body">
                    {
                        store &&
                        <Row sm="12">
                            <Col className="col-4 text-center mb-3">
                                <a href={`/storeProducts/${store.id}`}>
                                    <img src={store.logo} alt={store.nombre} style={{ height: '80px', width: '80px' }} />

                                </a>
                            </Col>

                            <Col className="col-4 text-center">
                                <h2>{products.length} Productos</h2>
                                <span className="text-justify">{store.nombre}</span>
                            </Col>

                            <Col className="col-4 text-right">
                                <Button href={"/home"}> Volver </Button>
                            </Col>
                        </Row>
                    }
                </div>
            </div>


            <Row>
                {
                    products.map((item, key) =>
                        <Product key={key} toggleFavorite={toggleFavorite} product={{
                            id: item.productDetailModel.id,
                            image: item.productDetailModel.fotoPrincipal,
                            name: item.productDetailModel.descripcion,
                            store: item.productDetailModel.nombreTienda,
                            rating: item.productDetailModel.calificacion,
                            newPrice: item.productDetailModel.valorMoneda,
                            price: item.productDetailModel.valor,
                            idStore: item.productDetailModel.idTienda,
                            Referencia: item.productDetailModel.referencia,
                            Iva: item.productDetailModel.iva,
                            Descuento: item.productDetailModel.descuento,
                            favorite: favoritos.find(a => a.id === item.productDetailModel.id)

                        }} />
                    )
                }

            </Row>
        </React.Fragment>
    );
}