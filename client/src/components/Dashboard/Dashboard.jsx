import { useDispatch } from "react-redux";
import { addToCart } from "@/app/slices/cartSlice";
import { useGetAvailableProductQuery } from "@/app/slices/productApiSlice";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { LucideUnlink } from "lucide-react";
import {
  useGetUserProfileQuery,
  useRequestDistributorMutation,
} from "@/app/slices/userApiSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const { data } = useGetAvailableProductQuery();
  const products = Array.isArray(data?.products) ? data.products : [];
  const allProducts = [...products].reverse();
  
  const { data: userData } = useGetUserProfileQuery();
  let user = userData?.user || {};


  const [requestDistributor] = useRequestDistributorMutation();

  const handleRequestSupplier = async () => {
    try {
      const res = await requestDistributor().unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "Failed  Supplier Request");
    }
  };

  if (user.requestDistributor === "pending") {
    return (
      <>
        <div className="flex flex-col h-[70vh] text-center justify-center text-gray-600">
          <p className="flex justify-center">
            <LucideUnlink className="size-8" />
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            No Suppliers Available
          </h2>
          <p className="text-base mb-4">
            It looks like there are no suppliers at the moment.
          </p>
          <div className="">
            <Button onClick={handleRequestSupplier}>Request a Supplier</Button>
          </div>
        </div>
      </>
    );
  }
  if (user.requestDistributor === "process") {
    return <p> In process ....</p>;
  }

  return (
    <>
      <ScrollArea className="h-[calc(100vh-68px)]">
        <div className=" mx-16 mt-10">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-[#1E3A8A]/90 pb-2">
              Recently Added
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-2">
            {allProducts?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-32 object-fit"
                  />

                  <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-tr-lg text-sm font-medium">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#1E3A8A]/90">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      className="bg-[#1E3A8A] text-white px-3 py-2 rounded-lg flex items-center hover:bg-[#1E3A8A]/90 transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* all */}
        <div className=" mx-16 mt-10">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-[#1E3A8A]/90 pb-2">
              All Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-2">
            {allProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-32 object-fit"
                  />

                  <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-tr-lg text-sm font-medium">
                    {product.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {product.name}
                  </h3>

                  {/* <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">.....</div>
                  
                </div> */}

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#1E3A8A]/90">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      className="bg-[#1E3A8A] text-white px-3 py-2 rounded-lg flex items-center hover:bg-[#1E3A8A]/90 transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default Dashboard;
