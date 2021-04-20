import React from "react";
import { Redirect } from "react-router-dom";

// User profile
import UserProfile from "../components/authentication/UserProfile";

//Tasks

//Projects

//Catalogs
import Search from "../pages/Catalogs/Search";
import SearchProducts from "../pages/Products/SearchProducts";

// Authentication related pages
import Login from "../components/authentication/Login";
import Logout from "../components/authentication/Logout";
import Register from "../components/authentication/Register";
import ForgetPwd from "../components/authentication/ForgetPassword";

// Inner Authentication
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Crypto
import CryptoIcoLanding from "../pages/Crypto/CryptoIcoLanding/index";

//Ui
import UiButtons from "../pages/Ui/UiButtons";

//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

//Contacts

import NonAuthLayout from "../components/NonAuthLayout";
import Home from "../pages/home/home";
import StoreProducts from "../components/storeProducts/storeProducts";
import InformationUser from "../components/user/information";
import AddressesUser from "../components/user/direcciones";
import Contacts from "../components/user/contacts";
import Order from "../components/user/order";
import OrderDetail from "../components/user/OrderDetail";
import TracingStepper from "../components/user/TracingStepper";
import ProductDetail from "../components/products/ProductDetail";
import Fav from "../components/products/Fav";
import CartShop from "../components/products/CartShop";
import CartList from "../components/products/CartList";
import SendProducts from "../components/products/SendProducts";
import PayMethod from "../components/products/PayMethod";
import PaymentConfirmation from "../components/products/PaymentConfirmationPSE"
import Catalogs from "../components/products/Catalogs";

const authProtectedRoutes = [
	//profile
	{ path: "/profile", component: UserProfile },
	
	//Utility
	{ path: "/pages-starter", component: PagesStarter },
	{ path: "/pages-timeline", component: PagesTimeline },
	{ path: "/pages-faqs", component: PagesFaqs },
	{ path: "/pages-pricing", component: PagesPricing },

	//{ path: "/", exact: true, component: () => <Redirect to="/Home" /> }
];

const publicRoutes = [	
	{ path: "/home", component: Home },
	{ path: "/infoProfile", component: InformationUser },
	{ path: "/direccProfile", component: AddressesUser },
	{ path: "/contacts", component: Contacts },
	{ path: "/order", component: Order},
	{ path: "/OrderDetail/:id", component: OrderDetail},
	{ path: "/TracingStepper/:id", component: TracingStepper},
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login, layout: NonAuthLayout },
	{ path: "/searchProducts", component: SearchProducts },
	{ path: "/forgot-password", component: ForgetPwd, layout: NonAuthLayout },
	{ path: "/register", component: Register, layout: NonAuthLayout },
	{ path: "/search", component: Search },
	{ path: "/storeProducts/:id", component: StoreProducts },
	{ path: "/detailProducts/:id", component: ProductDetail },
	{ path: "/favorites", component: Fav},
	{ path: "/cart", component: CartShop},
	{ path: "/CartList/:id", component: CartList},
	{ path: "/SendProducts/:id", component: SendProducts},
	{ path: "/PayMethod/:id", component: PayMethod},
	{ path: "/PaymentConfirmationPSE/:id", component: PaymentConfirmation},
	{ path: "/Catalogs", component: Catalogs},

	{ path: "/pages-maintenance", component: PagesMaintenance },
	{ path: "/pages-comingsoon", component: PagesComingsoon },
	{ path: "/pages-404", component: Pages404 },
	{ path: "/pages-500", component: Pages500 },
	{ path: "/crypto-ico-landing", component: CryptoIcoLanding },

	// Authentication Inner
	{ path: "/pages-forgot-pwd", component: ForgetPwd1 },
	{ path: "/auth-lock-screen", component: LockScreen },
	{ path: "/", exact: true, component: () => <Redirect to="/Home" /> }
];

export { authProtectedRoutes, publicRoutes };
