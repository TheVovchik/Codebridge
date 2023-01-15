import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { QueryFilter } from '../../components/QueryFilter';
import { AppDispatch } from '../../store/store';
import * as topicsActions from '../../features/topics';
import './Homepage.scss';
import { useAppSelector } from '../../store/hooks';
import { Loader } from '../../components/Loader';
import { Results } from '../../components/Results';
import { Cards } from '../../components/Cards';

export const Homepage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading, error,
  } = useAppSelector(state => state.topics);

  useEffect(() => {
    dispatch(topicsActions.initAll());
  }, []);

  return (
    <div className="homepage">
      <QueryFilter />

      {loading && <Loader />}

      {!loading && error && (
        <div className="message">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <Results />

          <Cards />
        </>
      )}
    </div>
  );
};
