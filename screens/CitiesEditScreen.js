import React, { Component } from 'react';
import { View, Text, FlatList, processColor } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Header } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import EditCity from '../components/EditCity';

const THEME_COLOR = '#70BDC6';

class CitiesEditScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleteItems: []
        }
    }
    static navigationOptions  = ({ navigation }) => ({
        title: 'Edit',
        headerStyle: {
            backgroundColor: THEME_COLOR
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: '100',
        },
        headerRight:(
            <Button
                transparent
                icon={
                    <Icon
                      name='md-create'
                      size={30}
                      color='white'
                    />
                  }
                title = "OK"
                color='white'
                onPress={() => console.log("OK")}
            />
        )
    });

   

    onDelete = (city) => {
        let deletedCity = "";
        this.props.cities.map((cityData,index) => {
            if(cityData.id === city.id){
                deletedCity = cityData.id;
                this.props.cities.splice(index,1);
            }
        });
        this.props.addCities(this.props.cities);

        let data = _.without(this.props.data,city);
        this.props.addPendingData(data);

       /* let currentDeletedItems = this.state.deleteItems;
        this.setState({
            deleteItems: currentDeletedItems.push({ city: deletedCity, data: city })
        });

        console.log(this.state.deleteItems);*/
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