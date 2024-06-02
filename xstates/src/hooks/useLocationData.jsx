import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useLocationData = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://crio-location-selector.onrender.com/countries").then((res) => {
            setCountries(res.data);
            setSelectedCountry("");
        }).catch((err) => {
            console.error("Error fetching countries:", err);
        });
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then((res) => {
                setStates(res.data);
                setSelectedState("");
                setCities([]);
                setSelectedCity("");
            }).catch((err) => {
                console.error("Error fetching countries:", err);
            });
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then((res) => {
                setCities(res.data);
                setSelectedCity("");
            }).catch((err) => {
                console.error("Error fetching countries:", err);
            });
        }
    }, [selectedCountry, selectedState]);

    return {
        countries,
        states,
        cities,
        selectedCountry,
        setSelectedCountry,
        selectedCity,
        setSelectedCity,
        selectedState,
        setSelectedState,
        loading,
        setLoading,
        error,
        setError
    }
}

export default useLocationData;
