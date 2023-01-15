import {
  FC, Fragment, useMemo, useCallback, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line max-len
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { SortedTopic } from '../../../types/Topic';
import Arrow from '../../../images/Arrow-Right.svg';
import './Card.scss';
import { useAppSelector } from '../../../store/hooks';
import { AppDispatch } from '../../../store/store';
import * as topicsActions from '../../../features/topics';
import { sliceTopic } from '../../../Utils/sliceTopic';
import { sliceSummary } from '../../../Utils/sliceSummary';

type Props = {
  topic: SortedTopic,
};

export const Card: FC<Props> = ({ topic }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useAppSelector(state => state.topics);

  const {
    id, imageUrl, title, summary,
  } = topic;

  const [month, day, year] = new Date(topic.publishedAt)
    .toLocaleString('en-us',
      { day: 'numeric', month: 'long', year: 'numeric' })
    .split(' ');

  const hasMore = title.length > 40 || summary.length > 100;

  const topicTitle = useMemo(() => sliceTopic(title).split(' '), [query]);
  const description = useMemo(() => sliceSummary(summary).split(' '), [query]);

  const countMatches = useCallback(() => {
    const countTitles = topicTitle
      .reduce((acc, curr) => {
        return query
          .includes(curr.toLowerCase().replace(/[.,]/g, '').trim())
          ? acc + 1
          : acc;
      }, 0);

    const countDescr = description
      .reduce((acc, curr) => {
        return query
          .includes(curr.toLowerCase().replace(/[.,]/g, '').trim())
          ? acc + 1
          : acc;
      }, 0);

    const thisTopic = {
      ...topic,
      titleQueryMatches: countTitles,
      summaryQueryMatches: countDescr,
    };

    dispatch(topicsActions.actions.addMatches(thisTopic));
  }, [topicTitle, description, query]);

  useEffect(() => {
    countMatches();
  }, [topicTitle, description]);

  return (
    <div className="card">
      <div className="card__image-box">
        <img
          src={imageUrl}
          alt={title}
          className="card__image"
        />
      </div>

      <div className="card__data-box">
        <CalendarTodayOutlinedIcon
          color="disabled"
          sx={{ fontSize: 16 }}
        />

        <span className="card__data">
          {`${month} ${day.replace(',', 'th,')} ${year}`}
        </span>
      </div>

      <h2 className="card__title" lang="en-GB">
        {topicTitle.map((word, index) => {
          const isSelected = query
            .includes(word.toLowerCase().replace(/[.,]/g, '').trim());

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {isSelected
                ? <span className="card__selected-title">{`${`${word} `} `}</span>
                : `${word} `}
            </Fragment>
          );
        })}
      </h2>

      <p className="card__description">
        {description.map((word, index) => {
          const isSelected = query
            .includes(word.toLowerCase().replace(/[.,]/g, '').trim());

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={index}>
              {isSelected
                ? <span className="card__selected-desc">{`${`${word} `} `}</span>
                : `${word} `}
            </Fragment>
          );
        })}
      </p>

      {hasMore && (
        <Link
          to={`${id}`}
          className="card__more"
        >
          <span>
            Read more
          </span>

          <img
            src={Arrow}
            alt="Arrow-Right"
          />
        </Link>
      )}
    </div>
  );
};
