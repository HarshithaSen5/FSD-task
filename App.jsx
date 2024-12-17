import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../src/pages/register';
import Login from '../src/pages/login';
import Dashboard from '../src/pages/dashboard';

function App() {
    return (
        <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;