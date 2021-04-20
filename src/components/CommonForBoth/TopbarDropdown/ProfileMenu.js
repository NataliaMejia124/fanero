
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link, useHistory} from 'react-router-dom';

//i18n
import { withNamespaces } from 'react-i18next';

// users
import NoPic_Color from '../../../assets/images/NoPic_Color.png';

// Redux Store
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, changePassword } from "../../../store/actions";

import { ApiConstants } from '../../../common/apiConstants';

export default function ProfileMenu(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.Login.user)
    const [menu, setMenu] = useState(false);
    const history = useHistory()
    const logout = () => {
        localStorage.removeItem(ApiConstants.LS_USER);
        dispatch(logoutUser());
        history.push("/home");
    }
    return (
        <React.Fragment>
            <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block" >
                <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                    <img className="rounded-circle header-profile-user" src={NoPic_Color} alt="Header Avatar" />
                    <span className="d-none d-xl-inline-block ml-2 mr-1">{`${user.nombres}`}</span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag="a" href="/infoProfile">
                        <i className="fa fa-user font-size-16 align-middle mr-1"></i>
                            Mis datos personales
                        </DropdownItem>
                    <DropdownItem tag="button" onClick={() => { dispatch(changePassword(true)); setMenu(!menu) }}>
                        <i className="fa fa-lock font-size-16 align-middle mr-1"></i>
                            Cambiar contraseña
                        </DropdownItem>
                    <DropdownItem tag="a" href="/direccProfile">
                        <i className="fas fa-map-marked-alt font-size-16 align-middle mr-1"></i>
                            Mis direcciones
                        </DropdownItem>
                    <DropdownItem tag="a" href="/order">
                        <i className="fas fa-clock font-size-16 align-middle mr-1"></i>
                            Mis ordenes
                        </DropdownItem>
                    <DropdownItem tag="a" href="/contacts">
                        <i className="fas fa-phone-alt font-size-16 align-middle mr-1"></i>
                            Contactos
                        </DropdownItem>
                    <DropdownItem tag="a" href="https://www.fanero.co/termcondiciones.pdf">
                        <i className="fas fa-file-signature font-size-16 align-middle mr-1"></i>
                        Términos y condiciones
                    </DropdownItem>
                    <DropdownItem tag="a" href="https://www.fanero.co/TratamientoDatos/TratamientoDatosPersonales.html">
                        <i className="fas fa-file-signature font-size-16 align-middle mr-1"></i>
                            Tratamiento de datos
                    </DropdownItem > 
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={logout}>
                        <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                        <span>Cerrar sesión</span>
                    </button>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
}