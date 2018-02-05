import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ListCity from '../components/ListCity';

class CitiesScreen extends Component {

    static navigationOptions = {
        title: 'Manage City',
        headerMode: 'screen'
    };

    renderCity = (item) => {
        if( item.id > 0) {
            return (
                <ListCity
                    data={item.weather}
                />
            );
        } else {
            return <View/>;
        }  
    }
    render(){
        return(
            <FlatList
                data={this.props.data}
                keyExtractor={item => item.id}
                renderItem={item => this.renderCity(item.item)}
            />
        );
    }
}

function mapStateToProps(state){
    return { data: state.home };
}

export default connect(mapStateToProps,actions)(CitiesScreen);