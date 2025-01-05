import React, { useState } from "react";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
    useNavigate,
} from "react-router-dom";

import HomePage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState("");

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage isLogin={isLogin} setIsLogin={setIsLogin} />,
        },
        {
            path: "/signin",
            element: <Login setIsLogin={setIsLogin} setToken={setToken} />,
        },
        {
            path: "/signup",
            element: <Signup setToken={setToken} />,
        },
    ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;