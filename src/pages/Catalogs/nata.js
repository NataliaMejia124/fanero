// import React, { Component } from "react";
// import profile from "../../assets/images/LogoF_Color.png";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Button,
//   NavItem,
//   NavLink,
//   Media,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import { ProductService } from "../../services/productService";
// import { profileError } from "../../store/actions";

// class Search extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: "coconut",
//       options: [],
//       suboptions: [],
//       ListCatalogs: [],
//       ListProducts: [],
//       optionsProducts: [],
//       txtSearch: "",
//       button: "",
//     };
//     this.input = React.createRef();
//     this.productService = new ProductService();
//     this.handleChange = this.handleChange.bind(this);
//     this.handleChange2 = this.handleChange2.bind(this);
//     this.handleSearch = this.handleSearch.bind(this);
//   }

//   async componentDidMount() {
//     let data = await this.productService.getCatalogs();
//     this.setState({ ListCatalogs: data });
//     console.log(this.state.ListCatalogs);
//   }
//   handleSearch(event) {
//     let palabra = this.input.current.value;
//     console.log(palabra);
//     this.state.ListProducts = this.state.ListProducts.filter((product) =>
//       product.productDetailModel.descripcion.includes(palabra)
//     );
//     this.setState({ ListProducts: this.state.ListProducts });
//     console.log(this.state.ListProducts);
//   }

//   async handleChange2(event) {
//     console.log(event.target.value);
//     let data = await new ProductService().getProduct(event.target.value);
//     this.setState({ ListProducts: data });
//     console.log(this.state.ListProducts);
//   }

//   handleChange(event) {
//     console.log(event.target.value);
//     this.setState({ value: event.target.value });

//     const result = this.state.ListCatalogs.filter(
//       (datos) => datos.id == event.target.value
//     );

//     console.log(result[0]["subCategorias"]);

//     let arrayOfData = result[0]["subCategorias"];

//     this.state.suboptions = arrayOfData.map((data) => (
//       <option key={data.id} value={data.id}>
//         {data.nombre}
//       </option>
//     ));

//     this.state.suboptions.unshift(
//       <option key={0} value={0}>
//         {"Seleccione >>"}
//       </option>
//     );
//   }
//   render() {
//     let arrayOfData = this.state.ListCatalogs;
//     this.state.options = arrayOfData.map((data) => (
//       <option key={data.id} value={data.id}>
//         {data.nombre}
//       </option>
//     ));

//     this.state.options.unshift(
//       <option key={0} value={0}>
//         {"Seleccione >>"}
//       </option>
//     );

//     return (
//       <React.Fragment>
//         <div className="account-pages my-5 pt-sm-5">
//             <Container>
//                 <Row className="justify-content-center">
//                     <Col md={8} lg={6} xl={6}>
//                         <Card className="" style={{ height: "auto" }}>
//                             <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
//                                 <div className="col-md-2">
//                                     <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
//                                 </div>
//                                 <h3 className="col-md-6 m-auto">Buscar</h3>
//                             </Row>
//                             <CardBody>
//                                 <Row>
//                                     {
                                        
//                                     }
//                                 </Row>
//                                 {/* <Row>
//                                     <Col className="mt-4 col-lg-6 col-md-6">
//                                         <Button className="btn-block" onClick={() => this.setbutton(false)}>Tiendas</Button>{'   '}
//                                     </Col>
//                                     <Col className="mt-4 col-lg-6 col-md-6">
//                                         <Button className="btn-block" onChange={() => this.setbutton(true)}>Catalogos</Button>{'   '}
//                                     </Col>
//                                     { this.button == true ?
//                                             <div>
//                                             {
//                                               this.state.ListCatalogs.map((cat, key) => {
//                                               return <li className="list-group-item col-md-12" onChick={this.handleChange}>
//                                                   <Row>
//                                                       {cat.nombre}
//                                                   </Row>
//                                               </li>
//                                               })
//                                             }
//                                             </div>
//                                                 :
//                                                 <div>
//                                                    <h4>Listado tiendas</h4>
//                                                 </div>

//                                             }
//                                 </Row> */}

//                             </CardBody>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//         <div className="page-content">
//           <Container fluid>
//             <Row className="justify-content-center">
//               <Col md={8} lg={6} xl={6}>
                
