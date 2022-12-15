import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './layout/login';
import RootLayout from './layout/root';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='*' element={<RootLayout />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
