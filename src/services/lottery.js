import request from '../utils/request';

export function getPrize() {
  return request('/api/lottery');
}
