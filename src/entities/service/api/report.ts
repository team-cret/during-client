import { convertISO8601Duration } from '@/src/shared';
import { fetchAPI } from '../../auth/api/middleware';

function createReportAPI({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}): Promise<boolean> {
  return fetchAPI({
    path: 'api/v0/service/report',
    method: 'POST',
    body: {
      startDate,
      endDate,
    },
  });
}

function getReportListAPI(): Promise<
  Array<{
    id: number;
    startDate: Date;
    endDate: Date;
  }>
> {
  return fetchAPI({
    path: 'api/v0/service/report',
    method: 'GET',
  }).then((res) => {
    if (res == null) return [];
    return res.reportInfo.map(
      (report: {
        createDate: string;
        endDate: string;
        id: number;
        startDate: string;
        title: string;
      }) => {
        return {
          id: report.id,
          startDate: new Date(report.startDate),
          endDate: new Date(report.endDate),
        };
      }
    );
  });
}

function getReportAPI(id: number): Promise<{
  mbti: Array<{
    user_id: string;
    mbti: string;
  }>;
  average_reply_term: {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  concurrent_time_zone: Array<number>;
  frequency_of_affection: {
    years: number;
    months: number;
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  frequently_talked_topic: Array<string>;
  frequently_used_emotion: Array<string>;
  image: string;
  number_of_love_words: number;
  report_type: 'BIG' | 'SMALL';
  response_time_zone: Array<number>;
  sweetness_score: number;
} | null> {
  return fetchAPI({
    path: `api/v0/service/report/${id}`,
    method: 'GET',
  })
    .then((res) => {
      return JSON.parse(res.content);
    })
    .then((res) => {
      if (res === null) return null;
      console.log(res);

      return {
        mbti: res.MBTI.map((mbti: any) => ({
          user_id: mbti[0],
          mbti: mbti[1],
        })),
        average_reply_term: convertISO8601Duration(res.average_reply_term),
        concurrent_time_zone: res.concurrent_time_zone.map((time: number) => time),
        frequency_of_affection: convertISO8601Duration(res.frequency_of_affection),
        frequently_talked_topic: res.frequently_talked_topic.map((topic: string) => topic),
        frequently_used_emotion: res.frequently_used_emotion.map((emotion: any) => emotion[0]),
        image: res.image,
        number_of_love_words: res.number_of_love_words,
        report_type: res.report_type,
        response_time_zone: res.response_time_zone.map((time: number) => time),
        sweetness_score: res.sweetness_score,
      };
    });
}

export { createReportAPI, getReportListAPI, getReportAPI };
