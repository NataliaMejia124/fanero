import React, { useState, useEffect} from 'react';
import { Link} from "react-router-dom";
//Import redux
// import {useDispatch, useSelector} from "react-redux";

//Import styles
import './style.scss';

//services
import { StoreService } from '../../services/storeService';

export default function StoreList(props) {
    //Services
    const storeService = new StoreService();

    const [stores, setStores] = useState([])
    
    

    let mounted = true;
    useEffect(() => {
        JSON.parse(localStorage.getItem('stores'))
        getActiveStores();
        return function cleanup() {
            mounted = false
        }
        
    },[])

    const getActiveStores = async () => {
        if(!mounted) return;
        const data = await storeService.getActive();
        if(data)
            setStores(data);
            localStorage.setItem('tiendas', JSON.stringify(data));
    }

    // const tiendas = value => {
    //     localStorage.setItem(JSON.stringify(stores))
    // }


    return (
        <React.Fragment>
            <div className="row">
                {
                    stores.map((store, key) => {
                        return (
                            <div key={key} className="col-4 text-center store-card">
                                <Link to={`/storeProducts/${store.id}`}>
                                    <img src={store.logo} alt={store.nombre} />
                                </Link> 
                                {
                                    store.metodosPago.map((metodo, i) => {
                                        console.log()
                                        return (
                                            
                                                <img className="store-img" key={i} src={metodo.icono} alt={metodo.nombre} />

                                        )

                                    })
                                }
                                <span className="store-name">{store.nombre}</span>
                                
                            </div>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}