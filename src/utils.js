const mapDate = ({ t, mu, sigma, fee, initialSum, monthlySum }) => {
  const yearlyReturn = mu - fee;
  const monthlyReturn = yearlyReturn / 12;
  const month = t * 12;

  const median =
    initialSum * Math.exp(yearlyReturn * t) +
    (monthlySum *
      Math.exp(monthlyReturn * (month - Math.floor(month))) *
      (Math.exp(monthlyReturn * Math.floor(month)) - 1.0)) /
      (Math.exp(monthlyReturn) - 1.0);

  return {
    median,
    upper95: Math.exp(Math.log(median) + Math.sqrt(t) * sigma * 1.645),
    lower05: Math.exp(Math.log(median) - Math.sqrt(t) * sigma * 1.645)
  };
};

const calculateTimeSeries = ({
  years,
  mu,
  sigma,
  fee,
  initialSum,
  monthlySum
}) => {
  const series = [];
  // changed k++ to k+=1 - no unary operator lint fix
  for (let k = 0; k <= 12 * years; k += 1) {
    series.push(mapDate({ t: k / 12, mu, sigma, fee, initialSum, monthlySum }));
  }

  const allSeries = {
    median: [],
    upper95: [],
    lower05: []
  };

  for (let k = 0; k < series.length; k += 1) {
    allSeries.median.push({ y: series[k].median, x: series[k].x });
    allSeries.upper95.push({ y: series[k].upper95, x: series[k].x });
    allSeries.lower05.push({ y: series[k].lower05, x: series[k].x });
  }

  return allSeries;
};

export default calculateTimeSeries;
