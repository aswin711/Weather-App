import React, {Component} from 'react';
import {View, Text, FlatList, Image, StyleSheet } from 'react-native';
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
import { IMG_URL, PNG_EXT } from '../utils/commonUtils';

class Graph extends Component {


  renderWeatherBlock = (block) => {
    const imgUrl = `${IMG_URL}${block.icon}${PNG_EXT}`;
    return (
      <View style={styles.blockStyle}>
       <Image
          style={styles.iconImage}
          source={{ uri: imgUrl}}
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
        //console.log(plot);
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
        backgroundColor: 'rgba(0,0,0,0)'
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
      marginLeft: '5.9%',
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
});

export default Graph;