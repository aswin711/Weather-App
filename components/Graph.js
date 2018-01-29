import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Graph  extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.detailsTextStyle}>Graph</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5,
        marginTop: 10,
    },
    detailsTextStyle: {
        fontSize: 12,
        color: '#444444',
    },
}

export default Graph;