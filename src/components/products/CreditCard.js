import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { UserService } from "../../services/userService";
import * as Yup from 'yup';
import toastr, { success } from 'toastr'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { Fragment } from 'react';
import { Modal, FormGroup, Row, Col } from "reactstrap";
import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router";

export default function CreditCard(props) {

    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const params = useParams();
    const history = useHistory();
    let year = new Date().getFullYear();
    let año = []
    for (let i = year; i <= year + 8; i++) {
        año.push(i)
    }
    // console.log(año.substr(-2)) 

    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: ""

    })

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleFocus = (e) => {
        setState({
            ...state,
            focus: e.target.name

        })
    }
    const [mes, setMes] = useState()
    const getValueMes = (e) => {
        let data = e.target.value;
        setMes(data)
        console.log(e)

    }

    //recuperar valores del form
    const recuperarVal = () => {
        console.log("number =>", state.number)
        console.log("number =>", state.name)
        console.log("number =>", state.expiry)
        console.log("number =>", state.cvc)
        console.log(JSON.stringify(state))
    }

    const initialValues = {

        "numeroTarjetaCredito": '',
        "codigoSeguridadTarjeta": '',
        "nombreTitular": '',
        "correoElectronico": '',
        "fechaExpiracionTarjeta": '',
        "numeroIdentificacion": '',


        // tipoTarjetaCredito = ValiditionCard.GetType(ent_numero_tarjeta.Text),
        "nombreTarjetaCredito": "APPROVED",
        "numeroCuotas": 1,
        "idOrden": parseInt(params.id),
        "tipoCliente": "N",
        "tipoIdentificacion": "CC",
        "tipoTarjetaCredito": '',
        "telefono": null,
        "pseCode": null,

        "ip": "",
        "deviceSession": "",
        "cookie": null

    }
    const formValidation = Yup.object().shape({
        // nombreTitular: Yup.string().required("requerido")
        //     .matches(/[a-zA-Z]/, "Debe contener solo letras")//como poner q no tenga tildes ?
        //     .max(15, 'Maximo 15 caracteres'),
        numeroIdentificacion: Yup.string().required("requerido")
            .matches(/[0123456789]{1,9}/, "Debe contener solo números"),
        correoElectronico: Yup.string().required("requerido"),
        // cvv: Yup.string().required("requerido")
        //     .max(3, 'Maximo 3 caracteres')
        //     .matches(/[0123456789]{1,9}/, "Debe contener solo números"),
        // numeroTarjeta: Yup.string().required("requerido")
        //     .min(13, 'Minimo 13 caracteres')
        //     .max(16, 'Maximo 16 caracteres')
        //     .matches(/[0123456789]{1,9}/, "Debe contener solo números"),
        // fechaExpiracion: Yup.string().required("requerido"),

    })

    const [tipoTC, setTipoTC] = useState();
    const valid = (a, isValid) => {
        console.log("POPO", a, isValid)
        if (isValid === true) {
            setTipoTC(a.issuer)
        }
        else {
            console.log("tarjeta no valida")
        }
    }

    const onSubmit = async values => {
        let request = {
            ...values,
            "numeroTarjetaCredito": state.number,
            "codigoSeguridadTarjeta": state.cvc,
            "nombreTitular": state.name,
            "fechaExpiracionTarjeta": `20${state.expiry}/${mes}`,
            "tipoTarjetaCredito": tipoTC.toUpperCase()

        }
        console.log(JSON.stringify(request))
        const response = await userService.creditCardPayment(request);
        if (JSON.parse(response.MensajeSalida) === "APPROVED") {
            toastr.success("BIEN PAGO X TARJETA");
            history.push({
                pathname: `/PaymentConfirmationPSE/${params.id}`,
            })

        }
        if (JSON.parse(response.MensajeSalida) === "ANTIFRAUD_REJECTED") {
            toastr.info('La transacción fue rechazada por el sistema anti-fraude', 'ANTIFRAUD_REJECTED',
                {
                    "preventDuplicates": true
                })

        }
        else {
            toastr.info("PAILA EL PAGO");
            console.log(response)
        }
    }
    return (
        <Fragment>
            <Cards
                number={state.number}
                name={state.name}
                expiry={state.expiry}
                cvc={state.cvc}
                focused={state.focus}
                callback={valid}
            />
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidation}>
                <Form>
                    <div className="form-group mt-4">
                        <Field name="name" id="name" type="text" className="form-control"
                            required placeholder="Nombre titular de la tarjeta" autocomplete="off"
                            maxLength="15"
                            onChange={handleInputChange}
                            onFocus={handleFocus} />
                        <ErrorMessage name="name" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>

                    <div className="form-group">
                        <Field name="numeroIdentificacion" id="numeroIdentificacion" type="text" className="form-control"
                            required placeholder="Número de identificación" />
                        <ErrorMessage name="cedula" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field name="correoElectronico" id="correoElectronico" type="text" className="form-control"
                            required placeholder="Correo titular de la tarjeta" />
                        <ErrorMessage name="orreoElectronico" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                        <Field name="number" id="number" type="number" className="form-control"
                            required placeholder="Número de la tarjeta" autocomplete="off"
                            minLength="13"
                            maxLength="16"
                            onChange={handleInputChange}
                            onFocus={handleFocus} />
                        <ErrorMessage name="number" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                    </div>

                    <div className="form-row ">
                        <div class="form-group col-md-8">
                            <label htmlFor="expiry" className="control-label d-flex">Fecha de expiración</label>
                            <Row>
                                <Col>
                                    <select name="mes" className="form-control" id="mes"
                                        onFocus={handleFocus}
                                        onChange={(e) => getValueMes(e)}>
                                        <option disabled select>Mes</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </Col>
                                <Col>
                                    <select name="expiry" id="selectano" className="form-control" onChange={handleInputChange}
                                        onFocus={handleFocus}>
                                        <option disabled select>Año</option>
                                        {
                                            año.map((x, key) =>
                                                <option value={x.toString().substring(2, 4)} key={key}>{x}</option>)
                                        }
                                    </select>
                                </Col>
                            </Row>

                        </div>

                        <div className="form-group col-md-4 mt-4">
                            <Field name="cvc" id="cvc" type="text" className="form-control"
                                required placeholder="CVV" autocomplete="off"
                                maxLength="4"
                                onChange={handleInputChange}
                                onFocus={handleFocus} />
                            <ErrorMessage name="cvc" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="boton3-fanero btn-block mt-5" type="submit" onClick={recuperarVal}>Pagar con tarjeta</button>
                    </div>
                </Form>
            </Formik>

        </Fragment>

    )
}

// Json que debo armar:
// PagoRequest pago = new PagoRequest
// {
//         numeroTarjetaCredito = ent_numero_tarjeta.Text,
//         codigoSeguridadTarjeta = ent_cvv.Text,
//         nombreTitular = ent_nombre_titular.Text,
//         correoElectronico = ent_correo_titula.Text,
//         tipoTarjetaCredito = ValiditionCard.GetType(ent_numero_tarjeta.Text),
//         nombreTarjetaCredito = "APPROVED",
//         fechaExpiracionTarjeta = pi_anio_venc.SelectedItem.ToString() + "/" + pi_mes_venc.SelectedItem.ToString(),
//         numeroCuotas = 1,
//         idOrden = IdOrden,
//         tipoCliente = "N",
//         tipoIdentificacion = "CC",
//         numeroIdentificacion = ent_identificacion.Text,
//         ip = Dns.GetHostAddresses(Dns.GetHostName())[0].ToString(),
//         deviceSession = App.GuidUnique
// };