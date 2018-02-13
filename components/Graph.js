import React, {Component} from 'react';
import {View, Text } from 'react-native';
import _ from 'lodash';
import { 
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryLabel,
    VictoryAxis,
    VictoryGroup,
    VictoryScatter } from 'victory-native';

class Graph extends Component {



    render() {
        const { plot, domain, range, scale,style } = this.props.data;
        console.log(plot);
        return (
            <View 
                pointerEvents="none"
                style={styles.container}
            >
                <VictoryChart
                  height={120}
                  padding={10}
                  domainPadding={{ x: [5, 5], y: [15,15]}}

                >
                 <VictoryAxis
                    style={{
                      axis: { stroke: 'transparent'},
                      axisLabel: { fontSize: 12, fill: '#ffffff'}
                    }}
                 />
                    <VictoryAxis
                      dependentAxis
                      domain={domain}
                      style={{
                        axis: { stroke: 'transparent'}
                      }}
                    />
                    <VictoryGroup
                        data={plot}
                    >
                   
                    <VictoryLine
                        interpolation='natural'
                        range={range}
                        scale={{ x: 'linear', y: 'sqrt'}} 
                         style={{
                            data: { stroke: "white" , strokeWidth: 3, opacity: 1 },
                            labels: { fill: "white"}
                        }}
                        labels={(datum) => `${datum.y}°`}
                        labelComponent={<VictoryLabel renderInPortal dy={-1} />}
                    />
                    <VictoryScatter
                        data={plot}
                        scale={{ x: 'linear', y: 'sqrt'}} 
                        size={5}
                        style={{
                          data: {fill: "white", opacity: 0.8},
                          labels: {fontSize: 12},
                          parent: {border: "1px solid #ccc"}
                        }}
                    />
                    </VictoryGroup>
                </VictoryChart>
            </View>
        )
    }

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    label: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '500'
    },
    chart: {
      height: 0,
      width: 0,
      backgroundColor: 'rgba(0,0,0,0)'
    }
}

export default Graph;


/*

class CustomPie extends React.Component {
  render() {
    const {datum, x, y} = this.props;
    const pieWidth = 120;

    return (
      <g transform={
        `translate(${x - pieWidth / 2}, ${y - pieWidth / 2})`
        }
      >
        <VictoryPie
          standalone={false}
          height={pieWidth}
          width={pieWidth}
          data={datum.pie}
          style={{labels: {fontSize: 0}}}
          colorScale={["#f77", "#55e", "#8af"]}
        />
      </g>
    );
  }
}

class CustomDataComponent extends React.Component {
  render() {
    const data = [
      {x: "Jan", y: 30},
      {x: "Feb", y: 32},
      {x: "Mar", y: 65},
      {x: "Apr", y: 38},
      {x: "May", y: 50},
      {x: "Jun", y: 47},
      {x: "Jul", y: 38},
      {x: "Aug", y: 48},
      {x: "Sep", y: 80},
      {x: "Oct", y: 73},
      {x: "Nov", y: 76},
      {x: "Dec", y: 100}
    ];

    const pieData = data.map((datum) => {
      datum.pie = [
        {x: "Lions", y: Math.round(Math.random() * 10)},
        {x: "Tigers", y: Math.round(Math.random() * 10)},
        {x: "Bears", y: Math.round(Math.random() * 10)}
      ];
      return datum;
    });

    return (
      <VictoryChart domain={{y: [0, 100]}}>
        <VictoryAxis/>
        <VictoryGroup data={pieData}>
          <VictoryLine/>
          <VictoryScatter
            dataComponent={<CustomPie />}
          />
        </VictoryGroup>
      </VictoryChart>
    );
  }
}

ReactDOM.render(<CustomDataComponent/>, mountNode)

*/