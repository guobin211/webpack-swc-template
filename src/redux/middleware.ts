import { Middleware } from 'redux';
import logger from 'redux-logger';

function getMiddleWares(): Middleware[] {
  return [logger];
}

export default getMiddleWares;
