import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ArticlePage } from '../pages/ArticlePage';
import { Homepage } from '../pages/Homepage';
import { WrongPage } from '../pages/WrongPage';

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/:id" element={<ArticlePage />} />
      <Route path="*" element={<WrongPage />} />
    </Routes>
  );
};
