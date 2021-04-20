import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid={true} className="d-none d-sm-block">
                    <Row>
                        <Col md={7} className="basicInfo">
                            <span className="d-block">Fanero es una empresa Colombiana</span>
                            <span className="d-block">© 2020 Fanero. Todos los derechos reservados. <a href="http://www.katary.co" rel="noopener noreferrer" target="_blank" className="link" >Katary Software Factory</a></span>
                            <span className="d-block">Contactanos: <a href="info@fanero.co" className="link">info@fanero.co</a></span>
                            <strong className="d-block">
                                <a href="https://www.fanero.co/TratamientoDatos/TratamientoDatosPersonales.html" className="footer-link">Tratamiento de Datos Personales</a>
                            </strong>
                            <a href="https://www.facebook.com/faneromall" target="_blank" rel="noopener noreferrer" >
                                <i className="fab fa-facebook fa-2x mr-3" style={{ color: "#606060" }}></i>
                            </a>
                            <a href="https://www.instagram.com/faneromall/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x mr-3" style={{ color: "#606060" }}></i>
                            </a>

                        </Col>
                    </Row>
                </Container>
                <div className="footer-menu row d-sm-none">
                    <a className="col-2 offset-2" href="/Home">
                        <i className="menu-item active home"></i>
                    </a>
                    {/* <div className="col-2">
                        <i className="menu-item near"></i>
                    </div>
                    <div className="col-2">
                        <i className="menu-item search"></i>
                    </div> */}
                    <a className="col-2 offset-1" href="/favorites">
                        <i className="menu-item favorites"></i>
                    </a>
                    <a className="col-2 offset-1" href="/cart">
                        <i className="menu-item shopping-cart"></i>
                    </a>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
