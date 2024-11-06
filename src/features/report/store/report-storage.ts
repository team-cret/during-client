import { createReportAPI, getReportAPI, getReportListAPI } from '@/src/entities';
import { create } from 'zustand';

//질문
//2024-10-24 ~ 2024-10-30 : 단
//2024-10-24 ~ 2024-10-31 : 장

type State = {
  reportList: Array<{
    id: number;
    startDate: Date;
    endDate: Date;
  }>;

  report: {
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
    info: {
      startDate: Date;
      endDate: Date;
    };
  } | null;

  reportCreate: {
    startDate: Date | null;
    endDate: Date | null;

    isReportCreatable: boolean;
  };
};

const defaultState: State = {
  reportList: [],

  report: null,

  reportCreate: {
    startDate: null,
    endDate: null,
    isReportCreatable: false,
  },
};

type Action = {
  initReportList: () => void;
  getReportDetail: (id: number) => Promise<boolean>;

  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  createReport: () => Promise<Boolean>;
};

const useReportStore = create<State & Action>((set, get) => ({
  ...defaultState,

  //actions
  initReportList: () => {
    getReportListAPI().then((reportList) => {
      set({
        reportList,
      });
    });
  },

  getReportDetail: async (id: number) => {
    const res = await getReportAPI(id);
    if (res == null) return false;
    const reportInfo = get().reportList.find((report) => report.id === id);

    console.log(res);

    set({
      report: {
        ...res,
        info: {
          startDate: reportInfo?.startDate!,
          endDate: reportInfo?.endDate!,
        },
      },
    });

    console.log(res);

    return true;
  },

  setStartDate: (date) => {
    set((state) => ({
      reportCreate: {
        ...state.reportCreate,
        startDate: date,
        isReportCreatable: date !== null && state.reportCreate.endDate !== null,
      },
    }));
  },
  setEndDate: (date) =>
    set((state) => ({
      reportCreate: {
        ...state.reportCreate,
        endDate: date,
        isReportCreatable: state.reportCreate.startDate !== null && date !== null,
      },
    })),
  createReport: async () => {
    return createReportAPI({
      startDate: get().reportCreate.startDate!,
      endDate: get().reportCreate.endDate!,
    });
  },
}));

export { useReportStore };
