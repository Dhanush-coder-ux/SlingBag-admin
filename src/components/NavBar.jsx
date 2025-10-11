import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { LoginContext } from "../Contexts/LoginContext";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = () => {
  const [searchParams]=useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isImageError, setImageError] = useState(false);
  const userProfile = Cookies.get("user_profile");
  const userName = Cookies.get("user_name");
  const dropdownRef = useRef(null);
  const [isLoading,setIsLoading]=useState(false)
  const {login,logout,getLoginCredentials,checkIsUserLoggedIn,isLoggedIn}=useContext(LoginContext)

  useEffect(()=>{
    checkIsUserLoggedIn()

    const token=searchParams.get('token');
    const name=searchParams.get('name');
    const profile=searchParams.get('profile')

    console.log("User params : ",name,profile,token)

    if (token && name ){
      getLoginCredentials({user_token:token,user_name:name,user_profile:profile});
    }

  },[])
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 flex items-center justify-between py-3 px-[5%] transition-all duration-300 
        ${isScrolled ? "bg-white/40 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <p className="text-2xl font-bold text-black max-sm:text-xl">Sling Bag Admin</p>
      <div className="relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <div>
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-500 flex items-center justify-center cursor-pointer"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  {userProfile && !isImageError ? (
                    <img
                      src={userProfile}
                      alt="profile"
                      className="rounded-full object-cover w-full h-full"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <h1 className="text-black font-bold text-2xl">
                      {userName && userName !== ""
                        ? userName.slice(0, 2).toUpperCase()
                        : "SL"}
                    </h1>
                  )}
                </div>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-fadeIn z-80">
                    <p className="px-4 py-2 text-gray-700 font-medium border-b">
                      Hi, {userName || "User"}
                    </p>

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                text={isLoading ? "SignIn...":"Sign In"}
                onClick={() => {setIsLoading(true); login(); setIsLoading(false);}}
                className="bg-black px-6 py-3 text-white"
              />
            )}
          </div>
    </div>
  );
};

export default NavBar;
