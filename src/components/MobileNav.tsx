import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const MobileNav = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<{ email: string; authToken: string; id: string }>({
    email: "",
    authToken: "",
    id: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      setUser({
        email: currentUser.email,
        authToken: currentUser.authToken,
        id: currentUser.id,
      });
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-blue-500" />
      </SheetTrigger>

      <SheetContent className="space-y-3">
        <SheetTitle>
          {user.email ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-blue-500" />
              {user.email}
            </span>
          ) : (
            <span>Welcome to TradingJournalPro</span>
          )}
        </SheetTitle>

        <Separator />

        <SheetDescription className="flex dark:bg-black flex-col gap-4">
          {user.email ? (
            <MobileNavLinks />
          ) : (
            <>
            <Button
              onClick={() => navigate("/login")}
              className="flex-1 font-bold bg-blue-500"
            >
              Log In
            </Button>
            <ThemeToggle/>
            </>
            
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
