import { Link } from "react-router-dom"
import MainNav from "./MainNav"
import MobileNav from "./MobileNav"

const Header = () => {
  
  return (
    <div className="border-b-2 border-b-blue-500 dark:bg-black dark:text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
            <Link className="text-3xl font-bold tracking-tight text-blue-500" to={"/"}>
                TradingJournalPro
            </Link>
            <div className="md:hidden">
                <MobileNav/>
            </div>
            <div className="hidden md:block">
              <MainNav/>
            </div>
        </div>
    </div>
  )
}

export default Header