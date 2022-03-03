import axios from 'axios';
import { APP_CONFIG } from 'config';

const {
  HTTPS_SERVICE: { BASE_URL, TIMEOUT }
} = APP_CONFIG;

export const httpsService = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});
