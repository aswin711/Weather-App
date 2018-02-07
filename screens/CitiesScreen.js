import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import FAB from 'react-native-fab';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import ListCity from '../components/ListCity';

const THEME_COLOR = '#70BDC6';

class CitiesScreen extends Component {

    static navigationOptions = {
        title: 'Manage City',
        headerStyle: {
            backgroundColor: THEME_COLOR
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: '100'
        },
        headerRight: (
            <Button
                title="Edit"
                color='white'
            />
        )
    };

    openLocationScreen = () => {
        this.props.navigation.navigate('location',{theme: THEME_COLOR});
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
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={item => this.renderCity(item.item)}
                />

            <FAB 
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
        flexDirection: 'column',
    
    },
    fabButton: {
        height: 60,
        width: 60,
        borderWidth: 30,
        borderRadius: 30,
        borderColor: 'white',
        backgroundColor: 'white',
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
    return { data: state.home };
}

export default connect(mapStateToProps,actions)(CitiesScreen);