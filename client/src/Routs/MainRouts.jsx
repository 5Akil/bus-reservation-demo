
import { createBrowserRouter } from "react-router-dom";
import Bus from "../pages/Bus";
import Seats from "../pages/Seats";
import Payment from "../pages/payment";



const MainRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Bus />
    },
    {
        path: '/bus/:busId/seats',
        element: <Seats />
    },
    {
        path: '/payment',
        element: <Payment />
    },
])
export default MainRoutes