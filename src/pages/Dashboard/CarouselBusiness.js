import React, { Component } from "react";

import { Row, Col, Card, CardBody, Carousel } from "reactstrap";
import { Link } from "react-router-dom";

import profileImg from "../../assets/images/profile-img.png";

class CarouselBusiness extends Component{
    constructor(props){
        super(props);
        this.state={
            Business:[
                {name:"Abraham Delgado", nameIcon: profileImg} ,
                {name: "Ferretería Texcol", nameIcon: profileImg},
                {name: "Montagas", nameIcon:profileImg},
                {name: "Capitán Nirvana", nameIcon: profileImg},
                {name: "Katary Tecnología", nameIcon: profileImg},
                {name: "BlueLake", nameIcon: profileImg}
            ]
        };
    }
    render(){
       // const name = this.props.shop.name;
        //const nameIcon = this.props.nameIcon;
        return(
            <React.Fragment>
                    <Card sm="4">
                        <CardBody className='pt-0'>
                            <Row>
                                {
                                    this.state.Business.map((business, key) =>
                                        <Col sm="4">
                                            <div className="pt-4">
                                                <Row>
                                                    <Col xs="12">
                                                        <img src={business.nameIcon} alt="" className="img-fluid" />
                                                    </Col>
                                                </Row>
                                                <div className="text-center mt-4">
                                                    <h4>
                                                        <p>
                                                            <strong>{business.name}</strong>
                                                        </p>    
                                                    </h4>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                                </Row>
                        </CardBody>
                    </Card>
            </React.Fragment>       
        );
    }
}

export default CarouselBusiness;
