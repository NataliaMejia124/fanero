import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, CardBody, Card, Container } from "reactstrap";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/actions'
import { ApiConstants } from "../../common/apiConstants";
import { UserService } from "../../services/userService";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import profile from "../../assets/images/NoPic_Color.png";
import fan from "../../assets/images/LogoF_Color.png";

export default function InformationUser(props) {

    const user = useSelector(x => x.Login.user);
    const [mAddInfo, setMAddInfo] = useState(false);
    const dispatch = useDispatch();
    const userService = new UserService();
    const [editar, setEditar] = useState(false);
    const [valoresIniciales, setvaloresIniciales] = useState();

    const onSubmit = async values => {
        try {
            let request = {
                ...user,
                ...values
            }
            console.log(JSON.stringify(request));
            request.idGenero = Number.parseInt(values.idGenero);
            const response = await userService.updatePerson(request);
            if (response === 1)
                toastr.success("Datos actualizados");
            dispatch(loginSuccess(request));
            localStorage.setItem(ApiConstants.LS_USER, JSON.stringify(request));
            setMAddInfo(false);
        } catch{
            // dispatch(setLoading(false));
        }
        // dispatch(setLoading(false));
    }

    let variablesForm = useFormik({
        initialValues: {
            nombres: user ? user.nombres : "",
            apellidos: user ? user.apellidos : "",
            fechaNacimiento: user ? new Date(user.fechaNacimiento).toISOString().substring(0, 10) : null,
            idGenero: user ? user.idGenero.toString() : "",
            tipoIdentificacion: user ? user.tipoIdentificacion : "",
            numeroDocumento: user ? user.numeroDocumento : "",
            telefono: user ? user.telefono : "",
            male: user && user.idGenero == 3 ? true : false,
            female: user && user.idGenero != 3 ? true : false,
        },
        validationSchema: Yup.object({
            nombres: Yup.string().required("requerido"),
            apellidos: Yup.string().required("requerido"),
            fechaNacimiento: Yup.string().required("requerido"),
            idGenero: Yup.string().required("requerido"),
            tipoIdentificacion: Yup.string().required("requerido"),
            numeroDocumento: Yup.string().required("requerido"),
            telefono: Yup.string().required("requerido"),
        }), onSubmit: async valores => {}
    });

    useEffect(() => {
        if (user && (!user.idGenero ||
            !user.tipoIdentificacion ||
            !user.numeroDocumento ||
            !user.telefono)) {
            console.log(variablesForm.initialValues);
            setvaloresIniciales()
        }
    }, [])

    function UpdateData() {
        editar = !editar;
    }

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="bx bx-home h2"></i>
                </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} lg={8} xl={10}>
                            <Card className="" style={{ height: "150vh" }}>
                                <Row className="d-flex justify-content-center pt-4 pb-3">
                                    <img src={fan} alt="" className="img-fluid" style={{height:'50px'}} />
                                    <label htmlFor="Nomenclatura" className="control-label m-3"><h5> Datos personales </h5></label>
                                </Row>
                                <Row className="d-flex justify-content-center pt-2 pb-3">
                                    <img src={profile} alt="" className="img-fluid" />
                                </Row>
                                <CardBody>
                                    <div className="p-2">
                                        <Formik initialValues={variablesForm.initialValues} onSubmit={onSubmit} validationSchema={variablesForm.validationSchema}>
                                            <Form>
                                                <Row>
                                                    <Col sm={6}>
                                                        <div className="form-group">
                                                            <label htmlFor="nombres" className="control-label text-muted">Nombres</label>
                                                            <Field disabled name="nombres" id="nombres" className="form-control" type="text" required placeholder="" />
                                                            <ErrorMessage name="nombres" />
                                                        </div>
                                                    </Col>

                                                    <Col sm={6}>
                                                    <div className="form-group">
                                                            <label htmlFor="apellidos" className="control-label text-muted">Apellidos</label>
                                                            <Field disabled name="apellidos" id="apellidos" className="form-control" type="text" required placeholder="" />
                                                            <ErrorMessage name="apellidos" />
                                                        </div>
                                                        
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={6}>
                                                        <div className="form-group">
                                                            <label htmlFor="tipoIdentificacion" className="control-label text-muted">Tipo de identificación</label>
                                                            <Field disabled as="select" className="form-control" name="tipoIdentificacion" id="tipoIdentificacion" required>
                                                                <option value="CC">Cédula de ciudadanía</option>
                                                                <option value="CE">Cédula de Extrangería</option>
                                                            </Field>
                                                            <ErrorMessage name="tipoIdentificacion" />
                                                        </div>
                                                    </Col>

                                                    <Col sm={6}>
                                                        <div className="form-group">
                                                            <label htmlFor="numeroDocumento" className="control-label text-muted">Numero de documento</label>
                                                            <Field disabled name="numeroDocumento" id="numeroDocumento" className="form-control" type="text" required placeholder="" />
                                                            <ErrorMessage name="numeroDocumento" />
                                                        </div>

                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col sm={6}>
                                                        <div className="form-group">
                                                            <label htmlFor="telefono" className="control-label"> <b>Celular</b></label>
                                                            <Field disabled={!editar} name="telefono" id="telefono" type="text" className="form-control" required placeholder="<b></b>" />
                                                            <ErrorMessage name="telefono" />
                                                        </div>
                                                    </Col>    

                                                    <Col sm={6}>
                                                        <div className="form-group ">
                                                            <label htmlFor="fechaNacimiento" className="control-label d-flex"><b> ¿Cuando naciste? </b></label>
                                                            <div class="row d-flex justify-content-center">
                                                                <div class="col-12 px-45 mx-5 d-flex justify-content-between">
                                                                    <Field disabled={!editar} name="fechaNacimiento" id="fechaNacimiento" type="date" max={new Date().toISOString().substring(0, 10)} className="form-control" required placeholder="Apellidos*" />
                                                                    <ErrorMessage name="fechaNacimiento" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>                          
                                                </Row>

                                                <Row className>
                                                    <Col md={12}>
                                                        <div className="form-group">
                                                            <label htmlFor="idGenero" className="control-label pt-4 d-flex justify-content-center"><b>¿Cuál es tu genero?</b></label>

                                                            <ErrorMessage name="idGenero" />
                                                        </div>
                                                        <div className="row d-flex justify-content-center">
                                                                <div className="col-md-5 col-sm-8 px-45 mx-5 d-flex justify-content-between">
                                                                    <label>
                                                                        <Field disabled={!editar}  className="" type="radio" value="1" name="idGenero" />
                                                                        Hombre
                                                                    </label>
                                                                    <label>
                                                                        <Field disabled={!editar}  className="" type="radio" value="0" name="idGenero" />
                                                                        Mujer
                                                                    </label>

                                                                </div>
                                                            </div>
                                                    </Col>
                                                </Row>

                                                <div className="mt-4">
                                                    {
                                                        editar ? (<input className="btn btn-primary btn-block waves-effect waves-light" type="submit" value="Actualizar" />
                                                        ) :
                                                            (<input onClick={() => setEditar(true)} className="btn btn-info btn-block waves-effect waves-light" type="button" value="Editar datos" />)
                                                    }
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </CardBody>
                            </Card>

                        </Col>
                    </Row>
                </Container>
            </div>


        </React.Fragment>

    );

}