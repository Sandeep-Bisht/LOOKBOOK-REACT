import React from "react";
import ApplicationRoutes from "routes";
import 'css/common.css'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import { RouterProvider } from "react-router-dom";

const App = () => <RouterProvider router={ApplicationRoutes}/>;
export default App
