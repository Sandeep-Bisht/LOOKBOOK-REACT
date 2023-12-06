import React from "react";
import { SettingsConsumer, SettingsProvider } from '@core/context/settingsContext'
import ThemeComponent from '@core/theme/ThemeComponent'
import ApplicationRoutes from "routes";
import 'css/common.css'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import { RouterProvider } from "react-router-dom";

const App = () => {

  // const location = useLocation();

  // Check if the current pathname matches the pattern
  // const isManagementRoute =  location.pathname.startsWith('/management');

  const isManagementRoute = true;
  
  return (
    <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            if(!isManagementRoute){
              settings = {...settings,mode:'light'}
            }
            return <ThemeComponent settings={settings}>
                <RouterProvider router={ApplicationRoutes}/>
            </ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
  )

        }
export default App
