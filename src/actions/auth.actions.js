import firebase from 'firebase';
import { authConstant } from './constants';
const { auth } = firebase;

export const signup = (user) => {
    return async (dispatch) => {
        const db = firebase.firestore();

        dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });

        firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                console.log(data);
                const currentUser = firebase.auth().currentUser;
                const userName = user.firstName + ' ' + user.lastName;
                currentUser
                    .updateProfile({
                        displayName: userName,
                    })
                    .then(() => {
                        // If you are here it means name has been updated
                        db.collection('users')
                            .add({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                uid: data.user.uid,
                                createdAt: new Date(),
                            })
                            .then(() => {
                                // Successful
                                const loggedInUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    uid: data.user.uid,
                                    email: user.email,
                                };
                                // It will work like a session
                                localStorage.setItem(
                                    'user',
                                    JSON.stringify(loggedInUser)
                                );
                                console.log('User logged in successfully...!');
                                dispatch({
                                    type: `${authConstant.USER_LOGIN}_SUCCESS`,
                                    payload: { user: loggedInUser },
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
            })
            .catch((error) => {
                dispatch({
                    type: `${authConstant.USER_LOGIN}_FAILURE`,
                    payload: { error },
                });
                console.log(error);
            });
    };
};

export const signin = (user) => {
    return async (dispatch) => {
        dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });

        auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                console.log(data);

                const name = data.user.displayName.split(' ');
                const firstName = name[0];
                const lastName = name[1];

                const loggedInUser = {
                    firstName: firstName,
                    lastName: lastName,
                    uid: data.user.uid,
                    email: data.user.email,
                };

                localStorage.setItem('user', JSON.stringify(loggedInUser));

                dispatch({
                    type: `${authConstant.USER_LOGIN}_SUCCESS`,
                    payload: { user: loggedInUser },
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: `${authConstant.USER_LOGIN}_FAILURE`,
                    payload: { error },
                });
            });
    };
};
