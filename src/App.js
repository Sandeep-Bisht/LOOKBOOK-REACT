import React from "react";
import { SettingsConsumer, SettingsProvider } from '@core/context/settingsContext'
import ThemeComponent from '@core/theme/ThemeComponent'
import ApplicationRoutes from "routes";


// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useLocation } from "react-router-dom";

const App = () => {

  const location = useLocation();

  // Check if the current pathname matches the pattern
  const isManagementRoute =  location.pathname.startsWith('/management');
  
  return (
    <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            if(!isManagementRoute){
              settings = {...settings,mode:'light'}
            }
            return <ThemeComponent settings={settings}>
                <ApplicationRoutes/>
            </ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
  )

        }
export default App
