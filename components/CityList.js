import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

import City from './City';

class CityList extends Component {

    componentDidMount(){
        this.props.cities.map(city => {
            this.props.fetchData(city.id);
        });
    }

    renderCity = (item) => {
        if (item.id > 0 ){
            return(
                <City 
                    data={item}
                    forecast={() => this.openForeCastScreen()}
                    navigation={this.props.navigation}
                />
            );
        }
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
                keyExtractor={item => item.id}
                renderItem={({item}) => this.renderCity(item)}
                />
            );
        }
        return <View />
       
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
}

function mapStateToProps(state){
    return {data: state.home, cities: state.city };
}

export default connect(mapStateToProps,actions)(CityList);