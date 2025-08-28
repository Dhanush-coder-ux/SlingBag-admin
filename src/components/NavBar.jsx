import { useEffect, useState } from "react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <p className="text-2xl text-black max-sm:text-xl">Sling Bag Admin</p>
      <button className="bg-black text-white px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
