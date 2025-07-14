import { useEffect, useState } from "react";
import apiRequest from "../api/apiRequest.js";
import GalaxyLoader from "../utilis/loading_snippet.jsx";
import isNew from "../utilis/isNew.js";
import img1 from "../images/collection/img-1.jpg";
import img2 from "../images/collection/img-2.jpg";
import img3 from "../images/collection/img-3.jpg";
import img4 from "../images/collection/img-4.jpg";
import img5 from "../images/collection/img-5.jpg";
import img6 from "../images/collection/img-6.jpg";
import img7 from "../images/collection/img-7.jpg";
import img8 from "../images/collection/img-8.jpg";
import img9 from "../images/collection/img-9.jpg";
import img10 from "../images/collection/img-10.jpg";
import img11 from "../images/collection/img-11.jpg";
import img12 from "../images/collection/img-12.jpg";
import img13 from "../images/collection/img-13.jpg";
import img14 from "../images/collection/img-14.jpg";
import { Heart, AlertCircle, Clock, Tag, Moon, Sun } from "lucide-react";

export default function Body() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  
  const imgArray = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14];
  
  // Function to get random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imgArray.length);
    return imgArray[randomIndex];
  };

  useEffect(() => {
    // Disable transitions during theme switch
    document.documentElement.classList.add("no-transitions");
    
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
    
    // Re-enable transitions after a brief delay
    setTimeout(() => {
      document.documentElement.classList.remove("no-transitions");
    }, 50);
  }, [darkMode]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiRequest.get("/user/view-all/post");
        
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          throw new Error("API response is not in the expected format.");
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <GalaxyLoader />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full blur-xl animate-pulse"></div>
            <AlertCircle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto relative" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-xl"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center relative">
              <Tag className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            No posts yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for amazing content!
          </p>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {posts.map((card, index) => (
            <div
              key={card?._id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-gray-900/50 transition-shadow transition-transform duration-500 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-opacity duration-500 pointer-events-none"></div>

              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img 
                  src={getRandomImage()} 
                  alt={card?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* NEW Badge */}
                {isNew(card?.createdAt) && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg transform rotate-3">
                    NEW
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                  {card?.title}
                </h2>

                {/* Tags - Single Row with Overflow */}
                {card?.tags && card.tags.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 overflow-hidden">
                    <div className="flex gap-2 flex-nowrap overflow-hidden">
                      {card.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 cursor-pointer whitespace-nowrap flex-shrink-0"
                        >
                          <Tag className="w-3 h-3 mr-1 flex-shrink-0" />
                          <span className="truncate max-w-[100px]">{tag}</span>
                        </span>
                      ))}
                    </div>
                    {card.tags.length > 2 && (
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full flex-shrink-0">
                        +{card.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {card?.createdAt ? formatDate(card.createdAt) : "Recently"}
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Heart className={`w-4 h-4 ${likedPosts.has(card?._id) ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{card.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for animations and no-transitions */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Disable all transitions when switching themes */
        .no-transitions * {
          transition: none !important;
        } 
      `}</style>
    </div>
  );
}