import { FC, useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { SortedTopic } from '../../types/Topic';
import { Card } from './Card/Card';
import './Cards.scss';

export const Cards: FC = () => {
  const { topicsWithQuery } = useAppSelector(state => state.topics);
  const { initialQuery } = useAppSelector(state => state.topics);
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
  }, [topicsWithQuery]);

  return (
    <div className="cards">
      {visible.map(topic => {
        return <Card topic={topic} key={topic.id} />;
      })}
    </div>
  );
};
