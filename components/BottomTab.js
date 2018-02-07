import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class BottomTab extends Component {

    openCitiesScreen = () => {
        console.log('pressed');
        this.props.navigation.navigate('cities');
    }

    renderTab = () => {
        return (
            <Text style={styles.tabTextStyle}>Tabs</Text>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                <View style={styles.tab1}>
                    <TouchableOpacity
                        onPress={this.props.add} 
                    >
                        <Icon name="md-add" size={35} color="#222"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tab2}>
                    {this.renderTab()}
                </View>
                <View style={styles.tab3}>
                <TouchableOpacity>
                    <Icon name="md-apps" size={35} color="#222"/>
                </TouchableOpacity>
                </View>
     
                </View>   
            </View>
        );
    }
}

const styles = {
    container: {
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center', 
        elevation: 5
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 7,
    },
    tabTextStyle: {
        color: '#b2b2b2',
    },
    tab1: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    tab2: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tab3: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
}

export default BottomTab;