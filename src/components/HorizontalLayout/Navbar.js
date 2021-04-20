import React, { Component } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { withNamespaces } from 'react-i18next';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div className="topnav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                            <Collapse isOpen={this.props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-wine-bottle mr-2"></i>{this.props.t('Abarrotes')} {this.props.menuOpen}<div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.isDashboard })}>
                                            <Link to="index" className="dropdown-item">{this.props.t('Galletas')}</Link>
                                            <Link to="dashboard-saas" className="dropdown-item">{this.props.t('Bebidas y Jugos')}</Link>
                                            <Link to="dashboard-crypto" className="dropdown-item">{this.props.t('Granos - Sal - Azúcar')}</Link>
                                            <Link to="dashboard-crypto" className="dropdown-item">{this.props.t('Confitería - Chocolates')}</Link>
                                            <Link to="dashboard-crypto" className="dropdown-item">{this.props.t('Aceites Cocina')}</Link>
                                            <Link to="dashboard-crypto" className="dropdown-item">{this.props.t('Abarrotes')}</Link>
                                        </div>
                                    </li>

                                    <li>
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-apple-alt mr-2"></i>{this.props.t('Fruver')}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-archive mr-2"></i>{this.props.t('Nevera Congelados')}
                                        </Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-drumstick-bite mr-2"></i>{this.props.t('Carnes')} {this.props.menuOpen}<div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.isDashboard })}>
                                            <Link to="index" className="dropdown-item">{this.props.t('Nevera Carnes Frías')}</Link>
                                            <Link to="dashboard-saas" className="dropdown-item">{this.props.t('Carnes')}</Link>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-broom mr-2"></i>{this.props.t('Aseo')} {this.props.menuOpen}<div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.isDashboard })}>
                                            <Link to="dashboard-saas" className="dropdown-item">{this.props.t('Aseo Personal')}</Link>
                                            <Link to="dashboard-crypto" className="dropdown-item">{this.props.t('Aseo Hogar')}</Link>
                                        </div>
                                    </li>

                                    <li>
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-dog mr-2"></i>{this.props.t('Mascotas')}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-baby mr-2"></i>{this.props.t('Bebé')}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault(); this.setState({ isDashboard: !this.state.isDashboard }); }} to="dashboard">
                                            <i className="fas fa-capsules mr-2"></i>{this.props.t('Droguería')}
                                        </Link>
                                    </li>
                                </ul>
                            </Collapse>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(Navbar));
