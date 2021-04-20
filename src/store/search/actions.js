import {SEARCH_VALUES} from './actionsTypes';

export const serachValues = (values) => {
    return {
        type: SEARCH_VALUES,
        payload: values
    }
}