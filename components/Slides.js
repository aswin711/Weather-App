import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    constructor(props){
        super();
    }
    
    renderSlides(){
        return this.props.data.map((slide, index) => {
            return (
                <View
                    key={slide.text}
                    style={[styles.slideStyle, {backgroundColor: slide.color}]}
                >
                    <Text style={styles.slideText}>{slide.text}</Text>
                </View>
            )     
            });
    }
    render () {
        //console.log("Hello");
        //console.log(this.props.data);
        return (
           <ScrollView
                pagingEnabled
                horizontal
                style={{ flex:1 }}
           >
                       {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    slideText: {
        fontSize: 30,
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15
    }
}

export default Slides;