//               </Col>
//               <label>
//                 Seleccione el catalogo:
//                 <select value={this.state.value} onChange={this.handleChange}>
//                   {this.state.options}
//                 </select>
//               </label>
//             </Row>
//             <Row>
//               <label>
//                 Seleccione la Categoría:
//                 <select onChange={this.handleChange2}>
//                   {this.state.suboptions}
//                 </select>
//               </label>
//             </Row>
//             <Row>
//               <label>
//                 Buscar producto:
//                 <input type="text" ref={this.input} />
//                 <button onClick={this.handleSearch}>Buscar</button>
//               </label>
//             </Row>
//             <Row>
//               {this.state.ListProducts.map((product) => (
//                 <Card>
//                   <CardBody className="pt-12">
//                     <Row>
//                       <Col sm="12">
//                         <div className="pt-12">
//                           <Row>
//                             <Col xs="12">
//                               <img
//                                 id={product.productDetailModel.id}
//                                 src={product.productDetailModel.fotoPrincipal}
//                                 alt=""
//                                 className="img-fluid"
//                                 width="150px"
//                                 height="50px"
//                               />
//                             </Col>
//                           </Row>
//                           <div className="text-center mt-4">
//                             <h4>
//                               <p>
//                                 <strong>
//                                   {product.productDetailModel.descripcion}
//                                 </strong>
//                               </p>
//                             </h4>
//                             {product.productDetailModel.valorMoneda}
//                           </div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </CardBody>
//                 </Card>
//               ))}
//             </Row>
//           </Container>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Search;

//     const [value, setValue] = useState("coconut")
//     const [options, setOptions] = useState([])
//     const [suboptions, setSuboptions] = useState ([])
//     const [ListCatalogs, setListCatalogs] = useState ([])
//     const [ListProducts, setListProducts] = useState ([])
//     const [optionsProducts, setoptionsProducts] = useState ([])
//     const [txtSearch, setTxtSearch] =useState ()
//     const [button, setButton] =useState ()

//     this.input = React.createRef();
//     this.productService = new ProductService();
//     this.handleChange = this.handleChange.bind(this);
//     this.handleChange2 = this.handleChange2.bind(this);
//     this.handleSearch = this.handleSearch.bind(this);

//     import React, { useEffect, useState, useRef} from "react";
//     import profile from "../../assets/images/LogoF_Color.png";
//     import {
//       Container,
//       Row,
//       Col,
//       Card,
//       CardBody,
//       Button,
//       NavItem,
//       NavLink,
//       Media,
//       Dropdown,
//       DropdownToggle,
//       DropdownMenu,
//       DropdownItem,
//     } from "reactstrap";
//     import { ProductService } from "../../services/productService";
//     import { profileError } from "../../store/actions";
    
//     export default function Search (props) {
    
//         const [value, setValue] = useState("coconut")
//         const [options, setOptions] = useState([])
//         const [suboptions, setSuboptions] = useState ([])
//         const [ListCatalogs, setListCatalogs] = useState ([])
//         const [ListProducts, setListProducts] = useState ([])
//         const [optionsProducts, setoptionsProducts] = useState ([])
//         const [txtSearch, setTxtSearch] =useState ()
//         const [button, setButton] =useState ()
    
//         this.input = React.createRef();
//         this.productService = new ProductService();
//         this.handleChange = this.handleChange.bind(this);
//         this.handleChange2 = this.handleChange2.bind(this);
//         this.handleSearch = this.handleSearch.bind(this);
      
//         const getCat = async () => {
//           let data = await this.productService.getCatalogs();
//           this.setState({ ListCatalogs: data });
//           //segun yo:
//           setListCatalogs(data)
//           console.log(ListCatalogs);
//       }
    
//       const handleSearch = (event) => {
//         let palabra = this.input.current.value;
//         console.log(palabra);
//         this.state.ListProducts = this.state.ListProducts.filter((product) =>
//           product.productDetailModel.descripcion.includes(palabra)
//         );
//         this.setState({ ListProducts: this.state.ListProducts });
//         console.log(this.state.ListProducts);
//       }
    
//       const handleChange2 = async (event) => {
//         console.log(event.target.value);
//         let data = await new ProductService().getProduct(event.target.value);
//         this.setState({ ListProducts: data });
//         console.log(ListProducts);
//       }
    
//       const handleChange = (event) => {
//         console.log(event.target.value);
//         //no se como el de abajo 
//         this.setState({ value: event.target.value });
    
//         const result = ListCatalogs.filter(
//           (datos) => datos.id == event.target.value
//         );
    
