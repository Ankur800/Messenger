import firebase from 'firebase';
import { authConstant } from './constants';
const { auth, firestore } = firebase;

export const signup = (user) => {
    return async (dispatch) => {
        const db = firestore();

        dispatch({ type: `${authConstant.USER_LOGIN}_REQUEST` });

        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                console.log(data);

                const currentUser = auth().currentUser;
                const userName = user.firstName + ' ' + user.lastName;
                currentUser
                    .updateProfile({
                        displayName: userName,
                    })
                    .then(() => {
                        // If you are here it means name has been updated
                        db.collection('users')
                            .doc(data.user.uid)
                            .set({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                uid: data.user.uid,
                                createdAt: new Date(),
                                isOnline: true,
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

                const db = firestore();
                db.collection('users')
                    .doc(data.user.uid)
                    .update({
                        isOnline: true,
                    })
                    .then(() => {
                        const name = data.user.displayName.split(' ');
                        const firstName = name[0];
                        const lastName = name[1];

                        const loggedInUser = {
                            firstName: firstName,
                            lastName: lastName,
                            uid: data.user.uid,
                            email: data.user.email,
                        };

                        localStorage.setItem(
                            'user',
                            JSON.stringify(loggedInUser)
                        );

                        dispatch({
                            type: `${authConstant.USER_LOGIN}_SUCCESS`,
                            payload: { user: loggedInUser },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
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

export const isLoggedInUser = () => {
    return async (dispatch) => {
        const loggedInUser = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null;

        if (loggedInUser) {
            dispatch({
                type: `${authConstant.USER_LOGIN}_SUCCESS`,
                payload: { user: loggedInUser },
            });
        } else {
            dispatch({
                type: `${authConstant.USER_LOGIN}_FAILURE`,
                payload: { error: 'Login again please' },
            });
        }
    };
};

export const logout = (uid) => {
    return async (dispatch) => {
        dispatch({ type: `${authConstant.USER_LOGOUT}_REQUEST` });

        const db = firestore();
        db.collection('users')
            .doc(uid)
            .update({
                isOnline: false,
            })
            .then(() => {
                // Now lets logout user
                auth()
                    .signOut()
                    .then(() => {
                        // successfully logout

                        localStorage.clear();
                        dispatch({
                            type: `${authConstant.USER_LOGOUT}_SUCCESS`,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch({
                            type: `${authConstant.USER_LOGOUT}_FAILURE`,
                            payload: { error },
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
