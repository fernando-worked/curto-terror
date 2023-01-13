
import './App.css';
import WrapperApp from './components/WrapperApp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:texto" element={<WrapperApp />} />
        <Route path="/" element={<WrapperApp />} />
      </Routes>
    </Router>
  );
} 

export default App;
