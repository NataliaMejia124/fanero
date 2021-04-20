import React, { useEffect, useState } from "react";

import { Container, Row, Modal } from "reactstrap";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

// Formik 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//Redux
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/actions'

//components 
import CarouselBanner from "./banner"
import StoreList from "../../components/store/StoreList";
import { UserService } from "../../services/userService";
import { useSelector } from "react-redux";
import { ApiConstants } from "../../common/apiConstants";

export default function Home(props) {
  const [mAddInfo, setMAddInfo] = useState(false);
  const user = useSelector(x => x.Login.user);
  const userService = new UserService();
  const dispatch = useDispatch();

  //formulario "completar datos personales"


  const initialValues = {
    fechaNacimiento: user ? new Date(user.fechaNacimiento).toISOString().substring(0,10) : null,
    idGenero: user ? user.idGenero : "",
    tipoIdentificacion: user ? user.tipoIdentificacion : "",
    numeroDocumento: user ? user.numeroDocumento : "",
    telefono: user ? user.telefono : "",
  }

  const formValidation = Yup.object().shape({
    fechaNacimiento: Yup.string().required("requerido"),
    idGenero: Yup.string().required("requerido"),
    tipoIdentificacion: Yup.string().required("requerido"),
    numeroDocumento: Yup.string().required("requerido"),
    telefono: Yup.string().required("requerido"),
  });

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
      setMAddInfo(false);
    } catch{
      // dispatch(setLoading(false));
    }
    // dispatch(setLoading(false));
  }

  useEffect(() => {
    if (user && (!user.idGenero ||
      !user.tipoIdentificacion ||
      !user.numeroDocumento ||
      !user.telefono)) {
      setMAddInfo(false);
      //initialValues = user;

    }
  }, [])


  return (
    <React.Fragment>
      <div className="page-content">

        <Modal
          isOpen={mAddInfo}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel" >
              Antes de continuar a realizar compras en Fanero, por favor actualice la siguiente información de su perfil.
            </h5>
            <button onClick={() => setMAddInfo(false)} type="button" className="close" data-dismiss="modal" aria-label="Close" >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidation}>
              <Form>
                <div className="form-group">
                  <label htmlFor="tipoIdentificacion" className="control-label">Tipo de identificación</label>
                  <Field as="select" className="form-control" name="tipoIdentificacion" id="tipoIdentificacion" required>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula de Extrangería</option>
                  </Field>
                  <ErrorMessage name="tipoIdentificacion" />
                </div>

                <div className="form-group">
                  <label htmlFor="numeroDocumento" className="control-label">Numero de documento</label>
                  <Field name="numeroDocumento" id="numeroDocumento" className="form-control" type="text" required placeholder="" />
                  <ErrorMessage name="numeroDocumento" />
                </div>

                <div className="form-group">
                  <label htmlFor="fechaNacimiento" className="control-label">Fecha de nacimiento</label>
                  <Field name="fechaNacimiento" id="fechaNacimiento" type="date" max={new Date().toISOString().substring(0,10)} className="form-control" required placeholder="Apellidos*" />
                  <ErrorMessage name="fechaNacimiento" />
                </div>

                <div className="form-group">
                  <label htmlFor="idGenero" className="control-label">Genero</label>
                  <Field as="select" className="form-control" name="idGenero" id="idGenero">
                    <option value="0">Femenino</option>
                    <option value="1">Masculino</option>
                  </Field>
                  <ErrorMessage name="idGenero" />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono" className="control-label">Celular</label>
                  <Field name="telefono" id="telefono" type="text" className="form-control" required placeholder="" />
                  <ErrorMessage name="telefono" />
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary btn-block waves-effect waves-light" type="submit" >Actualizar</button>
                </div>
              </Form>
            </Formik>
          </div>
        </Modal>
        <Row>
          <CarouselBanner />
        </Row>

        <Container fluid>
          <Row>
            <h3 className="col-md-12 text-center mt-5">Encuentra fácilmente lo que necesitas</h3>
            <StoreList />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

