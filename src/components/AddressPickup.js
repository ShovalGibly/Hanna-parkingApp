import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleMapKey as GOOGLE_MAP_KEY } from '../constants/googleMapKey';

const AddressPickup = ({ placeholderText, fetchAddress }) => {

    const onPressAddress = (data, details) => {
        
        console.log("************");
        let address_components = details.address_components;

        let city = address_components[1].short_name;
        let street = address_components[0].short_name;

        console.log("##############");
        let geometry = details.geometry;
        let lat = geometry.location.lat;
        let lng = geometry.location.lng;

        console.log(lat);
        console.log(lng);

        fetchAddress(lat,lng,city,street);

        
        //console.log(details);
    }
    

    const onAutoCompleteFailure = () => {
        console.log("auto complete failure!");
        return (
            <View>
                <Text>Auto complete failure!</Text>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
            <GooglePlacesAutocomplete 
            placeholder= {placeholderText}
            onPress = {onPressAddress}
            fetchDetails = {true}
            query = {{
                key: GOOGLE_MAP_KEY,
                language: 'en'
            }}
            onFail = {onAutoCompleteFailure}
            styles = {{
                textInputContainer: styles.containerStyle,
                textInput: styles.textInputStyle,
            }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white'
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#f3f3f3'
    }
});

export default AddressPickup;