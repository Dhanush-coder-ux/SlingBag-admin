import './App.css'
import {Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import AddProduct from './pages/AddProduct'
import ListProduct from './pages/ListProduct'
import EditProduct from './pages/EditProduct'
import OrderControl from './pages/OrderControl'
import BottomAppBar from './sections/BottomAppBar'
import { isMobile, isDesktop } from 'react-device-detect';

function App() {



  return (
    <div className='bg-gray-50 min-h-screen'>
      <NavBar/>
      <div className ='w-full flex'>
        
        {isDesktop && <SideBar/> }
      <div className='w-[70%] mx-auto  max-sm:w-full my-8 text-gray-500 text-base'>
          <Routes>
            <Route path='/' element={<AddProduct/>} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/edit/:id' element={<EditProduct />} />
            <Route path='/list' element={<ListProduct />} />
            <Route path='/orders' element={<OrderControl />} />
        </Routes>
      </div>
     
      {isMobile &&  <BottomAppBar/> }
    
      </div>
   
    </div>
 
  )
}

export default App
