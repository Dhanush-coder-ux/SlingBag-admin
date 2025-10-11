import { NavLink } from "react-router-dom"



export const Button = ({ text, className = "", id, onClick }) => {
  return (
    <div id={id} onClick={onClick} className={`font-semibold cursor-pointer rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`} >
      <span className="relative z-10">{text}</span>
    </div>
  );
};


const NavigationButton=({ label , icon , route, canShowBadge, badgeCount }) =>{
  
  return (
    <NavLink to={route} key={label} className={({ isActive }) => isActive ? "text-black" : "text-gray-400"}>
      <div className='flex flex-col items-center'>
        <button type="button" className="relative inline-flex items-center text-sm font-medium text-center text-whitefocus:ring-4 focus:outline-none ">
          <img src={icon} alt="" color='black' width={20} height={20}/>
          {
            canShowBadge &&
            <>
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-5 h-4 text-[9px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-3 dark:border-gray-900">{badgeCount>99 ? '99+' : badgeCount }</div>
            </>
          }
        </button>
        <p className='font-bold text-[10px]'>{label}</p>
      </div>
    </NavLink>
  )
}
export default NavigationButton

