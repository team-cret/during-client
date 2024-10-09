import { fetchAPI } from '../../auth/api/middleware';

async function takeAttendanceAPI() {
  return fetchAPI({
    method: 'POST',
    path: 'api/v0/event/attendance',
  }).then((res) => {
    return res ?? false;
  });
}

export { takeAttendanceAPI };
