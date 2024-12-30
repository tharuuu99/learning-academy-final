import { Outlet } from "react-router-dom"
import Navbar from "../components/headers/Navbar"
import Footer from "../components/headers/Footer/Footer"




const MainLayout = () => {
  return (
    <main className="overflow-hidden dark:bg-black">
        <Navbar/>
        <Outlet/>
       <Footer/>
    </main>
  )
}

export default MainLayout
