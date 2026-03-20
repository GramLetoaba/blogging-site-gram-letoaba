import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/authcontext';
import NavBar from './components/navbar';
import Home from './pages/home';
import CreatePost from './pages/createpost';
import EditPost from './pages/editpost';
import ViewPost from './pages/viewpost';
import Login from './pages/login';
import Signup from './pages/signup';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <main className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<ViewPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<p style={{ padding: '2rem' }}>Page not found</p>} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
