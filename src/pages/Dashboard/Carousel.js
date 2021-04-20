import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import Carousel  from 'react-elastic-carousel'    ;
import { Link , Route} from "react-router-dom";
import "./dashboard.scss";

import Item from '../Utility/item'
import { StoreService } from '../../services/storeService';

//componente para enviar el id de empresas 

import EcomerceProductsBusiness from '../Ecommerce/EcomerceProductsBusiness'

class CarouselBusiness extends Component{
    constructor(props){
        super(props);

        //buscar cómo evito esta instancia
        this.storeService = new StoreService();

        this.state={
            Business:[],
            isFetch: true,
        };
    }
    async componentDidMount(){
        let data = await this.storeService.getActive();
        this.setState({Business: data, isFetch: false})
    }
    render(){
        if(this.state.isFetch){
            return '';
        }else{
            return(
                <Carousel itemsToShow={3} className='CarouselBusiness'>
                     {
                     this.state.Business.map((business) =>
                      <Item>
                         <Card>
                            <CardBody className='pt-12'>
                                <Row>
                                    <Col sm="12">
                                        <div className="pt-12">
                                            <Row>
                                                <Col xs="12">
                                                <Link to={{
                                                        pathname:'/ecommerce-product-business/',
                                                        state:{id: business.id}
                                                    }}>
                                                     <img id='IconBusiness' src={business.logo} alt="" className="img-fluid" />
                                                    </Link>
                                                </Col>
                                            </Row>
                                            <div className="text-center mt-4">
                                                <h4>
                                                    <p>
                                                        <strong>{business.nombre}</strong>
                                                    </p>    
                                                </h4>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        </Item>
                    )
                }
            </Carousel>
            );
        }
    }
}

export default CarouselBusiness;