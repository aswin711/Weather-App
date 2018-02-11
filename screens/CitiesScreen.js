import React, { Component } from 'react';
import { View, Text, FlatList, ToastAndroid } from 'react-native';
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
                title = "Edit"
                color='white'
                onPress={() => navigation.navigate('edit')}
            />
        )
    });

    navigateToEdit = () => {
        this.props.navigation.navigate('edit');
    }

    openLocationScreen = () => {
        if (this.props.cities.length <= 3){
            this.props.navigation.navigate('location',{theme: THEME_COLOR});
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
        //console.log(this.props.cities);
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={item => this.renderCity(item.item)}
                />

            <FAB 
            style={styles.fabButton}
            buttonColor={THEME_COLOR}
            iconTextColor="#FFFFFF" 
            onClickAction={() => this.openLocationScreen()} 
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