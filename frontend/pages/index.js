import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiClock, FiAlertCircle, FiCheckCircle, FiGlobe, FiShield, FiHeart, FiSun } from 'react-icons/fi';

// Vibrant color palette
const colors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#ec4899',
  dark: '#1e293b',
  light: '#f8fafc',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444'
};

export default function TravelAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ask');
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load history
  useEffect(() => {
    const savedHistory = localStorage.getItem('travelQueries');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a question');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.post('http://localhost:8000/ask', {
        question: query
      });
      
      const newEntry = {
        query,
        response: res.data.response,
        timestamp: new Date().toISOString()
      };
      
      setResponse(res.data.response);
      const updatedHistory = [newEntry, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      localStorage.setItem('travelQueries', JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  // Animated background gradient
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite'
  };

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <Head>
        <title>Global Travel Assistant</title>
        <meta name="description" content="AI-powered travel guidance" />
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with animated elements */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <FiGlobe className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Global Travel Assistant</h1>
          <p className="text-lg text-white/80">
            Your AI-powered guide to visa, vaccine, and travel requirements
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'} gap-6`}>
          {/* Sidebar (hidden on mobile) */}
          {!isMobile && (
            <div className="space-y-6">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FiShield className="mr-2" /> Travel Tips
                </h2>
                <ul className="space-y-3">
                  {[
                    "Check passport validity (6+ months)",
                    "Make copies of important documents",
                    "Register with your embassy",
                    "Get travel insurance"
                  ].map((tip, i) => (
                    <motion.li 
                      key={i}
                      whileHover={{ x: 5 }}
                      className="text-white/90 text-sm p-3 bg-white/10 rounded-lg"
                    >
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FiHeart className="mr-2" /> Quick Links
                </h2>
                <div className="space-y-2">
                  {[
                    "Visa requirements for Japan?",
                    "Vaccines needed for Brazil?",
                    "COVID rules for Europe?"
                  ].map((question, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-3 text-sm text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                      onClick={() => {
                        setQuery(question);
                        setActiveTab('ask');
                      }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main content area */}
          <div className={`${isMobile ? 'col-span-1' : 'col-span-3'} space-y-6`}>
            {/* Tab navigation */}
            <div className="flex bg-white/20 backdrop-blur-md rounded-xl overflow-hidden">
              <button
                className={`flex-1 py-3 font-medium text-center transition-all ${activeTab === 'ask' ? 'bg-white/30 text-white' : 'text-white/70 hover:bg-white/10'}`}
                onClick={() => setActiveTab('ask')}
              >
                Ask Question
              </button>
              <button
                className={`flex-1 py-3 font-medium text-center transition-all ${activeTab === 'history' ? 'bg-white/30 text-white' : 'text-white/70 hover:bg-white/10'}`}
                onClick={() => setActiveTab('history')}
              >
                History
              </button>
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'ask' ? (
                <motion.div
                  key="ask"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Input card */}
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
                    <form onSubmit={handleSubmit}>
                      <label htmlFor="query" className="block text-lg font-medium text-white mb-3">
                        Your Travel Question
                      </label>
                      <textarea
                        id="query"
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/20 focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                        placeholder="e.g. What documents do I need for Japan?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        className={`mt-4 w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${loading ? 'bg-white/30 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30'} shadow-lg flex items-center justify-center`}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-2" />
                            Get Travel Advice
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>

                  {/* Response card */}
                  {response && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 mt-6 border border-white/10"
                    >
                      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <FiCheckCircle className="text-green-300 mr-2" />
                        Travel Advice
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        {response.split('\n').map((line, i) => (
                          <p 
                            key={i} 
                            className={line.startsWith('##') ? 'text-xl font-bold text-white mt-4 mb-2' : 'mb-3 text-white/90'}
                          >
                            {line.replace('##', '')}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/10">
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                      <FiClock className="text-yellow-300 mr-2" />
                      Query History
                    </h2>
                    {history.length > 0 ? (
                      <ul className="space-y-3">
                        {history.map((item, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all border border-white/10"
                            onClick={() => {
                              setQuery(item.query);
                              setResponse(item.response);
                              setActiveTab('ask');
                            }}
                          >
                            <p className="font-medium text-white truncate">{item.query}</p>
                            <p className="text-xs text-white/50 mt-1">
                              {new Date(item.timestamp).toLocaleString()}
                            </p>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8">
                        <FiSun className="mx-auto h-12 w-12 text-white/30 mb-3" />
                        <p className="text-white/70">Your query history will appear here</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-400/20 backdrop-blur-md border border-red-300/30 p-4 rounded-lg"
              >
                <div className="flex items-center">
                  <FiAlertCircle className="text-red-300 mr-2" />
                  <p className="text-white">{error}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} Global Travel Assistant • Powered by AI</p>
        </div>
      </footer>
    </div>
  );
}