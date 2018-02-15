
export const defaultTheme = ['#4e54c8','#8f94fb'];

const moonPurple = ['#4e54c8','#8f94fb'];
const shifter = ['#bc4e9c','#f80759'];
const quepal = ['#11998e','#38ef7d'];
const orangeFun = ['#fc4a1a','#f7b733'];
const pinky = ['#dd5e89','#f7bb97'];
const seaWeed = [ '#4cb8c4', '#3cd3ad'];
const stripe = [ '#1fa2ff', '#12d8fa', '#a6ffcb'];
const mangoPulp = [ '#f09819', '#edde5d'];
const greenBeach = [ '#02aab0', '#00cdac'];
const skyLine = [ '#1488cc', '#2B32B2'];


export const getBannerColor = (id) => {
    switch (id) {
        case 0:
            return moonPurple;
        case 1:
            return shifter;
        case 2:
            return quepal;
        case 3:
            return orangeFun;
        case 4:
            return pinky;
        case 5:
            return seaWeed;
        case 6:
            return stripe;
        case 7:
            return mangoPulp;
        case 8:
            return greenBeach;
        case 9:
            return skyLine;
        default:
            return moonPurple;
    }  
}