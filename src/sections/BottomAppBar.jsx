import NavigationButton from '../components/Button'

const BottomAppBar = () => {

     const navbars=[
        {label:'Product Add',icon:"/icons/bag.svg",route:'/add',canShowBadge:false},
 
        {label:'Product List',icon:"/icons/product.svg",route:'/list',canShowBadge:false},
         {label:'Orders List',icon:"/icons/truck.svg",route:'/orders',canShowBadge:false}
    ];
  return (
          <div className='w-full p-3.5 fixed bottom-0 flex justify-between  bg-white shadow-2xl border-t-2'>
            {
                navbars.map(({ label , icon , route, canShowBadge, badgeCount })=>(
                    <NavigationButton label={label} icon={icon} route={route} canShowBadge={canShowBadge} badgeCount={badgeCount}></NavigationButton> 
                ))
            }
        </div>
      
   
  )
}

export default BottomAppBar
