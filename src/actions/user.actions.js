import { userConstant } from './constants';
import firebase from 'firebase';
const { firestore } = firebase;

export const getRealTimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: `${userConstant.GET_REALTIME_USERS}_REQUEST` });

        const db = firestore();

        const unsubscribe = db
            .collection('users')
            .onSnapshot((querySnapshot) => {
                var users = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid != uid) {
                        users.push(doc.data());
                    }
                });

                //console.log(users);
                dispatch({
                    type: `${userConstant.GET_REALTIME_USERS}_SUCCESS`,
                    payload: { users },
                });
            });

        return unsubscribe;
    };
};
