import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const IMG_URL = 'https://openweathermap.org/img/w/';
const IMG_EXT = '.png';
class Label extends Component {
    openCitiesScreen = (theme) => {
        this.props.navigation.navigate('cities',{theme});
    }
    render() {
        const {theme, city, temp, status } = this.props;
        //30°
        return(
            <LinearGradient colors={theme}>
                <View style={styles.container}>
                <View style={styles.detailsStyle}>
                    <Text style={styles.smallTextStyle}>{ city }</Text>
                    <Text style={styles.largeTextStyle}>{ temp }°</Text>
                    <View style={styles.statusFrame}>
                    <Image
                        style={styles.iconImage}
                        source={{ uri: `${IMG_URL}${status.icon}${IMG_EXT}`}}
                    />
                    <Text style={styles.smallTextStyle}>{ status.main }</Text>
                    </View>    
                </View>
                <View style={styles.addCityView}>
                    <TouchableOpacity onPress={() => this.openCitiesScreen(theme)}>
                        <Icon 
                            name="md-add"
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                </View>   
            </LinearGradient> 
        );
    }
}

const styles = {
    container: {
        height: 310,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageStyle: {
        position: 'absolute',
        height: 310
    },
    detailsStyle: {
        flex: 0.5,
        marginTop: 20,
        marginLeft: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    smallTextStyle: {
        fontSize: 16,
        color: 'white',
        marginLeft: 5
    },
    largeTextStyle: {
        fontSize: 60,
        color: 'white',
        fontWeight: '100'
    },
    iconImage: {
        width: 50,
        height: 50
    },
    statusFrame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addCityView: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginTop: 20,
        marginRight: 20
    },
    
}

export default Label;