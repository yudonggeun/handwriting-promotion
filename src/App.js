import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSuccessProcess from './layout/login/loginSuccessProcessing';
import RootLayout from './layout/root';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<RootLayout />} />
          <Route path='/login/success' element={<LoginSuccessProcess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
