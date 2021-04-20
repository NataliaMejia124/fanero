import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { UserService } from "../../services/userService";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import toastr, { success } from 'toastr'
import { StoreService } from '../../services/storeService';
import { useParams } from "react-router";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ApiConstants } from '../../common/apiConstants';

export default function PSE(props) {

    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const storeService = new StoreService();
    const history = useHistory();
    const [typeId, setTypeId] = useState([])
    const [banks, setBanks] = useState([])
    const params = useParams();
    const usuario = JSON.parse(localStorage.getItem('userInfo'))
    let nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`
    console.log(nombreCompleto)
    const [selectBank, setSelectBank] = useState([]);
    const [selectType, setSelectType] = useState([]);


    const getTypeId = async () => {
        const data = await userService.getIdentificationType();
        setTypeId(data)
        console.log(data)
    }

    const getListBank = async () => {
        const response = await storeService.getBank(5);
        setBanks(response.banks)
        console.log(response)
    }

    const valueSelect = (e) => {
        const savedId = e.target.value
        setSelectBank(banks.find(x => x.pseCode == savedId))
        console.log(banks.find(x => x.pseCode == savedId))
    }

    const valueTypeId = (e) => {
        const savedTypeId = e.target.value
        setSelectType(typeId.find(x => x.valor== savedTypeId))
        console.log(typeId.find(x => x.valor== savedTypeId))
    }

    const initialValues = {
        "TipoCliente": "N", //esta en el input del form
        "TipoIdentificacion": "CC",
        "NumeroIdentificacion": '',
        "CorreoElectronico": '',
        "PseCode": '',


        "IdOrden": parseInt(params.id),
        "NombreTitular": nombreCompleto,
        "Telefono": null,
        "TipoTarjetaCredito": null,
        "NumeroTarjetaCredito": null,
        "CodigoSeguridadTarjeta": null,
        "FechaExpiracionTarjeta": null,
        "NombreTarjetaCredito": null,
        "NumeroCuotas": 0,
        "Ip": "",
        "DeviceSession": "",
        "Cookie": null
    }
    const formValidation = Yup.object().shape({
        NumeroIdentificacion: Yup.string().required("requerido"),
        CorreoElectronico: Yup.string().required("requerido")
    })

    const enviar = async values => {
        let request = {
            ...values,
            "TipoIdentificacion": selectType.valor,
            "PseCode": selectBank.pseCode,
        }
        console.log(request)
        console.log(JSON.stringify(request))
        
        const response = await userService.psePayment(request);
        if ( JSON.parse(response.message).codSalida === ApiConstants.PSE_STATUS.PENDING) {
            toastr.success("BIEEEEEEN");
            console.log(response.message)
            history.push({
                pathname: `/PaymentConfirmationPSE/${params.id}`,
            })
            window.open(JSON.parse(response.message).urlSalida, 'framename');
            

        } else {
            toastr.info(JSON.parse(response.message).mensajeSalida);
            console.log(response)
            console.log(response.message)
        }
    }

    useEffect(() => {
        getTypeId();
        getListBank();
    }, [])

    return (

        <Formik initialValues={initialValues} onSubmit={enviar} validationSchema={formValidation} >
            <Form>
                <div className="form-group">
                    <select className="form-control" onChange={(e) => valueSelect(e)}>
                        {
                            banks.map((b, key) => {
                                return <option key={key} value={b.pseCode}
                                >{b.description}</option>

                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tipoPersona" className="control-label">Tipo Persona</label>
                    <select class="form-control" placeholder="Tipo Persona">
                        <option>Natural</option>
                        <option>Juridica</option>
                    </select>
                </div>

                <div className="form-group">
                    <select className="form-control" onChange={(e) => valueTypeId(e)}>
                        {
                            typeId.map((x, key) => {
                                return <option key={key} value={x.valor}>{x.descripcion}</option>

                            })
                        }
                    </select>
                </div>

                <div className="form-group">
                    <Field name="NumeroIdentificacion" id="NumeroIdentificacion" type="text"
                        className="form-control" required placeholder="Número de documento" />
                    <ErrorMessage name="NumeroIdentificacion" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                </div>
                <div className="form-group">
                    <Field name="CorreoElectronico" id="CorreoElectronico" type="text" className="form-control" required placeholder="Correo electronico" />
                    <ErrorMessage name="CorreoElectronico" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
                </div>
                <div className="mt-4">
                    <button className="boton3-fanero btn-block mt-5" type="submit" >Pagar con PSE</button>
                </div>
            </Form>
        </Formik>
    )
}
