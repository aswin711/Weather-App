import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { cities } from '../utils/popular_cities';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LocationScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            search: false,
            searchText: ''
        }
    }

    static navigationOptions = ({navigation}) => (
        {
            title: 'Select Location',
            headerStyle: {
                backgroundColor: navigation.state.params.theme
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: '100'
            }
        }
    );

    clearText = (text) => {
        if(text.length === 0){
            this.setState({
                search: false
            })
        }
    }

    changeText = (text) => {
        if (text.length > 0){
            //Call location search action
            this.props.searchLocation(text);

            this.setState({
                search: true,
                searchText: text
            });
        } else {
            this.setState({
                search: false
            });
        }
    }

    renderSearchCities = () => {
        if (this.props.location.length > 0) {
            return (
                <View>
                    <Text style={styles.label}>Results</Text>
                    <FlatList
                        data={this.props.location}
                        keyExtractor={city => city.id}
                        renderItem={city => this.renderList(city.item)}
                    />
                </View>
            );
        } else {
            return (
                <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>No results found</Text>
                </View>
            );
        }
        
    }

    reset(){
        return this.props
                   .navigation
                   .dispatch(NavigationActions.reset(
                     {
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName: 'home'})
                        ]
                      }));
      }

    addCity = (city) => {
        this.props.addCity(city);
        this.reset();
    }

    renderList = (city) => {
        return (
            <View style={styles.list}>
                <TouchableOpacity
                    onPress={() => this.addCity(city)}
                >
                <View >
                <Text style={styles.listItem}>{city.name}</Text>
                </View>
              
                </TouchableOpacity>
            </View>
        );
    }

    renderPopularCities = () => {
        return (
            <View>
                <Text style={styles.label}>Popular Cities</Text>
                <FlatList
                    data={cities}
                    numColumns={3}
                    key={city => city.name}
                    keyExtractor={city => city.id}
                    renderItem={city => this.renderList(city.item)}
                />
            </View>
        );
        
    }
    renderSearchContent = () => {
        if (!this.state.search) {
           return this.renderPopularCities();
        }
        return this.renderSearchCities();
    }
    render() {
        return(
            <View style={styles.container}>
            <SearchBar
                lightTheme
                onClearText={(text) => this.clearText(text)}
                onChangeText={(text) => this.changeText(text)}
                icon={{ type: 'font-awesome', name: 'search' }}
                placeholder='Type Here...' 
            />
                {this.renderSearchContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    list: {
        backgroundColor: 'white',
        borderColor: '#f9f9f9',
        borderWidth: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 10,
        padding: 10
    },
    listItem: {
        fontSize: 14,
        color: '#444',
        fontWeight: "200"
    },
    noResults: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },
    noResultsText: {
        fontSize: 16,
        color: '#444444'
    },
    label:{
        fontSize: 16,
        color: '#444',
        fontWeight: '100'
    }
});

function mapStateToProps({ location, city }){
    return { location, city };
}

export default connect(mapStateToProps,actions)(LocationScreen);