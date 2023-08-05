interface StatistikData {
  minCosts: PayloadStat;
  maxCosts: PayloadStat;
  totalCosts: number;
  avgCosts: number;
  count: number;
  year: number;
}

type PayloadStat = {
  id: number;
  name: string;
  costs: number;
  target: Date;
};

type StatisticFullYearType = {
  month: string;
  count: number;
  costs: number;
  progress: ProgressType[];
};

type ProgressType = {
  id: number;
  name: string;
  progress: number;
};
