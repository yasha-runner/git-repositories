import React from 'react';
import './app.less';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Main } from './main/Main.jsx';
import { Card } from './card/Card.jsx';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/card/:username/:reponame" element={<Card />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
