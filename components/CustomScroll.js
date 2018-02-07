import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class CustomScroll extends Component {
    render() {
        return(
            <ScrollView 
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            >
                {this.props.children}
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
}

export default CustomScroll;

/*
                     */
                   