//         console.log(result[0]["subCategorias"]);
    
//         let arrayOfData = result[0]["subCategorias"];
    
//         setSuboptions = arrayOfData.map((data) => (
//           <option key={data.id} value={data.id}>
//             {data.nombre}
//           </option>
//         ));
    
//         setSuboptions.unshift(
//           <option key={0} value={0}>
//             {"Seleccione >>"}
//           </option>
//         );
      
    
//         let arrayOfData = ListCatalogs;
//         setOptions(arrayOfData.map((data) => (
//           <option key={data.id} value={data.id}>
//             {data.nombre}
//           </option>)
//         ));
    
//         setOptions.unshift(
//           <option key={0} value={0}>
//             {"Seleccione >>"}
//           </option>
//         );
    
//         return (
//           <React.Fragment>
//             <div className="account-pages my-5 pt-sm-5">
//                 <Container>
//                     <Row className="justify-content-center">
//                         <Col md={8} lg={6} xl={6}>
//                             <Card className="" style={{ height: "auto" }}>
//                                 <Row className="d-flex justify-center-center pt-4 pb-3 ml-4">
//                                     <div className="col-md-2">
//                                         <img src={profile} alt="" className="img-fluid" style={{ height: '50px' }} />
//                                     </div>
//                                     <h3 className="col-md-6 m-auto">Buscar</h3>
//                                 </Row>
//                                 <CardBody>
//                                     <Row>
//                                         {
                                            
//                                         }
//                                     </Row>
//                                     {/* <Row>
//                                         <Col className="mt-4 col-lg-6 col-md-6">
//                                             <Button className="btn-block" onClick={() => this.setbutton(false)}>Tiendas</Button>{'   '}
//                                         </Col>
//                                         <Col className="mt-4 col-lg-6 col-md-6">
//                                             <Button className="btn-block" onChange={() => this.setbutton(true)}>Catalogos</Button>{'   '}
//                                         </Col>
//                                         { this.button == true ?
//                                                 <div>
//                                                 {
//                                                   this.state.ListCatalogs.map((cat, key) => {
//                                                   return <li className="list-group-item col-md-12" onChick={this.handleChange}>
//                                                       <Row>
//                                                           {cat.nombre}
//                                                       </Row>
//                                                   </li>
//                                                   })
//                                                 }
//                                                 </div>
//                                                     :
//                                                     <div>
//                                                        <h4>Listado tiendas</h4>
//                                                     </div>
    
//                                                 }
//                                     </Row> */}
    
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//             <div className="page-content">
//               <Container fluid>
//                 <Row className="justify-content-center">
//                   <Col md={8} lg={6} xl={6}>
                    
//                   </Col>
//                   <label>
//                     Seleccione el catalogo:
//                     <select value={value} onChange={this.handleChange}>
//                       {options}
//                     </select>
//                   </label>
//                 </Row>
//                 <Row>
//                   <label>
//                     Seleccione la Categoría:
//                     <select onChange={this.handleChange2}>
//                       {suboptions}
//                     </select>
//                   </label>
//                 </Row>
//                 <Row>
//                   <label>
//                     Buscar producto:
//                     <input type="text" ref={this.input} />
//                     <button onClick={this.handleSearch}>Buscar</button>
//                   </label>
//                 </Row>
//                 <Row>
//                   {ListProducts.map((product) => (
//                     <Card>
//                       <CardBody className="pt-12">
//                         <Row>
//                           <Col sm="12">
//                             <div className="pt-12">
//                               <Row>
//                                 <Col xs="12">
//                                   <img
//                                     id={product.productDetailModel.id}
//                                     src={product.productDetailModel.fotoPrincipal}
//                                     alt=""
//                                     className="img-fluid"
//                                     width="150px"
//                                     height="50px"
//                                   />
//                                 </Col>
//                               </Row>
//                               <div className="text-center mt-4">
//                                 <h4>
//                                   <p>
//                                     <strong>
//                                       {product.productDetailModel.descripcion}
//                                     </strong>
//                                   </p>
//                                 </h4>
//                                 {product.productDetailModel.valorMoneda}
//                               </div>
//                             </div>
//                           </Col>
//                         </Row>
//                       </CardBody>
//                     </Card>
//                   ))}
//                 </Row>
//               </Container>
//             </div>
//           </React.Fragment>
//         );
      
//     }
    
    