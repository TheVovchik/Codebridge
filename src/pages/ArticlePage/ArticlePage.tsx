/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import * as topicActions from '../../features/topic';
import { useAppSelector } from '../../store/hooks';
import './ArticlePage.scss';
import Arrow from '../../images/Arrow-Left.svg';

export const ArticlePage: FC = () => {
  const [topicId, setTopicId] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { topic, loading, error } = useAppSelector(state => state.topic);

  useEffect(() => {
    const currentPath = location.pathname.slice(1);

    setTopicId(+currentPath);
  }, [location]);

  useEffect(() => {
    if (topicId !== 0) {
      dispatch(topicActions.initOne(topicId));
    }
  }, [topicId]);

  return (
    <>
      {!loading && topic && (
        <div className="topic">
          <div className="topic__back-img">
            <img
              src={topic.imageUrl}
              alt={topic.title}
              className="topic__img"
            />
          </div>

          <div className="topic__about">
            <h1 className="topic__title">
              {topic.title}
            </h1>

            <p className="topic__summary">
              {topic.summary}
            </p>
          </div>

          <Link
            to="/home"
            className="topic__back"
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
        </div>
      )}
    </>

  );
};
