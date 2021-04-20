import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// reactstrap
import { Modal } from 'reactstrap';

//Formik
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//Redux 
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, changePassword, serachValues } from '../../store/actions'

//Components
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//Images
import logo from "../../assets/images/logo.png";
import logoLight from "../../assets/images/logo.png";
import logoLightSvg from "../../assets/images/logo.svg";
import logoDark from "../../assets/images/logo.png";

//i18n
import "../../assets/scss/register.scss";
import { UserService } from "../../services/userService";

import toastr from 'toastr';

export default function Header(props) {
  const history = useHistory();
  const user = useSelector(state => state.Login.user);
  const cart = useSelector(store => store.cart.countercart);

  const changePasswordState = useSelector(state => state.Login.changePassword);
  const dispatch = useDispatch()
  const userService = new UserService();
  const initialValues = {
    idPerson: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const formValidation = Yup.object().shape({
    idPerson: Yup.string().required(""),
    currentPassword: Yup.string().required(""),
    newPassword: Yup.string()
      .required("requerido")
      .min(8, 'Minimo 8 caracteres')
      .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{8,}$/, "Debe contener minimo un número y una letra Mayúscula"),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], "Las contraseñas no coinciden"),
  })

  const onSubmit = async values => {
    console.log(JSON.stringify({ ...values, idPerson: user.id }));
    const response = await userService.changePassword({ ...values, idPerson: user.id });
    if (response === 1) {
      toastr.info("Contraseña actualizada");
      dispatch(changePassword(false));
      dispatch(loginSuccess({ ...user, temporal: 'No' }));
    }
  }

  const search = (event) => {
    event.preventDefault();
    const element = document.getElementById('searchHeader')
    dispatch(serachValues({ keyWord: element.value }))

    if (event.type === "submit") {
      history.push({
        pathname: '/searchProducts'
      })
    }
  }

  const closeModal = () => {
    dispatch(changePassword(false))
  }

  useEffect(() => {
    if (user && user.temporal == "Si") {
      dispatch(changePassword(true));
    }
  }, [])

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="50" />
                </span>
              </Link>
            </div>

            <form className="app-search d-none d-lg-block" onSubmit={search}>
              <div className="position-relative">
                <input
                  type="text"
                  id="searchHeader"
                  className="form-control"
                  placeholder="Buscar producto..."
                  autoComplete="false"
                />
                <span className="bx bx-search-alt"></span>
              </div>
            </form>
            <div>
              <Link to={'/Catalogs'} className="fas fa-tags m-4" style={{ color: 'white' }}></Link>
            </div>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ml-2">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown">
                <i className="mdi mdi-magnify"></i>
              </button>
            </div>

            {
              user ?
                <React.Fragment>
                  <Link to="/home" className="btn text-white header-item d-sm-block d-none ">Inicio</Link>
                  <Link to="/favorites" className="btn text-white header-item d-sm-block d-none ">Favoritos</Link>
                  <Link to="/cart" className="btn text-white header-item d-sm-block d-none ">
                    <i className='bx bxs-cart bx-sm'><span className="font-weight-bold small">{cart.reduce((a, b) => { return a + b.count }, 0)}</span></i></Link>
                  <ProfileMenu />
                </React.Fragment>
                :
                <React.Fragment>
                  <Link to="/cart" className="btn text-white header-item d-sm-block d-none ">
                    <i className='bx bxs-cart bx-sm'><span className="font-weight-bold small">{cart.reduce((a, b) => { return a + b.count }, 0)}</span></i></Link>
                  <Link to="/favorites" className="btn text-white header-item d-sm-block d-none ">Favoritos</Link>
                  <Link to="/login" className="btn text-white header-item">Ingresar</Link>
                  <Link to="/register" className="form-control sing-in btn waves-effect">Registrarse</Link>

                </React.Fragment>
            }
          </div>
        </div>
        <div className="row align-items-start separator m-0"></div>
      </header>

      <Modal
        isOpen={changePasswordState}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="mySmallModalLabel" >
            {user && user.temporal ? "Por favor, cambie su contraseña" : "Cambiar contraseña"}
          </h5>
          <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close" >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidation} >
            <Form>
              <div className="form-group">
                <label htmlFor="currentPassword" className="control-label">Contraseña actual</label>
                <Field name="currentPassword" id="currentPassword" type="password" className="form-control" required placeholder="" />
                <ErrorMessage name="currentPassword" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="newPassword" className="control-label">Contraseña</label>
                <Field name="newPassword" id="newPassword" type="password" className="form-control" required placeholder="" />
                <ErrorMessage name="newPassword" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="control-label">Confirmar contraseña</label>
                <Field name="confirmPassword" id="confirmPassword" type="password" className="form-control" required placeholder="" />
                <ErrorMessage name="confirmPassword" >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
              </div>

              <div className="mt-4">
                <button className="btn btn-primary btn-block waves-effect waves-light" type="submit" >Cambiar contraseña</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </React.Fragment >
  );
}