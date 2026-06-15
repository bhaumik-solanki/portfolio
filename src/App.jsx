import { Routes, Route } from 'react-router-dom';
import { ScrollProgress } from './components/ui/ScrollProgress.jsx';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  return (
    <>
      <div className="bg-atmosphere" />
      <div className="bg-grain" />
      <ScrollProgress />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Catch-all: redirect anything else back to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
