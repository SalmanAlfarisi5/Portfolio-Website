
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';

// The interactive demos pull in the Gradio client, so they're code-split and
// only loaded when a visitor actually opens the page.
const SaLLMan = React.lazy(() => import('@/pages/SaLLMan'));
const MultimodalRag = React.lazy(() => import('@/pages/MultimodalRag'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/sallman"
              element={
                <Suspense fallback={<PageLoader />}>
                  <SaLLMan />
                </Suspense>
              }
            />
            <Route
              path="/multimodal-rag"
              element={
                <Suspense fallback={<PageLoader />}>
                  <MultimodalRag />
                </Suspense>
              }
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
