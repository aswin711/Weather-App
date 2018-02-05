import React, { Component } from 'react';
import { View, Text } from 'react-native';

class BottomTab extends Component {

    openCitiesScreen = () => {
        console.log('pressed');
        this.props.navigation.navigate('cities');
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                <View style={styles.tabStyle}>
                    <Text onPress={this.props.add} style={styles.tabTextStyle}>Add</Text>
                </View>
                <View style={styles.tabStyle}>
                <Text style={styles.tabTextStyle}>Tabs</Text>
                </View>
                <View style={styles.tabStyle}>
                <Text style={styles.tabTextStyle}>Settings</Text>
                </View>
     
                </View>   
            </View>
        );
    }
}

const styles = {
    container: {
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center', 
    },
    innerContainer: {
        flexDirection: 'row',
        padding: 7,
    },
    tabTextStyle: {
        fontSize: 12,
        color: '#b2b2b2',
    },
    tabStyle: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default BottomTab;