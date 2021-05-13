import { userConstant } from '../actions/constants';

const initState = {
    users: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        case `${userConstant.GET_REALTIME_USERS}_REQUEST`:
            break;
        case `${userConstant.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users,
            };
            break;
        case `${userConstant.GET_REALTIME_USERS}_FAILURE`:
            state = {
                ...state,
            };
            break;
    }

    return state;
};
