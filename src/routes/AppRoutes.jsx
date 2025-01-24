import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Chat from "../pages/Chat.jsx";
// import Invite from "../pages/Invite.jsx";
import Loader from "../pages/Loader.jsx";
// import Request from "../pages/Request.jsx";
// import Response from "../pages/Response.jsx";

const AppRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Loader />} />
                {/* <Route path="/invite" element={<Invite />} />
                <Route path="/request" element={<Request />} />
                <Route path="/response" element={<Response />} />
                <Route path="/chat/:chatToken" element={<Chat />} /> */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;