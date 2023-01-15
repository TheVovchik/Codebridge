import { FC, useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import './Results.scss';

export const Results: FC = () => {
  const { quantity } = useAppSelector(state => state.topics);
  const isEmpty = useMemo(() => quantity === 0, [quantity]);

  return (
    <>
      {isEmpty ? (
        <div className="results">
          News list is empty
        </div>
      )
        : (
          <div className="results">
            {`Results: ${quantity}`}
          </div>
        )}
    </>
  );
};
