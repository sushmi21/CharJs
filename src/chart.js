import React, { useEffect, useRef } from 'react';
import { Chart as ChartJs } from 'chart.js';
import PropTypes from 'prop-types';
import calculateTimeSeries from './utils';

const Chart = ({ riskLevel, cones, initialSum }) => {
  const canvas = useRef();

  useEffect(() => {
    const drawChart = async () => {
      const { mu, sigma } = cones.filter(
        cone => cone.riskLevel === riskLevel
      )[0];
      const fee = 0.01;

      const timeSeries = await calculateTimeSeries({
        mu,
        sigma,
        years: 10,
        initialSum, // from props
        monthlySum: 200,
        fee
      });

      const labels = await timeSeries.median.map((v, idx) =>
        idx % 12 === 0 ? idx / 12 : ''
      );
      const dataMedian = await timeSeries.median.map(v => v.y);
      const dataGood = await timeSeries.upper95.map(v => v.y);
      const dataBad = await timeSeries.lower05.map(v => v.y);

      const data = {
        datasets: [
          {
            data: dataGood,
            label: 'Good performance',
            borderColor: 'rgba(100, 255, 100, 0.2)',
            fill: false,
            pointRadius: 0
          },
          {
            data: dataMedian,
            label: 'Median performance',
            borderColor: 'rgba(100, 100, 100, 0.2)',
            fill: false,
            pointRadius: 0
          },
          {
            data: dataBad,
            label: 'Bad performance',
            borderColor: 'rgba(255, 100, 100, 0.2)',
            fill: false,
            pointRadius: 0
          }
        ],
        labels
      };

      const options = {
        responsive: false,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Years'
              },
              gridLines: {
                drawOnChartArea: false
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Valuation (EUR)'
              }
            }
          ]
        }
      };

      const config = {
        type: 'line',
        data,
        options
      };

      const context = canvas.current.getContext('2d');
      new ChartJs(context, config);
    };

    drawChart();
  }, []);

  return (
    <div>
      <canvas ref={canvas} width={600} height={400} />
    </div>
  );
};

Chart.defaultProps = {
  riskLevel: 3,
  initialSum: 10000
};

Chart.propTypes = {
  riskLevel: PropTypes.number,
  cones: PropTypes.arrayOf(PropTypes.object).isRequired, // cones array cannot be null
  initialSum: PropTypes.number
};
export default Chart;
