import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

const MobileNavLinks = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
  };

  return (
    <>
      {user && (
        <>
          <Link
            to="/market-news"
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            Market News
          </Link>
          <Link
            to="/journal-logs"
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            Journal Logs
          </Link>
          <Link
            to="/manage-portfolio"
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            Manage Portfolio
          </Link>
          <Link
            to="/manage-trades"
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            Manage Trades
          </Link>
          <Link
            onClick={(e) => {
              e.preventDefault();
              toast.info("User Profile feature is coming soon!");
            }}
            to="/user-profile"
            className="flex bg-white dark:bg-black items-center font-bold hover:text-blue-500"
          >
            User Profile
          </Link>
          <Button
            onClick={logout} // Correct invocation of the logout function
            className="flex items-center px-3 bg-blue-500 font-bold hover:bg-gray-200"
          >
            Log Out
          </Button>
          <ThemeToggle/>
        </>
      )}
    </>
  );
};

export default MobileNavLinks;
