import React from 'react';
import Chart from 'chart.js';
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
    //Get ctx from string
    var ctx = chart.chart.ctx;
    
    //Get options from the center object in options
    var centerConfig = chart.config.options.elements.center;
    var fontStyle = centerConfig.fontStyle || 'Arial';
    var txt = centerConfig.text;
    var color = centerConfig.color || '#000';
    var sidePadding = centerConfig.sidePadding || 20;
    var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
    //Start with a base font of 30px
    ctx.font = "30px " + fontStyle;
    
    //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
    var stringWidth = ctx.measureText(txt).width;
    var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

    // Find out how much the font can grow in width.
    var widthRatio = elementWidth / stringWidth;
    var newFontSize = Math.floor(30 * widthRatio);
    var elementHeight = (chart.innerRadius * 2);

    // Pick a new font size so it will not be larger than the height of label.
    var fontSizeToUse = Math.min(newFontSize, elementHeight);

    //Set font settings to draw it correctly.
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
    ctx.font = fontSizeToUse+"px " + fontStyle;
    ctx.fillStyle = color;
    
    //Draw text in center
    ctx.fillText(txt, centerX, centerY);
        }
    }
})

class DoughtnutChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        // const bgColor = this.assignColors(this.props.name) // One possible way to assign colors
        const bgColor = this.assignRandomColor() // Random colors
        this.myChart = new Chart(this.chartRef.current, {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: this.props.split, //percent allocation of each asset. Accepts array of numbers [50,50]
                        backgroundColor: bgColor
                    }
                ],
                labels: this.props.assets, // Assets being allocated. Accepts array of strings ['cSAI', 'dLETH2x]
            },
            options: {
                responsive: true,
                legend: false,
                elements:{
                    center:{
                        text: [this.props.name],
                        sitePadding: 15,
                    }
                },
                tooltips: {
                    bodyFontSize: 14,

                }

            },

        });
    }

    //Accepts string argument of zap. Returns colors for doughnut chart for that zap
    assignColors(zap) {
        const colors = {
            'Lender': ['#7CCEFF', '#2023A8'],
            'EthMaximalist': ['#5540BF', '#a726f2']
        }
        return colors[zap]
    }

    // For each of the assets provided, assign a random color and remove that color from
    // the possible assignable colors (to prevent duplicates)
    // Returns array of colors [''#7CCEFF', '#2023A8',...,'#A726F2']
    assignRandomColor() {
        let possibleColors = ['#7CCEFF', '#2023A8', '#5540BF', '#A726F2', '#e80ba5', '#0ef448']
        const colors = this.props.assets.map(color =>
            possibleColors.splice(Math.floor(Math.random() * possibleColors.length), 1)[0]
        )
        return colors

    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default DoughtnutChart;
