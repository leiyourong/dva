import request from '../utils/request';

export function getNotices() {
  return request('/api/notices');
}
