import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Image, 
    FlatList,
    StyleSheet} from 'react-native';
import _ from 'lodash';
import { getForecastReport, getTempRange, IMG_URL, PNG_EXT, getWeekDay} from '../utils/commonUtils';

class Forecast extends Component {


    openForeCastScreen = (list) => {
        const {theme} = this.props;
        this.props.navigation.navigate('forecast',{forecast: list, theme});
    }

    renderBlock = (item) => {

        const { temp_min, temp_max, weather } = getTempRange(item.item);
        const imgUrl = `${IMG_URL}${weather.icon}${PNG_EXT}`;
        const id = item.item.id;
    
            return(
                <View style={{ flex: 1}}>
                <View style={styles.rowStyle}>
                 <View style={[ styles.singleRow,{ alignItems: 'flex-start'} ] }>
                 {this.renderDay(id)}
                 </View>
                    <View style={[styles.singleRow,{ alignItems: 'center'}]}>
                    <View style={styles.statusFrame}>
                        <Image
                            resizeMode="cover"
                            style={styles.iconImage}
                            source={{ uri: imgUrl }}
                        />
                        <Text style={styles.textStyle}>{weather.main}</Text>
                    </View>
                    </View>
                    <View style={[styles.singleRow, {alignItems: 'flex-end'}]}>
                    <Text style={styles.tempStyle}>{(temp_min)}°/{(temp_max)}°</Text>
                    </View> 
                   </View>
                   <View style={styles.rule} />
                </View>
               
            );
        
    }

    renderDay = (index) => {
        let day = getWeekDay(index);
        return (
            <Text style={styles.tempStyle}>{day}</Text>
        );
    }


    render() {
        const list = getForecastReport(this.props.data);
        return(
            <View style={styles.container}>
               <FlatList
                    data={list}
                    keyExtractor={item => item.date}
                    renderItem={item => this.renderBlock(item)}
               />
               <TouchableOpacity
                    onPress={() => this.openForeCastScreen(list)} 
               >
                    <View  style={styles.labelStyle}>
                        <Text style={styles.forecastLabel}>{list.length} Days Forecast</Text>
                    </View>  
               </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5
    },
    detailsTextStyle: {
        fontSize: 12,
        color: '#444444',
    },
    rowStyle: {
        flexDirection: 'row',
        padding: 5,   
    },
    singleRow:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 16,
        color: '#666666'
    },
    tempStyle:{
        fontSize: 16,
        color: '#444444'
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#999999'
    },
    labelStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10   
    },
    labelTextStyle: {
        fontSize: 14,
        color: '#444444'
    },
    iconImage: {
        width: 50,
        height: 50
    },
    statusFrame: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forecastLabel: {
        fontSize: 14,
        fontWeight: '100',
        color: '#444444'
    },
    rule: {
        borderBottomColor: '#999999',
        borderBottomWidth: 0.6,
        marginLeft: 10,
        marginRight: 10
    }
});

export default Forecast;