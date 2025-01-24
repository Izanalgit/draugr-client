import React from 'react'
import { AppProvaider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';

function App() {

    return (
        <AppProvaider>
            <AppRoutes />
        </AppProvaider>
    )
}

export default App;