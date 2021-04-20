// @flow
import {
	SET_LOADING,
	CHANGE_PRELOADER
} from "./actionTypes";

const INIT_STATE = {
	layoutType: "horizontal",
	// layoutWidth: "fluid",
	leftSideBarTheme: "dark",
	leftSideBarType: "default",
	topbarTheme: "dark",
	loading: false
};

const Layout = (state = INIT_STATE, action) => {
	switch (action.type) {
		case CHANGE_PRELOADER:
			return {
				...state,
				isPreloader: action.payload
			};
		case SET_LOADING:
			return {
				...state,
				loading: action.payload
			};
		default:
			return state;
	}
};

export default Layout;
