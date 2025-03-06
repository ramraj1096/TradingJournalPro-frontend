import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { motion } from 'framer-motion';

const MarketNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newsPerPage] = useState<number>(21);

  useEffect(() => {
    const fetchNews = async () => {
      const NEWS_API_ONE = import.meta.env.VITE_NEWS_API_ONE as string;
      const NEWS_API_TWO = import.meta.env.VITE_NEWS_API_TWO as string;

      try {
        const [newsResponse, sentimentResponse] = await Promise.all([
          axios.get(NEWS_API_ONE),
          axios.get(NEWS_API_TWO),
        ]);

        const combinedNews = [
          ...(newsResponse.data.feed || []),
          ...(sentimentResponse.data.feed || []),
        ];

        setNews(combinedNews);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Pagination logic
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <motion.div 
      className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-center text-blue-600 mb-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Market News
      </motion.h2>

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-xl text-red-500">{error}</div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {currentNews.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 dark:bg-gray-800 hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 bg-gradient-to-r from-gray-500 to-gray-400 text-white">
                  <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                  <p className="text-sm mt-2">{moment(item.time_published).format('MMM D, YYYY [at] h:mm A')}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700 dark:text-slate-300 line-clamp-3">{item.summary}</p>
                </div>
                <div className="p-4 border-t">
                  {item.banner_image ? (
                    <img
                      src={item.banner_image}
                      alt="news banner"
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                  ) : (
                    <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-600 rounded-md mb-3">
                      No Image Available
                    </div>
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read Full Article ↗
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex justify-center mt-6 space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <motion.button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded-md border transition-all duration-200 ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default MarketNews;
