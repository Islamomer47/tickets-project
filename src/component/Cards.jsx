import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function Cards({ events = [], searchQuery = "" }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust the number of items per page as needed

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top for better UX
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top for better UX
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top for better UX
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-32">
          {currentEvents.map((event) => (
            <motion.div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 border border-gray-200 rounded-lg shadow-lg dark:border-gray-700 overflow-hidden w-full max-w-xs" // Reduced width
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              }} // Hover effect
              transition={{ duration: 0.3 }}
            >
              <Link to={`/event/${event.id}`}>
                <img
                  className="w-full h-48 object-cover"
                  src={event.mainImage}
                  alt={event.name}
                />
              </Link>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {event.name}
                </h5>
                <p className="mb-2 text-gray-700 dark:text-gray-400">
                  {event.title}
                </p>
                <p className="mb-2 text-gray-700 dark:text-gray-400">
                  {event.details.date}
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-400">
                  {event.details.price} JD
                </p>
                <Link
                  to={`/event/${event.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center my-6 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-300"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
              currentPage === index + 1
                ? "bg-green-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-300"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Cards;
