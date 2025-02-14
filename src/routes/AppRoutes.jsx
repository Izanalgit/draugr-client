import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Chat from "../pages/Chat.jsx";
import Landing from "../pages/Landing.jsx";
import Loader from "../pages/Loader.jsx";
import Response from "../pages/Response.jsx";

const AppRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/loader" element={<Loader />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/response" element={<Response />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;