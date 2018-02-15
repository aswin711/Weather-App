import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

import City from './City';
import { Button } from 'react-native-elements';
import { defaultTheme } from '../utils/theme';
import { SCREEN_WIDTH } from '../utils/deviceUtils';

class CityList extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true
        }

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000);
    }
    componentDidMount(){
        this.props.cities.map(city => {
            this.props.fetchData(city.id);
        });
    }

    openLocationScreen = () => {
        this.props.navigation.navigate('location',{theme: defaultTheme[0]});
    }

    renderCity = (item) => {
        if (item.id > 0 ){
            return(
                <City 
                    data={item}
                    navigation={this.props.navigation}
                />
            );
        }
    }
    renderNoCityContent = () => {
        if(!this.state.loading) {
            return (
                <View >
                    <Text style={styles.emptyText}>No cities added yet!!!</Text>
                    <Button 
                        onPress={() => this.openLocationScreen()}
                        title="Add City"
                        backgroundColor="#3498db"
                        color="#FFF"
                        buttonStyle={styles.button}
                    />
                </View>
            );
        }
    }
    renderLoader = () => {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator style={styles.loader} size="large" />  
                    <Text style={styles.emptyText}>Loading cities...</Text>  
                </View>
            );
        } else {
            return <View />
        }
       
    }

    renderEmptyComponent = () => {
       
        return(
            <View style={styles.container}>
                <Image 
                    style={styles.iconImage}
                    source={require("../utils/img/no_city_icon.png")}
                />
                {this.renderLoader()}
                {this.renderNoCityContent()}
            </View>
        );
    }
    render() {
        
        if (this.props.data) {
            return(
                <FlatList
                pagingEnabled
                data={this.props.data}
                horizontal
                alwaysBounceVertical={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={this.renderEmptyComponent()}
                keyExtractor={item => item.id}
                renderItem={({item}) => this.renderCity(item)}
                />   
               
            );  
        }      
    }
}

const styles = {
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    flatListContainer: {
        flex: 1,
     
    },
    iconImage: {
        width: 150,
        height: 150
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '200',
        color: '#444444',
        marginTop: 10
    },
    loader: {
        marginTop: 15
    },
    button: {
        marginTop: 15
    }
}

function mapStateToProps(state){
    return {data: state.home, cities: state.city };
}

export default connect(mapStateToProps,actions)(CityList);