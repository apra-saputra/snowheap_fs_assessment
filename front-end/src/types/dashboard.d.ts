interface StatistikData {
  minCosts: PayloadStat;
  maxCosts: PayloadStat;
  totalCosts: number;
  avgCosts: number;
  count: number;
  year: number;
}

type KeyStatisticType = keyof StatistikData

type PayloadStat = {
  id: number;
  name: string;
  costs: number;
  target: Date;
};

type ProgressFullYearType = {
  month: string;
  count: number;
  costs: number;
  progress: ProgressType[];
};

type ProgressType = {
  id: number;
  name: string;
  costs: number;
  progress: number;
};

type PayloadDashboard = {
  statistic: StatistikData;
  progress: ProgressFullYearType[];
};
