import * as axios from 'axios';
import { config } from '@/lib/config';

export const httpClient = axios.create({
  baseURL: config.apiBaseUrl,
});
