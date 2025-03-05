import heroImage from "../assets/heroImg.jpg"; 
import { Button } from "@/components/ui/button";  
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import { toast } from "sonner";

const Hero = () => {
  return (
    <Card className="relative dark:bg-gradient-to-r dark:from-gray-950 dark:to-gray-950  bg-gradient-to-r from-blue-500 to-blue-300 h-[75vh] py-12 overflow-hidden rounded-none">
      <div className="absolute inset-0 "></div> 
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-center h-full relative z-10">
        
        <CardHeader className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <CardTitle className="text-4xl lg:text-5xl font-extrabold dark:text-slate-500 text-white leading-snug mb-6">
            Elevate Your Trading Journey with{" "}
            <span className="dark:text-yellow-600 text-yellow-300">Trading Journal Pro</span>
          </CardTitle>
          <CardContent>
            <p className="dark:text-slate-400 text-white text-lg mb-8">
              Discover insights, track your performance, and refine your
              strategies with our advanced journaling platform.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <Button 
              className="bg-yellow-300 dark:bg-yellow-600  text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition"
              onClick={() => (window.location.href = "#getting-started")}
              >
                
                Get Started
              </Button>
              <Button
                variant="outline"
                className="text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg "
                onClick={() => (window.location.href = "#getting-started")}
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </CardHeader>

        
        <div className="lg:w-1/2 relative">
          <img
            src={heroImage}
            alt="Trading illustration"
            className="dark:opacity-75 w-full max-w-lg mx-auto lg:mx-0 rounded-lg shadow-lg object-cover"
            
          />
        </div>
      </div>
    </Card>
  );
};

export default Hero;
