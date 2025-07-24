import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../utils/products";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => {
    return products.find((p) => p.id.toString() === id.toString());
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getProductDetails = (product) => {
    if (!product) return {};

    const baseDetails = {
      origin: "South India",
      quality: "Premium Grade",
      packaging: "Air-tight sealed",
    };

    if (product.title.includes("Instant")) {
      return {
        ...baseDetails,
        weight: "200g",
        roast: "Medium",
        caffeine: "High",
        brewing: "Just add hot water",
      };
    } else if (product.title.includes("Cold Brew")) {
      return {
        ...baseDetails,
        volume: "250ml",
        roast: "Dark",
        caffeine: "Medium",
        brewing: "Ready to drink",
      };
    } else if (product.title.includes("Hot Brew")) {
      return {
        ...baseDetails,
        weight: "150g",
        roast: "Medium-Dark",
        caffeine: "High",
        brewing: "5 min steeping",
      };
    } else if (product.title.includes("Beans")) {
      return {
        ...baseDetails,
        weight: "250g",
        roast: "Various",
        caffeine: "High",
        brewing: "Grind & brew",
      };
    }

    return baseDetails;
  };

  const generateRating = (id) => {
    const ratings = [4.8, 4.6, 4.9, 4.5, 4.7, 4.4, 4.8, 4.3];
    return ratings[id - 1] || 4.5;
  };

  const generateReviews = (id) => {
    const reviews = [234, 189, 156, 298, 145, 267, 178, 89];
    return reviews[id - 1] || 150;
  };

  const calculateOriginalPrice = (price) => {
    return Math.floor(parseInt(price) * 1.25).toString();
  };

  const StarRating = ({ rating, size = "medium" }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={`${
              size === "small" ? "w-4 h-4" : "w-5 h-5"
            } fill-amber-400 text-amber-400`}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className={`${
              size === "small" ? "w-4 h-4" : "w-5 h-5"
            } fill-amber-200 text-amber-400`}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={`${
              size === "small" ? "w-4 h-4" : "w-5 h-5"
            } text-gray-300`}
          />
        );
      }
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  const handleBack = () => {
    console.log("Navigate back to products");
    navigate(-1);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#E6E5E1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-2xl font-light text-gray-800 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The coffee you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const productDetails = getProductDetails(product);
  const rating = generateRating(product.id);
  const reviews = generateReviews(product.id);
  const originalPrice = calculateOriginalPrice(product.price);
  const savings = originalPrice - product.price;

  return (
    <div className="min-h-screen bg-[#E6E5E1]">
      <div className="bg-[#E6E5E1] backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-amber-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="text-sm text-gray-500">
              Products / {product.title}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl p-8 shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl items-center justify-center text-amber-600 text-8xl hidden">
                ☕
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full border border-amber-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-light text-gray-800 mb-4 leading-tight">
                {product.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <StarRating rating={rating} />
                <span className="text-amber-600 font-medium">{rating}</span>
                <span className="text-gray-500">({reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-light text-gray-900">
                ₹ {product.price}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ₹ {originalPrice}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                Save ₹{savings}
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Product Details
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(productDetails).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-3 bg-amber-600 text-white py-4 px-6 rounded-lg hover:bg-amber-700 transition-colors text-lg font-medium">
                  <ShoppingCart className="w-5 h-5" />
                  {product.buttonText} - ₹ {parseInt(product.price) * quantity}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    isWishlisted
                      ? "border-red-300 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <div className="text-sm font-medium text-gray-800">
                  Free Delivery
                </div>
                <div className="text-xs text-gray-500">
                  On orders above ₹500
                </div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <div className="text-sm font-medium text-gray-800">
                  Quality Assured
                </div>
                <div className="text-xs text-gray-500">100% Authentic</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <div className="text-sm font-medium text-gray-800">
                  Easy Returns
                </div>
                <div className="text-xs text-gray-500">15 days return</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                You might also like
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {products
                  .filter((p) => p.id !== product.id)
                  .slice(0, 3)
                  .map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      className="text-center cursor-pointer group"
                      onClick={() =>
                        console.log(`Navigate to product ${relatedProduct.id}`)
                      }
                    >
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        className="w-full h-20 object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded flex items-center justify-center text-amber-600 text-2xl mb-2">
                        ☕
                      </div>
                      <div className="text-xs font-medium text-gray-800 mb-1 line-clamp-2">
                        {relatedProduct.title}
                      </div>
                      <div className="text-sm text-amber-600">
                        ₹ {relatedProduct.price}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
