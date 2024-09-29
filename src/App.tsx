import React from 'react';
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar/Navbar';
import Main from './pages/main/main';

function App(): JSX.Element {
  return (
    <div className="App bg-gray-900 min-h-screen flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
