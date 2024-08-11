interface IChartTimeFrame {
  year: number;
  month: number | null;
}

// BarChart

interface IBarChartSeries {
  name: string;
  data: number[];
}

interface IBarChartOptions {
  chart: {
    type: 'bar';
    toolbar: {
      show: boolean;
    };
    zoom: {
      enabled: boolean;
    };
  };
  colors: string[];
  dataLabels: {
    enabled: boolean;
  };
  xaxis: {
    categories: string[];
    labels: {
      style: {
        colors: string;
      };
    };
  };
  yaxis: {
    labels: {
      style: {
        colors: string;
      };
      formatter(value: number): string;
    };
  };
  fill: {
    opacity: number;
  };
  legend: {
    labels: {
      colors: string;
    };
    horizontalAlign: string;
  };
  tooltip: {
    enabled: boolean;
    theme: boolean;
  };
}

// PieChart

interface IPieChartOptions {
  colors: string[];
  labels: string[];
  legend: {
    labels: {
      colors: string;
    };
  };
  stroke: {
    width: number;
  };
}

export type {
  IChartTimeFrame,
  IBarChartSeries,
  IBarChartOptions,
  IPieChartOptions,
};
