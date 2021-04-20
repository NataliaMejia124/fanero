import React, {useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { UserService } from "../../services/userService";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import toastr, { success } from 'toastr'

export default function ModalAddAddress(props) {
    const initialValues = {
        nomenclatura: '',
        referencia: '',
        nombreRecibe: '',
        telefonoDireccion: '',

        esPrincipal: "No",
        DateRegister: "2020-01-01T00:00:00",
        latitud: "",
        longitud: "",
        barrio: null,
        TipoIdRecibe: null,
        NumDocRecibe: null

    }
    const formValidation = Yup.object().shape({
        Nomenclatura: Yup.string().required("requerido"),
        NombreRecibe: Yup.string().required("requerido"),
        Telefono: Yup.string().required("requerido"),
    })
    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const [saveOnce, setSaveOnce] = useState(false);

    const onSubmit = async values => {
        if (saveOnce) return;
        setSaveOnce(true)
        console.log(values)
        let request = {
            //...lista,
            ...values,
            IdPersona: user.id,
            UserId: `${user.id}`,
        }
        const response = await userService.addAddress(request);

        if (response.success) {
            toastr.success("Dirección agregada exitosamente");
            props.addressSaved(request)

        } else {
            toastr.info("No se agrego la dirección");
        }
    }
    return (
    
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidation}>
            <Form>
            <div className="form-group">
                <label htmlFor="Nomenclatura" className="control-label">Dirección</label>
                <Field name="Nomenclatura" id="Nomenclatura" type="text" className="form-control" required placeholder="" />
                <ErrorMessage name="Nomenclatura" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
            </div>

            <div className="form-group">
                <label htmlFor="Referencia" className="control-label">Alias</label>
                <Field name="Referencia" id="Referencia" type="text" className="form-control" required placeholder="" />
                <ErrorMessage name="Referencia" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage></div>
            <div className="form-group">
                <label htmlFor="NombreRecibe" className="control-label">Nombre de quién recibe</label>
                <Field name="NombreRecibe" id="NombreRecibe" type="text" className="form-control" required placeholder="" />
                <ErrorMessage name="NombreRecibe" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
            </div>

            <div className="form-group">
                <label htmlFor="Telefono" className="control-label">Teléfono</label>
                <Field name="Telefono" id="Telefono" type="text" className="form-control" required placeholder="" />
                <ErrorMessage name="Telefono" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-4">
                <button className="boton3-fanero btn-block" type="submit">Guardar</button>
            </div>
            </Form>
        </Formik>
    )

}
