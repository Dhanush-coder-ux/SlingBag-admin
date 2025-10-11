import './App.css'
import {Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import AddProduct from './pages/AddProduct'
import ListProduct from './pages/ListProduct'
import OrderControl from './pages/OrderControl'
import BottomAppBar from './sections/BottomAppBar'
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import { useState } from 'react'



function App() {

  const [products, setProducts] = useState([]);

  const handleAdd = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleEdit = (product) => {
    console.log("Edit clicked:", product);
    // open edit modal or redirect
  };

  const handleDelete = (product) => {
    setProducts((prev) => prev.filter((p) => p !== product));
  };


  return (
    <div className='bg-gray-50 min-h-screen'>
      <NavBar/>
      <div className ='w-full flex'>
        
        {isDesktop && <SideBar/> }
      <div className='w-[70%] mx-auto  max-sm:w-full my-8 text-gray-500 text-base'>
          <Routes>
            <Route path='/' element={<AddProduct/>} />
            <Route path='/add' element={<AddProduct onAdd={handleAdd}/>} />
            <Route path='/list' element={<ListProduct products={products} onEdit={handleEdit} onDelete={handleDelete}/>} />
            <Route path='/orders' element={<OrderControl />} />
        </Routes>
      </div>
     
      {isMobile &&  <BottomAppBar/> }
    
      </div>
   
    </div>
 
  )
}

export default App
