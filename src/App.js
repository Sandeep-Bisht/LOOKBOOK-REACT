import React from "react";
import ApplicationRoutes from "routes";
import '@css/common.css'
// Import slick carousel css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import { RouterProvider } from "react-router-dom";

const App = () => <RouterProvider router={ApplicationRoutes}/>;
export default App
