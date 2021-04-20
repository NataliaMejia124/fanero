import React, { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import { useSelector } from "react-redux";
import { Row, Col, Label, Input } from "reactstrap";
import { useParams, useHistory } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import toastr, { success } from 'toastr'


export default function Cash(props) {
    const user = useSelector(x => x.Login.user);
    const userService = new UserService();
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    console.log(props.price)

    const enviar = async values => {
        const response = await userService.cashPayment(parseInt(params.id));
        if (response.success) {
            toastr.success("BIEN ORDEN EN EFEC");
            history.push({
                pathname: `/PaymentConfirmationPSE/${params.id}`
            })

        } else {
            toastr.info("HAY ALGUN ERROR");
        }
    }

    return (

        <React.Fragment>
            {
                props.price.map((order, key) => {
                    return <Row key={key}>
                        <Col>
                            <span>TOTAL</span>
                            <h3>{order.totalMoneda}</h3>
                            <span>Costo de domilicio:  {order.totalEnvioMoneda}</span><br></br>
                            <span>Subtotal:  {order.subTotalMoneda}</span>
                            <hr></hr>
                            <span>DIRECCIÓN DE ENTREGA</span><br></br>
                            <strong>{order.direccionPersona.nomenclatura}</strong>
                            <hr></hr>
                        </Col>
                    </Row>
                })
            }
            <Row>
                <button className="boton3-fanero btn-block" onClick={enviar}>Confirmar</button>{'   '}
            </Row>
        </React.Fragment>
    )
}
