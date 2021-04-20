import React, { Component } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../Dashboard/dashboard.scss";

import { StoreService } from "../../services/storeService";

// Rating Plugin
import StarRatingComponent from "react-star-rating-component";



class EcomerceProductsBusiness extends Component {
  constructor(props) {
    super(props);
    this.storeService = new StoreService();

    this.state = {
      Products: [],
      isFetch: true,
      idBusiness: -1
    };
  }
  async componentDidMount() {
    const idTienda = 2;
    if(idTienda != null){
      let data = await this.storeService.getProductosTienda(idTienda);

      let dataProductDetail = data.map((x) => x.productDetailModel);
  
      this.setState({ Products: dataProductDetail, isFetch: false });
      console.log(this.state.Products);
    }
  }

  render() {
    if (this.state.isFetch) {
      return "";
    } else {
      return (
        <React.Fragment>
          <div className="page-content">
            <Container>
              <Card>
                <CardBody className="pt-0">
                  <Row>
                    {this.state.Products.map((products) => (
                      <Col sm="3">
                        <div className="text-center pt-3">
                          <Row>
                            <Col xs="12" style={{lineHeight:"0%"}}>
                              <Link to="#"></Link>
                              <img
                                src={products.fotoPrincipal}
                                alt=""
                                style={{ width: "150px", height: "250px" }}
                                className="img-fluid"
                              />
                              <div className="text-center pt-3">
                                <p>{products.descripcion}</p>
                                <h4>
                                  <strong>{products.valorMoneda}</strong>
                                </h4>
                              </div>
                              <div className="p-1 text-center">
                                <StarRatingComponent
                                  value={products.calificacion}
                                  starCount={5}
                                />
                              </div>
                            </Col>
                          </Row>
                          
                        </div>
                      </Col>
                    ))}
                  </Row>
                </CardBody>
              </Card>
            </Container>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default EcomerceProductsBusiness;
