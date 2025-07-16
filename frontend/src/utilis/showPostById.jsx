import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router";
import apiClient from "../api/apiRequest";
import ReactMarkdown from "react-markdown";
import { 
  CircleUserRound, 
  Heart, 
  AlertCircle, 
  MessageCircle, 
  Tag, 
  Share2, 
  Clock,
  Calendar,
  Send 
} from "lucide-react";

// Import all images
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

export default function ShowPostById() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const imgArray = [
    img1, img2, img3, img4, img5, img6, img7,
    img8, img9, img10, img11, img12, img13, img14,
  ];

  // Memoize random image to prevent re-calculation
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * imgArray.length);
    return imgArray[randomIndex];
  }, [id]); // Only regenerate when post ID changes

  // Calculate reading time
  const calculateReadingTime = useCallback((text) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handle share
  const handleShare = async () => {
    const url = window.location.href;
    const title = result?.data?.title || "Check out this post";
    
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  // Handle like
  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    // TODO: Add API call to persist like
  }, [isLiked]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setIsSubmittingComment(true);
    // TODO: Add API call to submit comment
    
    // Simulate API call
    setTimeout(() => {
      setCommentText("");
      setIsSubmittingComment(false);
      // You would update the comments list here
    }, 1000);
  };

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await apiClient.get(`/user/view/post/${id}`);
        setResult(response);
        setLikeCount(response?.data?.likes || 0);
        setIsLiked(response?.data?.isLikedByUser || false);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    
    fetchPost();
  }, [id]);

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Skeleton loader */}
        <div className="animate-pulse">
          <div className="w-full h-[20vh] sm:h-[20vh] md:h-[30vh] lg:h-[40vh] bg-gray-200 dark:bg-gray-800"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 h-[80vh]">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                <div className="space-y-2">
                  <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-4 sm:h-5 w-28 sm:w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
                
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-6 sm:h-8 w-full sm:w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-3/4 sm:w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
              <br></br>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-6 sm:h-8 w-full sm:w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-3/4 sm:w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
              <br></br>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-6 sm:h-8 w-full sm:w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 sm:h-4 w-3/4 sm:w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
        <div className="text-center max-w-md">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-red-50 dark:bg-red-900/10 rounded-full blur-2xl"></div>
            <AlertCircle className="w-16 sm:w-20 h-16 sm:h-20 text-red-500 dark:text-red-400 mx-auto relative" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Something went wrong
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!result?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Post not found
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            The post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(result?.data?.description);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Image Section */}
      <div className="rounded-md relative md:w-full lg h-[20vh] sm:h-[20vh] md:h-[30vh] lg:h-[40vh] overflow-hidden group">
        <img    
          src={randomImage} 
          alt={result?.data?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 "
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 mb-6 sm:mb-8">
          {/* Author Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                {result?.data?.created_by?.avatar ? (
                  <img 
                    src={result.data.created_by.avatar} 
                    alt={result.data.created_by.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CircleUserRound className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-600 dark:text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {result?.data?.created_by?.full_name || "Anonymous"}
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">{formatDate(result?.data?.createdAt)}</span>
                    <span className="sm:hidden">{new Date(result?.data?.createdAt).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons - Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  aria-label="Share post"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                {showShareTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md whitespace-nowrap">
                    Link copied!
                  </div>
                )}
              </div>

              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-500' 
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label={isLiked ? "Unlike post" : "Like post"}
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-200 ${
                    isLiked ? 'fill-current' : 'group-hover:scale-110'
                  }`} 
                />
                <span className="text-sm font-medium">
                  {likeCount > 0 ? likeCount : 'Like'}
                </span>
              </button>
            </div>
          </div>

                  {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8 leading-tight">
            {result?.data?.title}
          </h1>

          {/* Formatted Description with Markdown */}
          <article className="prose prose-sm sm:prose-base lg:prose-lg prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-6 sm:mt-8 mb-3 sm:mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 sm:mt-8 mb-3 sm:mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4 sm:mt-6 mb-2 sm:mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="ml-2 sm:ml-4 leading-relaxed">
                    <span className="text-gray-600 dark:text-gray-400">{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900 dark:text-gray-100">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-700 dark:text-gray-300">
                    {children}
                  </em>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 sm:pl-6 py-2 my-3 sm:my-4 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                    <div className="italic text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                      {children}
                    </div>
                  </blockquote>
                ),
                code: ({ inline, children }) => 
                  inline ? (
                    <code className="bg-gray-100 dark:bg-gray-800 px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg overflow-x-auto mb-3 sm:mb-4">
                      <code className="text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">
                        {children}
                      </code>
                    </pre>
                  ),
                a: ({ href, children }) => (
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors break-words"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {result?.data?.description}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {result?.data?.tags && result.data.tags.length > 0 && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {result.data.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                    onClick={() => console.log(`Navigate to tag: ${tag}`)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                Comments {result?.data?.comments?.length > 0 && `(${result.data.comments.length})`}
              </h2>
            </div>
          </div>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="mb-6 sm:mb-8">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center">
                <CircleUserRound className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                  rows="3"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!commentText.trim() || isSubmittingComment}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                      commentText.trim() && !isSubmittingComment
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmittingComment ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 dark:border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
          
          {/* Comments List */}
          {result?.data?.comments && result.data.comments.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {result.data.comments.map((comment, index) => (
                <div
                  key={index}
                  className="group p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                      <CircleUserRound className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm truncate">
                          Anonymous User
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          • 2 hours ago
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                        {comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-700 mx-auto mb-2 sm:mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:hidden z-20">
        <div className="flex items-center gap-2 sm:gap-3 max-w-md mx-auto">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 rounded-full transition-all duration-200 text-sm ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
            }`}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{isLiked ? 'Liked' : 'Like'}</span>
            {likeCount > 0 && <span className="text-xs sm:text-sm">({likeCount})</span>}
          </button>
          <button
            onClick={handleShare}
            className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
            aria-label="Share post"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Add padding at bottom for mobile floating bar */}
      <div className="h-20 sm:h-24 md:hidden"></div>
    </div>
  );
}