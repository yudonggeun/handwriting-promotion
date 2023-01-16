import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RootLayout from './layout/root';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<RootLayout />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
