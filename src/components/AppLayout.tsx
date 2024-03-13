import Navbar from "./Navbar.tsx"
import {Outlet} from "react-router-dom"
import Footer from "./Footer.tsx"
import SearchBar from './SearchBar.tsx'
import OftenSearchedWords from './OftenSearchedWords.tsx'

export default function AppLayout() {
    return (
        <>
            <Navbar />
            <SearchBar />
            <Outlet />
            <OftenSearchedWords />
            <Footer />
        </>
    )
}

