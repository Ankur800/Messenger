import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDxSRTXtf8ltGYDzol_nP4bTtw94kjacYk',
    authDomain: 'messenger-f4493.firebaseapp.com',
    databaseURL:
        'https://messenger-f4493-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'messenger-f4493',
    storageBucket: 'messenger-f4493.appspot.com',
    messagingSenderId: '659467859875',
    appId: '1:659467859875:web:0396c965891f40b424cc16',
    measurementId: 'G-HFKBP4WLCZ',
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
