import Navbar from "./Navbar.tsx"
import {Outlet} from "react-router-dom"
import Footer from "./Footer.tsx"

export default function AppLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

