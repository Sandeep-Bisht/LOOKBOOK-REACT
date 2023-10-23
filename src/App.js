import React from "react";
import { SettingsConsumer, SettingsProvider } from '@core/context/settingsContext'
import ThemeComponent from '@core/theme/ThemeComponent'
import ApplicationRoutes from "routes";

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

const App = () => {
  
  return (
    <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>
                <ApplicationRoutes/>
            </ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
  )
}

export default App
