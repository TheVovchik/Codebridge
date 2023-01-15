import { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { AppDispatch } from '../../store/store';
import { SortedTopic } from '../../types/Topic';
import { Card } from './Card/Card';
import './Cards.scss';
import * as topicsActions from '../../features/topics';

export const Cards: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    topicsWithQuery, initialQuery, quantity,
  } = useAppSelector(state => state.topics);
  const [visible, setVisible] = useState<SortedTopic[]>(topicsWithQuery);

  useEffect(() => {
    let sorted = [...topicsWithQuery];

    if (initialQuery) {
      sorted = sorted
        .sort((topicA, topicB) => {
          if (topicA.titleQueryMatches > topicB.titleQueryMatches) {
            return -1;
          }

          if (topicA.titleQueryMatches < topicB.titleQueryMatches) {
            return 1;
          }

          if (topicA.titleQueryMatches === topicB.titleQueryMatches) {
            if (topicA.summaryQueryMatches > topicB.summaryQueryMatches) {
              return -1;
            }

            if (topicA.summaryQueryMatches < topicB.summaryQueryMatches) {
              return 1;
            }
          }

          return 0;
        })
        .filter(topic => topic.summaryQueryMatches || topic.titleQueryMatches);
    }

    setVisible(sorted);
    dispatch(topicsActions.actions.changeQuantity(sorted.length));
  }, [topicsWithQuery]);

  useEffect(() => {
    dispatch(topicsActions.actions.countMatches());
  }, [initialQuery]);

  return (
    <>
      {quantity !== 0
        ? (
          <div className="cards">
            {visible.map(topic => {
              return <Card topic={topic} key={topic.id} />;
            })}
          </div>
        )
        : (
          <div className="message">
            There is no news according to your request
          </div>
        )}
    </>
  );
};
