import _ from 'lodash';
import { colors, getBannerColor } from './theme';
import { code } from './country_code';

export const IMG_URL = 'https://openweathermap.org/img/w/';
export const PNG_EXT = '.png';

const convert24To12 = (time) => {
    switch(time){
      case '00:00':
          return '12am';
      case '03:00':
          return '3am';
      case '06:00':
          return '6am';
      case '09:00':
          return '9am';
      case '12:00':
          return '12pm';
      case '15:00':
          return '3pm';
      case '18:00':
          return '6pm';
      case '21:00':
          return '9pm';
      case '00:00:00':
          return '12am';
      case '03:00:00':
          return '3am';
      case '06:00:00':
          return '6am';
      case '09:00:00':
          return '9am';
      case '12:00:00':
          return '12pm';
      case '15:00:00':
          return '3pm';
      case '18:00:00':
          return '6pm';
      case '21:00:00':
          return '9pm';
      default:
          return '12am';
    }
  }

  export const getPlotPoints = (data,limit) => {
    let plot = [];
    let weather = [];
    let list = data.slice(0,limit);
    let low = 0;
    let high = 0;
    _.map(list,(value,index) => {
        let time = value.dt_txt.split(" ");
        let xlabel = time[1].substr(0,5);
        y_label = parseInt(value.main.temp);
        if ( low < y_label ) {
          low = y_label;
        }
        if ( high > y_label ){
          high = y_label;
        }
        plot.push({x: convert24To12(xlabel),y: y_label});
        weather.push(value.weather[0]);
    });

    const scale = parseInt( (high - low ) / 4 );

    return { plot, domain: { y: [low-10, high-10 ]}, range: { y: [low-10, high-10 ]}, scale, weather };
}


export const getCityIndex = (cityId,list) => {
    let pos = 0;
    list.map((city,index) => {
        if(city.id === cityId){
            pos = index;
        }
    });
    return pos;
}

getCityId = (cityId,list) => {
    let pos = 0;
    list.map((city,index) => {
        if(city.id === cityId){
            pos = index;
        }
    });
    return pos;
}

export const getBanner = (id,list) => {
    const cityId = this.getCityId(id,list);
    return getBannerColor(cityId);
}

export const getWindDirection = (deg) => {
    if (deg < 45/2) {
        return 'E';
    }
    if (deg > 45/2 && deg < ( 45 + 45/2 ) ) {
        return 'NE';
    }
    if (deg > (45 + 45/2) && deg < (90 + 45/2 )){
        return 'N'
    }
    if (deg > (90 + 45/2) && deg < (135 + 45/2)){
        return 'NW';
    }
    if (deg > (135 + 45/2) && deg < (180 + 45/2)){
        return 'W';
    }
    if (deg > (180 + 45/2) && deg < (225 + 45/2)){
        return 'SW';
    }
    if (deg > (225 + 45/2) && deg < (270 + 45/2)){
        return 'S';
    }
    if (deg > (270 + 45/2) && deg < (315 + 45/2)){
        return 'SE';
    }
    if (deg > (315 + 45/2)){
        return 'E';
    }

    return 'N';
}

export const getForecastReport = (forecast) => {
    let report = [];
    let count = 0;
    forecast.map((data,index_out) => {

        let dateTime = data.dt_txt;
        let split_dateTime = dateTime.split(" ");
        let date = split_dateTime[0];
        let time = split_dateTime[1];
        let split_date = date.split("-");
        let year = split_date[0];
        let mon = split_date[1];
        let day = split_date[2];


        if ( report.length > 0) {
            let f = 0;
            _.map(report, (reportData,index_inner) => {
                if (reportData.date === date){
                    f = 1;
                    reportData.list.push({ time, main: data.main,weather: data.weather[0], wind: data.wind });
                } 
            });
            if ( f === 0){
                let list = [];
                list.push({ time, main: data.main, weather: data.weather[0], wind: data.wind });
                report.push({id: count++, date, list });
            }
        } else {
            let list = [];
            list.push({ time, main: data.main, weather: data.weather[0], wind: data.wind });
            report.push({id: count++, date, list });
        }
    });

    return report;
}

export const getTempRange = (data) => {
    let condition = [];
    let temp_max = 0;
    let temp_min = 0;
        if (data.id >= 0) {
            temp_min = data.list[0].main.temp_min;
            temp_max = data.list[0].main.temp_max;
    
            for ( let i = 0; i < data.list.length; i++ ){
                const slice = data.list[i];
                condition.push({ weather: slice.weather, wind: slice.wind});
                if (slice.main.temp_max > temp_max){
                    temp_max = slice.main.temp_max;
                }
                if (slice.main.temp_min < temp_min){
                    temp_min = slice.main.temp_min;
                }
            }
    
            temp_min = parseInt(temp_min);
            temp_max = parseInt(temp_max);  
}
    return { temp_min, temp_max, weather: condition[0].weather };
}

const getDay = (index,trim) => {
        
        let day = "";
        switch(index) {
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

        if (trim !== 0){
            return day.substr(0,trim);
        }
        return day;
   
}

export const  getWeekDay = (index) => {
    let day = "";
    if (index == 0){
       day = "Today";
    } else if (index == 1){
       day = "Tomorrow";
    } else {
        const date = new Date();
        const currentDay = date.getDay();
        const dayAfterTmrw = (currentDay + index) > 6 ? (currentDay + index) -6 - 1 : (currentDay + index) ;
        day = getDay(dayAfterTmrw,0);
    }

   return day;
}

export const  getCountry = (country_code) => {
    let countryName = "";
    code.map(country => {
        if (country.code === country_code){
            countryName = country.name;
        }
    });

    return countryName;
}

export const sortList = (dataList,cityList) => {
    let sortedList = [];
    _.map(cityList, city => {
        _.map(dataList, data => {
            if (data.id === city.id ){
                sortedList.push(data);
            }
        });
    });

    return sortedList;
}
