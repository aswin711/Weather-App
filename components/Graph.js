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
        const { plot, domain, range } = this.props.data;
        console.log(plot);
        return (
            <View 
                pointerEvents="none"
                style={ styles.container}
            >
                <Text style={styles.label}>{ this.props.title }</Text>
                <VictoryChart
                  height={300}
                >
                    <VictoryAxis />
                    <VictoryAxis
                      dependentAxis
                      domain={domain}
                    />
                    <VictoryGroup
                        data={plot}
                    >
                    <VictoryLine
                        interpolation='natural'
                        range={range}
                         style={{
                            data: { stroke: "#c43a31" , strokeWidth: 3, strokeLineCap: 'round' },
                        }}
                        labels={(datum) => `${datum.y}°`}
                        labelComponent={<VictoryLabel renderInPortal dy={-5} dx={6}/>}
                    />
                    <VictoryScatter
                        data={plot}
                        size={5}
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
        backgroundColor: 'white',
        padding: 5,
        marginTop: 10
    },
    label: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '500'
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