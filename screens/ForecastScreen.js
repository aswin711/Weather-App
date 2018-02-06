import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class ForecastScreen extends Component {

    static navigationOptions = {
        header: null
    };

    renderBlock = (list,start,end,index) => {
        let condition = [];
        let temp_min = 0;
        let temp_max = 0;

        for ( let i = start; i < end ; i++ ){
            const slice = list[i];
            condition.push(slice.weather[0].main);
            temp_min += slice.main.temp_min;
            temp_max += slice.main.temp_max;
        }

        let div = 5;
        if (index != 0){
            div = 8;
        }
        temp_min = parseInt(temp_min/div);
        temp_max = parseInt(temp_max/div);

        return(
            <View style={styles.rowStyle}>
                {this.renderDay(index)}
                <Text style={styles.textStyle}>{condition[0]}</Text>
                <Text style={styles.textStyle}>{(temp_min)}°/{(temp_max)}°</Text>
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

    renderFourthDay = (list) => {
        return this.renderBlock(list,21,29,3);
    }

    renderFifthDay = (list) => {
        return this.renderBlock(list,29,37,4);
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
            return this.renderDate(day+index);
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
        const { params } = this.props.navigation.state;
        const { forecast } = params;
        console.log(params);
        return(
            <View style={styles.container}>
                <View style={styles.titleStyle}>
                <Text style={styles.titleTextStyle}>5 Days Forecast</Text>
                <Text>2/6 - 2/10</Text>
                </View>
                <View style={styles.content}>
                {this.renderToday(forecast)}
               
               <View style={styles.lineStyle} />

               {this.renderTommorrow(forecast)}
               <View style={styles.lineStyle} />

               {this.renderDayAfterTmrw(forecast)}
               <View style={styles.lineStyle} />
               {this.renderFourthDay(forecast)}
               <View style={styles.lineStyle} />
            
               {this.renderFifthDay(forecast)}
               <View style={styles.lineStyle} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-end'}}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    titleStyle: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'column'
    },
    titleTextStyle: {
        fontSize: 25,
        color: '#222222',
    },
    content: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    detailsTextStyle: {
        fontSize: 12,
        color: '#444444',
    },
    rowStyle: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 16,
        flex: 1,
        color: '#444444',
        padding: 5
    },
    lineStyle: {
        height: 0.5,
        backgroundColor: '#e1e1e1'
    },
    labelStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10   
    },
    labelTextStyle: {
        fontSize: 14,
        color: '#444444'
    }
}

export default ForecastScreen;