import axios from 'axios';
import { Topic } from '../types/Topic';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v3/articles';

export const getTopics = async () => {
  return axios.get<Topic[]>(BASE_URL)
    .then(responce => responce.data)
    .catch(() => {
      throw new Error();
    });
};

export const getTopic = async (id: number) => {
  return axios.get<Topic>(`${BASE_URL}/${id}`)
    .then(responce => responce.data)
    .catch(() => {
      throw new Error();
    });
};
