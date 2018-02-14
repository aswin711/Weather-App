import React, {Component} from 'react';
import {View, Text, FlatList, Image } from 'react-native';
import _ from 'lodash';
import { 
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryLabel,
    VictoryAxis,
    VictoryGroup,
    VictoryScatter, 
    VictoryZoomContainer} from 'victory-native';
const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class Graph extends Component {


  renderWeatherBlock = (block) => {
    return (
      <View style={styles.blockStyle}>
       <Image
          style={styles.iconImage}
          source={{ uri: `${IMG_URL}${block.icon}${IMG_EXT}`}}
        />
        <Text style={styles.blockText}>{block.x}</Text>
      </View>
    );
  }

  getBlockData = (weather,plot) => {
    let block = [];
    for (let i = 0; i < plot.length; i++){
      block.push({id: i, icon: weather[i].icon, x: plot[i].x });
    }

    return block;
  }


    render() {
        const { weather,plot, domain, range, scale,style } = this.props.data;
        const block = this.getBlockData(weather,plot);
        return (
            <View 
                pointerEvents="none"
                style={styles.container}
            >
            <View style={styles.topContainer}>
            <VictoryChart
                  height={120}
                  padding={10}
                  domainPadding={{ x: [5, 5], y: [15,15]}}
                 
                >
                
                    <VictoryAxis
                      dependentAxis
                      domain={domain}
                      style={{
                        axis: { stroke: 'transparent'},
                        axisLabel: { fontSize: 10, fill:'#FFFFFF'}
                      }}
                    />
                    <VictoryGroup
                        data={plot}
                    >
                   
                    <VictoryLine
                      
                        interpolation='natural'
                        range={range}
                        scale={{ x: 'linear', y: 'linear'}} 
                         style={{
                            data: { stroke: "white" , strokeWidth: 2 },
                            labels: { fill: "white"}
                        }}
                        labels={(datum) => `${datum.y}°`}
                        labelComponent={<VictoryLabel renderInPortal dy={-1} />}
                    />
                    <VictoryScatter
                        data={plot}
                        scale={{ x: 'linear', y: 'sqrt'}} 
                        size={3}
                        style={{
                          data: {fill: "white"},
                          labels: {fontSize: 12},
                          parent: {border: "1px solid #ccc"}
                        }}
                    />
                    </VictoryGroup>
                </VictoryChart>

            </View>
          
                  <FlatList
                    style={styles.bottomContainer}
                    data={block}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => this.renderWeatherBlock(item)}
                  />
        
            </View>
        )
    }

}

const styles = {
    container: {
      flex: 1,
      flexDirection:'column',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    topContainer: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    bottomContainer:{
      flex: 0.5,
      flexDirection: 'row',
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
    },
    blockStyle: {
      flexDirection: 'column',
      marginLeft: '4%',
      marginRight: '4%',
      alignItems: 'center'
    },
    blockText: {
      fontSize: 12,
      color: 'white',
    },
    iconImage: {
      height: 30,
      width: 30,
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