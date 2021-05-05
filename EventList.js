import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import EventCard from './EventCard';
import { getEvents } from './api';

const style = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f3f3f3'
    },
})

class EventList extends Component {
    state = {
        events: []
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                events: this.state.events.map(e => ({
                    ...e,
                    timer: Date.now(),
                }))
            })
        }, 1000);

        // esta seccion se debe de cambiar por la funcion de getEvents mas abajo, descomentarla
        const events = require('./db.json').events.map( e => ({
            ...e,
            date: new Date(e.date),
        }));
        this.setState({events});

        // this.props.navigattion.addListener('didFocus', () => {
            //getEvents().then(event => this.setState({ events }));
        // })
    }

    handleAddEvent = () => {
        this.props.navigation.navigate('Form')
    }

    render() {
        return [
            <FlatList
                style={style.list}
                data={this.state.events}
                renderItem={({item}) => <EventCard event={item}/>}
                keyExtractor = {item => item.id}
            />,
            <ActionButton 
            key="fab"
            onPress={this.handleAddEvent}
            buttonColor="rgba(231,76,60,1)" />
        ]
    }
}

export default EventList;