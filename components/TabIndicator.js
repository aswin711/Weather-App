import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const INDICATOR = [
    {"id": 1,"selected":false},
    {"id": 2,"selected":true},
    {"id": 3,"selected":false},
    {"id": 4,"selected":false}
];
class TabIndicator extends Component {

    generateIndicator = (count,pos) => {
        let list = [];
        for (let i=0; i< count; i++) {
            let indicator = {id: i, selected: false};
            if (i === pos){
                indicator = {...indicator, selected: true}
            }
            list.push(indicator);
        }
        return list;
    }

    renderCircle = () => {
        return (
            <Svg
                height="10"
                width= "8"
            >
                <Circle
                   cx="4"
                   cy="5"
                   r="2.5"
                   stroke="#FFFFFF"
                   strokeWidth="1"
                   fill="#FFFFFF"
                   />
            </Svg>
        );
    }

    renderSelectedCircle = (color) => {
        return (
            <Svg
                height="10"
                width= "8"
            >
                <Circle
                   cx="4"
                   cy="5"
                   r="2.5"
                   stroke={color}
                   strokeWidth="1"
                   fill={color}
                   />
            </Svg>
        );
    }

    renderView = (item,theme) => {
        if(item.selected){
            return this.renderSelectedCircle(theme[0]);
        }
        return this.renderCircle();
    }

    renderContent = (list,width,theme) => {
        if (list.length > 1) {
            return(
                <FlatList
                    style={[styles.container,{width}]}
                    horizontal
                    data={list}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => this.renderView(item,theme)}
                />
            );
        }
        return <View />
    }
   
    render() {
        const { selected, size } = this.props.indicator;
        const {theme} = this.props;
        const list = this.generateIndicator(size,selected);
        //console.log(list);
        const width = size * 12;
        return this.renderContent(list,width,theme);
    }
}

const styles = {
    container: {
      height: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
   
}

export default TabIndicator;