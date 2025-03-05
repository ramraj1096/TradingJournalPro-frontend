import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import UsernameMenu from "./UsernameMenu";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const MainNav = () => {
  const [loggedin, setIsloggedIn] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser)
    if (storedUser) {
      
      setIsloggedIn(true); 
    }
  }, []); 

  return (
    <span className="flex space-x-3 items-center">
      {loggedin ? (
        <>
          <Link to="/market-news" className="font-bold hover:text-blue-600">
            Market News
          </Link>
          <Link to="/journal-logs" className="font-bold hover:text-blue-600">
            Journal Logs
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <>
        <Button
          variant="ghost"
          className="font-bold hover:text-blue-500 hover:bg-white"
          onClick={() => navigate("/login")} 
        >
          Log In
        </Button>
        <ThemeToggle/>
        </>
      )}
    </span>
  );
};

export default MainNav;
