import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Container, } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { ApiConstants } from '../../common/apiConstants';

// Formik 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Redux
import { useDispatch } from 'react-redux'
import { loginSuccess, setLoading } from "../../store/actions";

// import images
import profile from "../../assets/images/logoFanerW.png";
import imagen from "../../assets/images/imgLg.png";
import { UserService } from "../../services/userService";

import toastr from 'toastr'


const initialValues = {
  nombres: "test",
  apellidos: "rosa",
  fechaNacimiento: "2010-05-12",
  idGenero: 1,
  tipoIdentificacion: "CC",
  numeroDocumento: "12001",
  telefono: "12001",
  //address: "Dirección asociado 001",
  email: "test12001@yopmail.com",
  clave: "test12001",
  confirmaClave: "test12001"
}

const formValidation = Yup.object().shape({

  nombres: Yup.string().required('Requerido'),
  apellidos: Yup.string().required('Requerido'),
  fechaNacimiento: Yup.string().required("requerido"),
  idGenero: Yup.string().required("requerido"),
  tipoIdentificacion: Yup.string().required("requerido"),
  numeroDocumento: Yup.string().required("requerido"),
  telefono: Yup.string().required("requerido"),
  //address: Yup.string().required("requerido"),
  email: Yup.string().email().required("requerido"),
  clave: Yup.string()
    .required("requerido")
    .min(8, 'Minimo 8 caracteres')
    .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{8,}$/, "Debe contener minimo un número y una letra Mayúscula"),
  confirmaClave: Yup.string().oneOf([Yup.ref('clave'), null], "Las contraseñas no coinciden"),
});

export default function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userService = new UserService();

  const onSubmit = async values => {
    values.idGenero = Number.parseInt(values.idGenero);
    dispatch(setLoading(true));
    const user = await userService.addPerson(values);
    if (user) {
      user.new = true;
      toastr.success("Registro exitoso, Su información ha sido creada con exito");
      successLogIn(user);

    }
    dispatch(setLoading(false));
  }

  const successLogIn = (user) => {
    dispatch(loginSuccess(user));
    history.push("home")
  }


  useEffect(() => {

  })


  return (
    <React.Fragment>

      <div className="account-pages">
        <div className="">
          <Row className="bg-primary justify-content-center">
            <Col className="col-2 m-2">
              <img src={profile} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <div className="row">
          <div className="col-md-3 mt-4">
          {/* <img src={imagen} alt="" className="img-fluid" /> */}
          </div>
          <div className="col-md-9">

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidation}>
              <Form className="form-horizontal m-3" >


                {/* <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Default</span>
                <Field type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
              </div> */}

                <Row form>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="nombres" className="control-label">Nombres</label>
                      <Field name="nombres" id="nombres" className="form-control" placeholder="Nombres*" type="text" required />
                      <ErrorMessage name="nombres" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="apellidos" className="control-label">Apellidos</label>
                      <Field name="apellidos" id="apellidos" type="text" className="form-control" required placeholder="Apellidos*" />
                      <ErrorMessage name="apellidos" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="fechaNacimiento" className="control-label">Fecha de nacimiento</label>
                      <Field name="fechaNacimiento" id="fechaNacimiento" type="date" className="form-control" required placeholder="Apellidos*" />
                      <ErrorMessage name="fechaNacimiento" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="idGenero" className="control-label">Genero</label>
                      <Field as="select" className="form-control" name="idGenero" id="idGenero">
                        <option value="0">Femenino</option>
                        <option value="1">Masculino</option>
                      </Field>
                      <ErrorMessage name="idGenero" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="tipoIdentificacion" className="control-label">Tipo de identificación</label>
                      <Field as="select" className="form-control" name="tipoIdentificacion" id="tipoIdentificacion" required>
                        <option value="CC">Cédula de ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                      </Field>
                      <ErrorMessage name="tipoIdentificacion" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="numeroDocumento" className="control-label">Numero de documento</label>
                      <Field name="numeroDocumento" id="numeroDocumento" className="form-control" type="text" required placeholder="" />
                      <ErrorMessage name="numeroDocumento" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="telefono" className="control-label">Teléfono</label>
                      <Field name="telefono" id="telefono" type="text" className="form-control" required placeholder="" />
                      <ErrorMessage name="telefono" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="email" className="control-label">Email</label>
                      <Field name="email" id="email" type="email" className="form-control" required />
                      <ErrorMessage name="email" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="clave" className="control-label">Clave</label>
                      <Field name="clave" id="clave" type="password" className="form-control" required placeholder="" />
                      <ErrorMessage name="clave" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="form-group">
                      <label htmlFor="confirmaClave" className="control-label">Confirmar clave</label>
                      <Field name="confirmaClave" id="confirmaClave" type="password" className="form-control" required placeholder="" />
                      <ErrorMessage name="confirmaClave" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                  </Col>
                </Row>
                <div className="col-md-9">
                  <p className="mb-0">
                    Al hacer clic en Registrarse, acepta los{" "}
                    <a href="https://www.fanero.co/termcondiciones.pdf" className="text-primary">
                      Términos y condiciones
                </a>{" "} y el {" "}
                    <a href="https://www.fanero.co/politica.pdf" className="text-primary">
                      Tramiento de Datos Personales
                </a> de FANERO.
              </p>
                  <div className="col-md-6 offset-md-2 mt-3">
                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit" > Registrarse </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="container-fluid">

          <div className="mt-3 text-center">
            <p>
              Tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-weight-medium text-primary"
              >
                {" "}
                    Inicia sesión
                  </Link>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="">
          <i className="bx bx-home h2 text-light"></i>
        </Link>
      </div>

    </React.Fragment>
  );
}