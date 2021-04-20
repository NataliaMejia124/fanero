
import React from "react";
import { Row, Col, Card, CardBody, Container, Label } from "reactstrap";

import { Link, useHistory } from "react-router-dom";

import { Formik, Form, Field } from 'formik';

import profile from "../../assets/images/logoFanerW.png";
import correo from "../../assets/images/Compras2.png";
import { UserService } from "../../services/userService";
import toastr from 'toastr'

export default function ForgetPassword() {
  const userService = new UserService();
  const initialValues = { email: '' }
  const history = useHistory()
  const onSubmit = async values => {
    let response = await userService.recoveryPassword(values);
    toastr.info("Confirmación enviada a su correo");
    history.push("login");
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark"><i className="bx bx-home h2"></i></Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="">
                <div className="bg-primary">
                  <Row className="d-flex justify-content-center">
                    <Col className="col-4 m-2 ">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <div className="mt-4 text-center">
                  <h5> Recuperar clave </h5> 
                  <span className="text-muted">Por favor ingresa el correo que registraste en nuestra App</span>
                  
                  <Row className="d-flex justify-content-center">
                    <Col className="col-5 m-2 ">
                      <img src={correo} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <div className="">
                  <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form className="form-horizontal">                      
                      <Row>
                        <Col className="d-flex justify-content-center">
                          <Field name="email" id="email" className="form-control" style={{width: '80%' }} placeholder="Correo electrónico" type="email" required />
                        </Col>
                      </Row>
                      <Row className="form-group">
                        <Col className="text-center">
                          <button className="btn btn-primary mt-2 w-md waves-effect waves-light" type="submit">Continuar</button>
                        </Col>
                      </Row>
                    </Form>
                  </Formik>
                </div>
              </Card>
              <div className="text-center">
                <p>
                  Regresar al {" "}
                  <Link to="login" className="font-weight-medium text-primary" > Login </Link>{" "} </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  );
}
