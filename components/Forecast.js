import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Image } from 'react-native';
const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class Forecast extends Component {


    openForeCastScreen = () => {
        this.props.navigation.navigate('forecast',{forecast: this.props.data.list});
    }

    renderBlock = (list,start,end,index) => {
        let condition = [];
        let temp_min = this.props.currentTemp;
        let temp_max = this.props.currentTemp;
        

        for ( let i = start; i < end ; i++ ){
            const slice = list[i];
            condition.push(slice.weather[0]);
            if (slice.main.temp_max > temp_max){
                temp_max = slice.main.temp_max;
            }
            if (slice.main.temp_min < temp_min){
                temp_min = slice.main.temp_min;
            }
        }

        
        temp_min = Math.round((temp_min + 0.00001) * 100 ) / 100 ;
        temp_max = Math.round((temp_max + 0.00001) * 100 ) / 100 ;

        return(
            <View style={styles.rowStyle}>
             <View style={[ styles.singleRow,{ alignItems: 'flex-start'} ] }>
             {this.renderDay(index)}
             </View>
                <View style={[styles.singleRow,{ alignItems: 'center'}]}>
                <View style={styles.statusFrame}>
                    <Image
                        resizeMode="cover"
                        style={styles.iconImage}
                        source={{ uri: `${IMG_URL}${condition[0].icon}${IMG_EXT}`}}
                    />
                    <Text style={styles.textStyle}>{condition[0].main}</Text>
                </View>
                </View>
                <View style={[styles.singleRow, {alignItems: 'flex-end'}]}>
                <Text style={styles.textStyle}>{(temp_min)}°/{(temp_max)}°</Text>
                </View> 
               </View>
        );
    }

    renderToday = (list) => {
       return this.renderBlock(list,0,5,0);
    }

    renderTommorrow = (list) => {
        return this.renderBlock(list,5,13,1);
    }

    renderDayAfterTmrw = (list) => {
      return this.renderBlock(list,13,21,2);
    }

    renderDay = (index) => {
        if (index == 0){
            return(
                <Text style={styles.textStyle}>Today</Text>
            );
        } else if (index == 1){
            return(
                <Text style={styles.textStyle}>Tommorrow</Text>
            );
        } else {
            const date = new Date();
            const day = date.getDay();
            return this.renderDate(day+2);
        }
    }

    renderDate = (num) => {
        let day = "";
        switch(num) {
            case 0: 
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
                break;
            default:
                day = "Today";
        }

        return (
            <Text style={styles.textStyle}>{day}</Text>
        );
    }

    render() {
        const { list } = this.props.data;
        return(
            <View style={styles.container}>
               
                {this.renderToday(list)}
               
               <View style={styles.lineStyle} />

               {this.renderTommorrow(list)}
               <View style={styles.lineStyle} />

               {this.renderDayAfterTmrw(list)}
               <View style={styles.lineStyle} />

               <TouchableOpacity
                    onPress={() => this.openForeCastScreen()} 
               >
                <View  style={styles.labelStyle}>
                <Text style={styles.labelTextStyle}>5 Days Forecast</Text>
                </View>
                   
               </TouchableOpacity>

            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsTextStyle: {
        fontSize: 12,
        color: '#444444',
    },
    rowStyle: {
        flexDirection: 'row',
        padding: 10,   
    },
    singleRow:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textStyle: {
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
    }
}

export default Forecast;