import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import {
  FormControl, InputAdornment, OutlinedInput,
} from '@mui/material';
import Search from '../../images/Search.svg';
import './QueryFilter.scss';
import { AppDispatch } from '../../store/store';
import * as topicsActions from '../../features/topics';
import { useAppSelector } from '../../store/hooks';

export const QueryFilter: FC = () => {
  const { initialQuery } = useAppSelector(state => state.topics);
  const [thisQuery, setThisQuery] = useState(initialQuery);
  const dispatch = useDispatch<AppDispatch>();

  const debounceFn = useCallback(
    debounce((value) => (
      dispatch(topicsActions.actions.setQuery(value))
    ), 1000), [],
  );

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThisQuery(event.target.value);
  };

  useEffect(() => {
    debounceFn(thisQuery);
  }, [thisQuery]);

  return (
    <div className="filter">
      <label
        htmlFor="outlined-basic"
        className="filter__label"
      >
        Filter by keywords
      </label>

      <FormControl
        sx={{ width: '42%' }}
        className="filter__input"
      >
        <OutlinedInput
          id="outlined-basic"
          startAdornment={(
            <InputAdornment position="start">
              <img src={Search} alt="search" />
            </InputAdornment>
          )}
          value={thisQuery}
          onChange={handleQuery}
        />
      </FormControl>
    </div>
  );
};
