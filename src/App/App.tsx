import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ArticlePage } from '../pages/ArticlePage';
import { Homepage } from '../pages/Homepage';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/:id" element={<ArticlePage />} />
    </Routes>
  );
};
