import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import ThemeToggle from "./ThemeToggle";

const UsernameMenu = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  if (!user) {
    
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-blue-600 gap-2">
        <CircleUserRound className="text-blue-600" />
        {user.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/manage-portfolio"
            className="font-bold hover:text-blue-600"
          >
            Manage Portfolio
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/manage-trades"
            className="font-bold hover:text-blue-600"
          >
            Manage Trades
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            onClick={(e) => {
              e.preventDefault();
              toast.info("User Profile feature is coming soon!");
            }}
            className="font-bold hover:text-blue-600"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/technical-analysis"
            className="font-bold hover:text-blue-600"
          >
            AI Featured Technical Analysis
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/sentiment-analysis"
            className="font-bold hover:text-blue-600"
          >
            AI Featured Sentiment Analysis
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/strategy-evaluater"
            className="font-bold hover:text-blue-600"
          >
            AI-Powered Trading Strategy Evaluator
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={logout}
            className="flex flex-1 font-bold bg-blue-600 hover:bg-blue-700"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ThemeToggle/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
