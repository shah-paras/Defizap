//import React from 'react';
import Chart from 'chart.js';
import isEmpty from 'lodash/isEmpty';
import React, { PureComponent, useState } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

export default function DoughtnutChart(props) {

const name = props.data.name;
var data = props.data.components;
const [activeIndex, setActiveIndex] = useState(0);


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent).toFixed(2)}%)`}
      </text>
    </g>
  );
};


  let onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

    return (
      <div className = "donot-chart">
        <font size = "3" color = "black">{name}</font>
        <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              dataKey="percent"
              onMouseEnter={onPieEnter} >
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color}/>
                ))
              }
          </Pie>
        }
        </PieChart>
      </div>
    );
}


// round corners
// Chart.pluginService.register({
//     afterUpdate: function (chart) {
//         if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
//             var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
//             arc.round = {
//                 x: (chart.chartArea.left + chart.chartArea.right) / 2,
//                 y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
//                 radius: (chart.outerRadius + chart.innerRadius) / 2,
//                 thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
//                 backgroundColor: arc._model.backgroundColor
//             }
//         }
//     },

//     afterDraw: function (chart) {
//         if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
//             var ctx = chart.chart.ctx;
//             var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
//             var startAngle = Math.PI / 2 - arc._view.startAngle;
//             var endAngle = Math.PI / 2 - arc._view.endAngle;

//             ctx.save();
//             ctx.translate(arc.round.x, arc.round.y);
//             console.log(arc.round.startAngle)
//             ctx.fillStyle = arc.round.backgroundColor;
//             ctx.beginPath();
//             ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
//             ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
//             ctx.closePath();
//             ctx.fill();
//             ctx.restore();
//         }
//     },
// });

// write text plugin
Chart.pluginService.register({
  afterUpdate(chart) {
    if (chart.config.options.elements.center) {
      const { helpers } = Chart;
      const centerConfig = chart.config.options.elements.center;
      const globalConfig = Chart.defaults.global;
      const { ctx } = chart.chart;

      const fontStyle = helpers.getValueOrDefault(
        centerConfig.fontStyle,
        globalConfig.defaultFontStyle
      );
      const fontFamily = helpers.getValueOrDefault(
        centerConfig.fontFamily,
        globalConfig.defaultFontFamily
      );

      if (centerConfig.fontSize) var { fontSize } = centerConfig;
      // figure out the best font size, if one is not specified
      else {
        ctx.save();
        var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
        const maxFontSize = helpers.getValueOrDefault(
          centerConfig.maxFontSize,
          256
        );
        const maxText = helpers.getValueOrDefault(
          centerConfig.maxText,
          centerConfig.text
        );

        do {
          ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
          const textWidth = ctx.measureText(maxText).width;

          // check if it fits, is within configured limits and that we are not simply toggling back and forth
          if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
            fontSize += 1;
          else {
            // reverse last step
            fontSize -= 1;
            break;
          }
        } while (true);
        ctx.restore();
      }

      // save properties
      chart.center = {
        font: helpers.fontString(fontSize, fontStyle, fontFamily),
        fillStyle: helpers.getValueOrDefault(
          centerConfig.fontColor,
          globalConfig.defaultFontColor
        )
      };
    }
  },
  afterDraw(chart) {
    if (chart.center) {
      const centerConfig = chart.config.options.elements.center;
      const { ctx } = chart.chart;

      ctx.save();
      ctx.font = chart.center.font;
      ctx.fillStyle = chart.center.fillStyle;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.fillText(centerConfig.text, centerX, centerY);
      ctx.restore();
    }
  }
});

// class DoughtnutChart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       text: props.data.text, 
//       showText: true,
//       chartData : []
//     };
//     this.chartRef = React.createRef();
//   }
//   componentDidMount() {
//     let tempChartData = [];
//     debugger;
//     const half = !(this.props.data.components.length > 1);
//     const percentages = this.assignPercentages(half);
//    // const colors = this.assignColors(half);
//     const names = this.assignNames(half);
//     tempChartData.push({
//       "names": names,
//       "percentages": percentages,
//       "colors": colors
//     });
//     this.setState({chartData : tempChartData});
//     console.log("Temp:", tempChartData);
//     console.log("Data: ", this.state.chartData);
//     // const bgColor = this.assignColors(this.props.name) // One possible way to assign colors
//     // const bgColor = this.assignRandomColor() // Random colors
//     this.myChart = new Chart(this.chartRef.current, {
//       type: 'doughnut',
//       data: {
//         datasets: [
//           {
//             data: percentages, // percent allocation of each asset. Accepts array of numbers [50,50]
//             backgroundColor: colors,
//             weight: 0.05
//           }
//         ],
//         labels: names // Assets being allocated. Accepts array of strings ['cSAI', 'dLETH2x]
//       },
//       options: {
//         // rotation: 1 * Math.PI,
//         // circumference: 1 * Math.PI,
//         title: {
//           display: true,
//           fontSize: 18,
//           text: this.props.data.name
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//         tooltips: {
//           callbacks: {
//             title: (items, data) =>
//               data.labels[items[0].index]
//                 ? data.labels[items[0].index]
//                 : data.labels[items[0].index - 1],
//             label: (items, data) =>
//               data.labels[items.index]
//                 ? `${data.datasets[0].data[items.index]}%`
//                 : `${data.datasets[0].data[items.index - 1]}%`
//           },
//           backgroundColor: 'black',
//           bodyFontColor: 'white',
//           bodyFontSize: 14,
//           displayColors: false
//         },
//         legend: {
//           position: 'top',
//           display: false
//         },
//         cutoutPercentage: 45,
//         elements: {
//           arc: {
//             roundedCornersFor: 0
//           },
//           top: {
//             // the longest text that could appear in the center
//             maxText: '100%',
//             text: this.state.showText ? this.props.data.name || '' : '',
//             fontColor: '#FFFFF',
//             fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
//             fontStyle: 'normal',
//             fontSize: 18,
//             // if a fontSize is NOT specified, it will scale (within the below limits) maxText to take up the maximum space in the center
//             // if these are not specified either, we default to 1 and 256
//             minFontSize: 1,
//             maxFontSize: 256
//           }
//         }
//       }
//     });
//   }

//   // Accepts string argument of zap. Returns colors for doughnut chart for that zap
//   // assignColors(zap) {
//   //   const colors = {
//   //     Lender: ['#7CCEFF', '#2023A8'],
//   //     EthMaximalist: ['#5540BF', '#a726f2']
//   //   };
//   //   return colors[zap];
//   // }

//   // For each of the assets provided, assign a random color and remove that color from
//   // the possible assignable colors (to prevent duplicates)
//   // Returns array of colors [''#7CCEFF', '#2023A8',...,'#A726F2']
//   assignRandomColor = () => {
//     const possibleColors = [
//       '#7CCEFF',
//       '#2023A8',
//       '#5540BF',
//       '#A726F2',
//       '#e80ba5',
//       '#0ef448',
//       '#eaa207'
//     ];
//     const color = possibleColors.splice(
//       Math.floor(Math.random() * possibleColors.length),
//       1
//     )[0];
//     return color;
//   };

//   assignPercentages(half) {
//     const percentages = this.props.data.components.map(component => {
//       return component.percent;
//     });
//     if (half) percentages.push(100 - this.props.data.components[0].percent);
//     return percentages;
//   }

//   assignColors() {
//     const colors = this.props.data.components.map(component => {
//       if (!isEmpty(component.color)) {
//         return component.color;
//       }
//       return this.assignRandomColor();
//     });
//     // console.log('colors ', colors);
//     return colors;
//   }

//   assignNames(half) {
//     const names = this.props.data.components.map(component => {
//       return component.name;
//     });
//     if (half) names.push(null);

//     return names;
//   }

//   render() {
//     return (
//       <div>
//         <canvas ref={this.chartRef} />
//       </div>
//     );
//   }
// }

// export default DoughtnutChart;
