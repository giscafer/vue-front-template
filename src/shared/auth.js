import Cookies from 'js-cookie';
import { TOKEN_KEY } from './constants';

const TokenKey = TOKEN_KEY;

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
