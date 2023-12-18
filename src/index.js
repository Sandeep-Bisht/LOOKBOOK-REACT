
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastProvider } from "react-toast-notifications";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <ToastProvider>
      <App/>
      </ToastProvider>
);
