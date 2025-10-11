import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useNetWorkCalls } from "../Utils/NetworkCalls";

const ListProduct = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const {netWorkCalls}=useNetWorkCalls()
  const [products, setProducts] = useState([]);

  const getProducts=async()=>{
    const res=await netWorkCalls({method:'get',path:'/products',ignoreCookie:true})
    if (res){
      setProducts(res.products)
    }
  }

  useEffect(() => {
    getProducts()
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const res=await netWorkCalls({method:'delete',path:`/product?product_id=${id}`})
    if (res){
      setProducts(products.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Product List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                      <td className="py-3 px-4">
                    {product.image_urls && product.image_urls.length > 0 ? (
                      <img
                        src={product.image_urls[0]}
                        
                        
                        className="w-14 h-14 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center bg-gray-200 text-gray-400 text-xs rounded-md">
                        No Img
                      </div>
                    )}
                  </td>

              
                  <td className="py-3 px-4 font-medium">{product.title}</td>

                 
                  <td className="py-3 px-4">₹{product.price}</td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg"
                      onClick={() =>(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
