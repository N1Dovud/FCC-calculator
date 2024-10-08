import React from 'react';
import Calculator from '../components/button';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import reducer from '../redux/reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);
const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Calculator />
        </Provider>
    </React.StrictMode>
);