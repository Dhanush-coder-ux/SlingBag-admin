import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white">
      <div className="flex flex-col gap-3 pt-6 px-4 text-[15px]">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm border border-gray-200 w-full 
             hover:bg-gray-100 transition ${
               isActive ? "bg-gray-200 font-medium" : ""
             }`
          }
        >
          <img src="/icons/bag.svg" className="h-5 w-5" alt="" />
          <p className="hidden md:block">Add Products</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm border border-gray-200 w-full 
             hover:bg-gray-100 transition ${
               isActive ? "bg-gray-200 font-medium" : ""
             }`
          }
        >
          <img src="/icons/product.svg" className="h-5 w-5" alt="" />
          <p className="hidden md:block">List of Products</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm border border-gray-200 w-full 
             hover:bg-gray-100 transition ${
               isActive ? "bg-gray-200 font-medium" : ""
             }`
          }
        >
          <img src="/icons/truck.svg" className="h-5 w-5" alt="" />
          <p className="hidden md:block">Product Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
