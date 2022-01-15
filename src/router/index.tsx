import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home.page';
import PlaygroundPage from '../pages/Playground.page';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlaygroundPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
