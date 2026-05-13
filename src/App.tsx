import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import CoachingView from './pages/CoachingView';
import FounderProfile from './pages/FounderProfile';
import Toppers from './pages/Toppers';
import Admissions from './pages/Admissions';
import AdminDashboard from './pages/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/coaching-view" element={<CoachingView />} />
            <Route path="/founder" element={<FounderProfile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/toppers" element={<Toppers />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </div>
    </Router>
  );
}
