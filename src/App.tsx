import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import FavoritosPage from './pages/FavoritosPage';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Header />
        <main className="app-main" id="conteudo">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
