import React from 'react';
import Calculator from '../components/button';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../redux/reducer';
import { Provider } from 'react-redux';

const store = configureStore({
    "reducer": reducer
});
const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Calculator />
    </Provider>
);