import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate, saveEvent } from './api';


const style = StyleSheet.create({
    formContainer: {
        flex: 1
    },
    fieldContainer: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    text: {
        height: 40,
        margin: 0,
        marginRight: 7,
        marginLeft: 10
    },
    button: {
        height: 50,
        backgroundColor: "#48bbec",
        borderColor: "#48bbec",
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    },
    borderTop: {
        borderColor: '#edeeef',
        borderTopWidth: 0.5
    }
})

class EventForm extends Component {
    state = {
        title: null,
        date: ''
    }

    handleAddPress = () => {
        saveEvent(this.state)
            .then(() => this.props.navigation.goBack());
            // or change navigation.goBack to navigation.navigate('home)
    }

    handleChangeTitle = (value) => {
        this.setState({
            title: value
        })
    }

    handleDatePress = () => {
        this.setState({showDatepicker: true});
    }

    handleDatePicked = (date) => {
        this.setState({date})
        this.handleDatePickerHide();
    }

    handleDatePickerHide = () => {
        this.setState({showDatepicker: false})
    }

    render() {
        return(
            <View style={style.formContainer}>
                <View style={style.fieldContainer}>
                    <TextInput style={style.text}
                        placeholder="Event Title"
                        spellCheck={false}
                        value={this.state.title}
                        onChangeText={this.handleChangeTitle}
                    />
                    <TextInput 
                        style={[style.text, style.borderTop]}
                        placeholder="Set Time"
                        spellCheck={false}
                        value={formatDate(this.state.date.toString())}
                        editable={!this.state.showDatePicker}
                        onFocus={this.handleDatePress}
                    />
                    <DateTimePicker 
                        isVisible={this.state.showDatepicker}
                        mode="datetime"
                        onConfirm={this.handleDatePicked}
                        onCancel={this.handleDatePickerHide}
                    />
                </View>
                <TouchableHighlight onPress={this.handleAddPress}
                style={style.button}>
                    <Text style={style.buttonText}>Add</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default EventForm;