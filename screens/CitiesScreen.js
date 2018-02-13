import React, { Component } from 'react';
import { View, Text, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import FAB from 'react-native-fab';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import ListCity from '../components/ListCity';

const THEME_COLOR = '#70BDC6';

class CitiesScreen extends Component {

    constructor(props){
        super(props);
        const { navigate } = this.props.navigation;
    }

  

    static navigationOptions  = ({ navigation }) => ({
        title: 'Manage City',
        headerStyle: {
            backgroundColor: navigation.state.params.theme[1]
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: '100',
        },
        headerRight:(
            <TouchableOpacity
             onPress={() => navigation.navigate('edit')}
             style={{ marginRight: 10}}
            >
                    <Icon
                      name='md-create'
                      size={30}
                      color='white'
                    />
            </TouchableOpacity>       
        )
    });

    navigateToEdit = () => {
        this.props.navigation.navigate('edit');
    }

    openLocationScreen = (theme) => {
        if (this.props.cities.length <= 3){
            this.props.navigation.navigate('location',{theme});
        } else {
            ToastAndroid.show("Unable to add more than 4 cities", ToastAndroid.SHORT);
        }
        
    }

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
        const {theme} = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={item => this.renderCity(item.item)}
                />

            <FAB 
            style={styles.fabButton}
            buttonColor={theme[1]}
            iconTextColor="#FFFFFF" 
            onClickAction={() => this.openLocationScreen(theme[1])} 
            visible={true} 
           />

            </View>
            
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
    
    },
    fabButton: {
        height: 60,
        width: 60,
        borderWidth: 30,
        borderRadius: 30,
        borderColor: THEME_COLOR,
        backgroundColor: THEME_COLOR,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 10,
        marginBottom: 10
    },
    iconStyle: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

function mapStateToProps(state){
    return { data: state.home, cities: state.city };
}

export default connect(mapStateToProps,actions)(CitiesScreen);