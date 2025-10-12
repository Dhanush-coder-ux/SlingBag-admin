import React, { useEffect, useState } from "react"; 
import { Button } from "../components/ui/button";
import { useNetWorkCalls } from "../Utils/NetworkCalls";

const ListProduct = () => {
  const { netWorkCalls } = useNetWorkCalls();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [deletingId, setDeletingId] = useState(null); // Track product being deleted

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await netWorkCalls({ method: 'get', path: '/products', ignoreCookie: true });
      if (res) setProducts(res.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      const res = await netWorkCalls({ method: 'delete', path: `/product?product_id=${id}` });
      if (res) setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

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
            {loading ? (
              // Skeleton rows
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-3 px-4">
                    <div className="w-14 h-14 bg-gray-300 rounded-md"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <div className="h-6 w-12 bg-blue-300 rounded"></div>
                    <div className="h-6 w-12 bg-red-300 rounded"></div>
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    {product.image_urls?.length > 0 ? (
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
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg"
                      onClick={() => console.log("Edit product", product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className={`bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg flex items-center justify-center`}
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                    >
                      {deletingId === product.id ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        "Delete"
                      )}
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
