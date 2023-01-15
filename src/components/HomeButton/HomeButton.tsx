import { FC } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../../images/Arrow-Left.svg';
import './HomeButton.scss';

export const HomeButton: FC = () => {
  return (
    <Link
      to="/home"
      className="button"
    >
      <img
        src={Arrow}
        alt="Arrow-Left"
        className="topic__arrow"
      />

      <span className="topic__button-name">
        Back to homepage
      </span>
    </Link>
  );
};
