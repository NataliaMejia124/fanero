import React, { Component } from 'react';
import { Container, Row, Col, Card,Alert, CardBody,Media, Button } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumb from '../../components/Common/Breadcrumb';

import avatar from '../../assets/images/users/avatar-1.jpg';
// actions
import { editProfile } from '../../store/actions';

import '../../assets/scss/general.scss'

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
                email : "",
                name : "", 
                idx : 1 ,
                lastName:"",
                documentType: "",
                documentNumber: "",
                phone:"",
                gender: "",
                dateBirthday:""
            }

        // handleValidSubmit
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        //gender
        //this.onChangeM = this.onMChanged.bind(this);
        //this.onChangeH = this.onHChanged.bind(this);
    }

    // handleValidSubmit
    handleValidSubmit(event, values) {
        this.props.editProfile(values);
    }

/*
    onMChanged(e){
        this.setState({
            gender: e.currentTarget.value
        });
    }
     onHChanged(e){
        this.setState({
            gender: e.currentTarget.value
        });
    }
*/
    componentDidMount()
    {
        if(localStorage.getItem("authUser"))
           {
             const obj = JSON.parse(localStorage.getItem("authUser"));
             console.log(obj);
             if(process.env.REACT_APP_DEFAULTAUTH === 'firebase')
             { 
                this.setState({name :obj.displayName,email :obj.email,idx : obj.uid  });
             }
              else if((process.env.REACT_APP_DEFAULTAUTH === 'fake') || (process.env.REACT_APP_DEFAULTAUTH === 'jwt'))
             {
                this.setState({
                    name :obj.username,
                    email :obj.email,
                    idx : obj.uid,
                    lastName : obj.lastName,
                    documentType: obj.documentType,
                    documentNumber: obj.documentNumber,
                    phone: obj.documentNumber,
                    gender: obj.gender,
                    dateBirthday: obj.dateBirthday
                
                });
             }               
           }
    }
    componentDidUpdate(prevProps, prevState)
    {
        if(this.props !== prevProps)
        {
            const obj = JSON.parse(localStorage.getItem("authUser"));
             if(process.env.REACT_APP_DEFAULTAUTH === 'firebase')
             { 
                this.setState({name :obj.displayName,email :obj.email,idx : obj.uid  });
             }
              else if((process.env.REACT_APP_DEFAULTAUTH === 'fake') || (process.env.REACT_APP_DEFAULTAUTH === 'jwt'))
             {
                this.setState({
                    name :obj.username
                    ,email :obj.email,
                    idx : obj.uid,
                    lastName : obj.lastName,
                    documentType: obj.documentType,
                    documentNumber: obj.documentNumber,
                    phone: obj.documentNumber,
                    gender: obj.gender,
                    dateBirthday: obj.dateBirthday
                });
             }         
        }
    }

    render() {

        return (
           <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumb title="Skote" breadcrumbItem="Perfil" />

                         <Row>
                            <Col lg="12">
                             {this.props.error && this.props.error ? <Alert color="danger">{this.props.error}</Alert> : null}
                             {this.props.success && this.props.success ? <Alert color="success">{this.props.success}</Alert> : null}

                                <Card>
                                    <CardBody>
                                        <Media>
                                            <div className="mr-3">
                                                <img src={avatar} alt="" className="avatar-md rounded-circle img-thumbnail"/>
                                            </div>
                                            <Media body className="align-self-center">
                                                <div className="text-muted">
                                                    <h5>{this.state.name +' '+ this.state.lastName}</h5>
                                                    <p className="mb-1">{this.state.email}</p>
                                                </div>
                                            </Media>
                                        </Media>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <h4 className="card-title mb-4">Información personal</h4>

                        <Card>
                            <CardBody>
                               <AvForm className="form-horizontal" id='formEditUser' onValidSubmit={(e,v) => { this.handleValidSubmit(e,v) }}>
                                    <div className="form-group">
                                         <AvField name="username"  label="Nombres" disabled  value={this.state.name} className="form-control" placeholder="Ingresa tus nombres" type="text" required />
                                         
                                    </div>
                                    <div className="form-group">
                                         <AvField name="lastName"  disabled label="Apellidos" value={this.state.lastName} className="form-control" placeholder="Ingresa tus apellidos" type="text" required />
                                         
                                    </div>
                                    <div className="form-group">
                                         <AvField name="documentType"  disabled label="Tipo de documento" value={this.state.documentType} className="form-control" placeholder="Ingresa tu tipo de documento" type="text" required />
                                         
                                    </div>
                                    <div className="form-group">
                                         <AvField name="documentNumber"  disabled label="Numero de documento" value={this.state.documentNumber} className="form-control" placeholder="Ingresa tu número de documento" type="number" required />
                                         
                                    </div>
                                    <div className="form-group">
                                         <AvField name="phone" label="Celular" id='phoneEdit' value={this.state.phone} className="form-control" placeholder="Ingresa tu celular" type="number" required />
                                    </div>
                                    <div className="form-group">
                                     <h5 className="font-size-14 mb-4">¿Cuál es tu género?</h5>
                                        <div className="custom-control custom-radio mb-12">
                                            <div className="custom-control custom-radio mb-2">
                                                <input type="radio"  id="customRadio1" name="gender" value={this.state.gender} className="custom-control-input" defaultChecked />
                                                <label className="custom-control-label" htmlFor="customRadio1">Hombre</label>
                                            </div>
                                            <div className="custom-control custom-radio mb-2">
                                                <input type="radio" id="customRadio2"  name="gender" value={this.state.gender} className="custom-control-input"  />
                                                <label className="custom-control-label" htmlFor="customRadio2">Mujer</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                         <AvField id='dateBirthday' name="dateBirthday" label="¿Cuándo naciste?" defaultValue="1999-01-29" value={this.state.dateBirthday} className="form-control" placeholder="Fecha de nacimiento" type="date" required />
                                         <AvField name="idx"  value={this.state.idx}  type="hidden"  />
                                    </div>
                                     <div className="text-center mt-4">
                                         <Button type="submit" color="danger">Editar Usuario</Button>
                                    </div>
                               </AvForm>
                            
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}
            
const mapStatetoProps = state => {
    const { error,success } = state.Profile;
    return { error,success };
}

export default withRouter(connect(mapStatetoProps, { editProfile })(UserProfile));

