import {
  FC, Fragment, memo,
} from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line max-len
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { SortedTopic } from '../../../types/Topic';
import Arrow from '../../../images/Arrow-Right.svg';
import './Card.scss';
import { useAppSelector } from '../../../store/hooks';
import { sliceSummary } from '../../../Utils/sliceSummary';
import { sliceTitle } from '../../../Utils/sliceTitle';

type Props = {
  topic: SortedTopic,
};

export const Card: FC<Props> = memo(({ topic }) => {
  const { query } = useAppSelector(state => state.topics);
  const navigate = useNavigate();

  const {
    id, imageUrl, title, summary,
  } = topic;

  const [month, day, year] = new Date(topic.publishedAt)
    .toLocaleString('en-us',
      { day: 'numeric', month: 'long', year: 'numeric' })
    .split(' ');

  const hasMore = title.length > 70 || summary.length > 100;
  const topicTitle = sliceTitle(title).split(' ');
  const description = sliceSummary(summary).split(' ');

  const openTopic = () => {
    navigate(`/${id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="card"
      onClick={openTopic}
    >
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
                ? (
                  <>
                    <span className="card__selected-title">{word}</span>
                    <span>{' '}</span>
                  </>
                )
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
                ? (
                  <>
                    <span className="card__selected-desc">{word}</span>
                    <span>{' '}</span>
                  </>
                )
                : `${word} `}
            </Fragment>
          );
        })}
      </p>

      {hasMore && (
        <div
          className="card__more"
        >
          <span>
            Read more
          </span>

          <img
            src={Arrow}
            alt="Arrow-Right"
          />
        </div>
      )}
    </div>
  );
});
