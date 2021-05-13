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

export const updateMessage = (msgObj) => {
    return async (dispatch) => {
        const db = firestore();

        db.collection('chats')
            .add({
                ...msgObj,
                isView: false,
                createdAt: new Date(),
            })
            .then((data) => {
                console.log(data);

                // success
                // dispatch({
                //     type: userConstant.GET_REALTIME_MESSAGES,
                // });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const getRealtimeChats = (user) => {
    return async (dispatch) => {
        const db = firestore();
        db.collection('chats')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            .orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {
                const chats = [];

                querySnapshot.forEach((doc) => {
                    if (
                        (doc.data().user_uid_1 == user.uid_1 &&
                            doc.data().user_uid_2 == user.uid_2) ||
                        (doc.data().user_uid_1 == user.uid_2 &&
                            doc.data().user_uid_2 == user.uid_1)
                    ) {
                        chats.push(doc.data());
                    }

                    if (chats.length > 0) {
                        dispatch({
                            type: userConstant.GET_REALTIME_MESSAGES,
                            payload: { chats },
                        });
                    } else {
                        dispatch({
                            type: `${userConstant.GET_REALTIME_MESSAGES}_FAILURE`,
                            payload: { chats },
                        });
                    }
                });

                console.log(chats);
            });
    };
};
