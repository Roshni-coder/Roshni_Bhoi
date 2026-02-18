import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { HiOutlineLightningBolt } from "react-icons/hi"; // Install react-icons

function CorporateProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCorporateProducts();
  }, []);

  const fetchCorporateProducts = async () => {
    try {
      const slug = "corporate-gifting";
      const res = await api.get(`/api/occasions/${slug}/products`);
      if (res.data.success) {
        setProducts(res.data.data.products);
      }
    } catch (err) {
      console.error("Error fetching corporate products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3C34]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF7]">
      {/* Hero Header */}
      <div className=" border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-18 text-center">
          <span className="text-[#B89B5E] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
            B2B Solutions
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#1A3C34] mb-4">
            Corporate <span className="italic text-amber-600">Gifting</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light text-sm md:text-base px-4">
            Strengthen professional bonds with authentic, handcrafted treasures from the Northeast. 
            Curated collections for onboarding, milestones, and festive celebrations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 ">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Image Container */}
                <Link to={`/products/${product._id}`} className="block relative overflow-hidden h-64">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                
                </Link>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-4">
                    <Link to={`/products/${product._id}`}>
                      <h3 className="text-[#1A3C34] font-serif text-lg mb-1 group-hover:text-[#B89B5E] transition-colors truncate">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                      Heritage Collection
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6 border-t border-gray-50 pt-4">
                    <div>
                      <p className="text-xl font-bold text-[#1A3C34]">
                        ₹{product.price}
                      </p>
                    </div>
                    
                      <Link
    to={`/products/${product._id}`}
    className="bg-[#1A3C34] text-white px-4 py-2 rounded-full text-sm hover:bg-[#B89B5E] transition-all shadow-lg"
  >
    View Details
  </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400">No corporate products found.</p>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default CorporateProductsPage;