import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-space-black text-white">
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<CharacterList />} />
                <Route path="/character/:id" element={<CharacterDetail />} />
              </Routes>
            </main>
          </div>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App; 