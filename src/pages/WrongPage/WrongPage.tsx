import { FC } from 'react';
import { HomeButton } from '../../components/HomeButton';

export const WrongPage: FC = () => {
  return (
    <div className="center">
      <h1>Something went wrong</h1>
      <HomeButton />
    </div>
  );
};
