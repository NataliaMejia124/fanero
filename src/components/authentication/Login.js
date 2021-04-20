import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import { Row, Col, CardBody, Card, Container } from "reactstrap";

// Redux
// import {useDispatch, useSelector} from "react-redux";
import { loginSuccess, setLoading } from "../../store/actions";
import { useDispatch } from "react-redux";

import { firebaseApp, googleAuthProvider } from '../../common/firebaseConfig'
// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// import images
import profile from "../../assets/images/logoFanerW.png";
import { UserService } from '../../services/userService';
import { ApiConstants } from '../../common/apiConstants';

export default function Loguin(props) {
    const history = useHistory();
    const userService = new UserService();
    // const [user, setUser] = useState();
    const dispatch = useDispatch();
    useEffect(() => {

    })

    const socialNetworkLogIn = async (data) => {
        //Crear request para registrar/loguear usuario 
        const request = {
            "uid": data.user.uid,
            "clave": Math.random().toString(36).substring(8), // para no dejar la contraseña vacía (se debe validar que guardo aquí)
            "email": data.user.email,
            "nivel": "Explorador",
            "nombres": data.additionalUserInfo.profile.given_name,
            "apellidos": data.additionalUserInfo.profile.family_name,
            "tipoIdentificacion": "",
            "telefono": data.user.phoneNumber,
            "numeroDocumento": "",
            "totalPuntos": 0,
            "temporal": "No",
            "deviceToken": "",
            "aceptoTyC": true,
            "autorizoTDP": true
        };

        const user = await userService.socialNetworkLogIn(request);
        successLogIn(user);
    }

    const successLogIn = (user) => {
        dispatch(loginSuccess(user));
        history.push("home")
    }

    const logIn = async (event, values, errors) => {
        dispatch(setLoading(true));
        try {
            const response = await userService.logIn(values);
            if (!response.success)
                console.log("Login failed") //No se si esto lo deba validar aquí o en apiBase
            //TODO: Preguntar Weimar: Creo que el api está fallando porque retorna un error de código.

            delete values.password;
            const profile = await userService.getProfileEmail(values);
            successLogIn(profile);
            dispatch(setLoading(false));
        }
        catch{
            dispatch(setLoading(false));
            return;
        }
    }

    const googleLogIn = async () => {
        await firebaseApp
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(result => {
                socialNetworkLogIn(result)
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary">
                                    <Row className="d-flex justify-content-center">
                                        <Col className="col-6 m-2 ">
                                            <img src={profile} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">

                                    <div className="p-2">

                                        <AvForm className="form-horizontal" onValidSubmit={logIn}>

                                            {/* <Alert color="danger">jose</Alert>  */}

                                            <div className="form-group">
                                                <AvField name="email" label="Usuario" value="test-jose@yopmail.com" className="form-control" placeholder="Ingrese su usuario" type="email" required
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Escriba su usuario' }
                                                    }} />
                                            </div>

                                            <div className="form-group">
                                                <AvField name="password" label="Clave" value="123456" type="password" required placeholder="Ingrese su clave"
                                                    validate={{
                                                        required: { value: true, errorMessage: 'Escriba la contraseña' }
                                                    }} />
                                            </div>

                                            {/* <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                            </div> */}

                                            <div className="mt-3">
                                                <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Iniciar</button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock mr-1"></i> Olvidaste tu clave?</Link>
                                            </div>

                                            <div className="mt-3">
                                                <button className="btn btn-block waves-effect waves-light waves-effect btn btn-outline-light" onClick={() => googleLogIn()}>
                                                    <i className="fab fa-google float-left"></i>
                                                    Accede con Google
                                                </button>
                                            </div>
                                        </AvForm>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>No tienes una cuenta ? <Link to="register" className="font-weight-medium text-primary"> Registrate </Link> </p>
                                {/* <p>© {new Date().getFullYear()} Skote. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}