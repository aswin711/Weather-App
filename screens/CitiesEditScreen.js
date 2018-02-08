import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Header } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import EditCity from '../components/EditCity';

const THEME_COLOR = '#70BDC6';

class CitiesEditScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Manage City',
        header: (
            <Header 
                backgroundColor={THEME_COLOR}
                leftComponent={
                    <Button 
                    title='Cancel' 
                    textStyle={{ color: 'white', fontSize: 12}}
                    onPress={() => navigation.goBack()}
                    />}
                centerComponent={{ text: 'Edit', style:{ color: '#FFF', fontSize: 14}}}
                rightComponent={
                    <Button 
                    title='OK'
                    textStyle={{ color: 'white', fontSize: 12}}
                    onPress={() => console.log("OK")}
                    />}
            />
        )
    });

    onDelete = (city) => {
        let cities = this.props.cities;
        _.map(this.props.cities,(singleCity,index) => {
            if (singleCity.id === city.id){
                cities.splice(index,1);
            }
        });
        this.props.addCities(cities);

        let data = this.props.data;
        _.map(this.props.data, (cityData,index) => {
            console.log(cityData.id,city.id);
           /* if (cityData.id === city.id){
                data.splice(index,1);
            }*/
        });
        //this.props.addPendingData(data);
    }

    renderCity = (item) => {
        if( item.id > 0) {
            return (
                <EditCity
                    data={item.weather}
                    delete={() => this.onDelete(item)}
                />
            );
        } else {
            return <View/>;
        }  
    }

    render() {
        return(
            <View style={styles.container}>
               <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={item => this.renderCity(item.item)}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
}

function mapStateToProps(state){
    return { cities: state.city, data: state.home };
}

export default connect(mapStateToProps,actions)(CitiesEditScreen);