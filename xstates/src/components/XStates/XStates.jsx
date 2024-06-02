import React, { useMemo } from 'react';
import useLocationData from '../../hooks/useLocationData';
import styles from './XStates.module.css';

const XStates = () => {
  const {
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
    error
  } = useLocationData();

  const countriesDropdown = useMemo(() =>
    countries.map((country) => (
      <option key={country} value={country}>{country}</option>
    ))
    , [countries])

  const statesDropdown = useMemo(() =>
    states.map((state) => (
      <option key={state} value={state}>{state}</option>
    ))
    , [states])

  const citiesDropdown = useMemo(() =>
    cities.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))
    , [cities])

  return (
    <div className={styles.container}>
      <h1>Select Location</h1>
      {loading && (<p>Loading...</p>)}
      <div className={styles.dropdown}>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className={styles.eachSelect}>
          <option value="" disabled>Select Country</option>
          {countriesDropdown}
        </select>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className={styles.eachSelect} disabled={!selectedCountry}>
          <option value="" disabled={!selectedCountry}>Select State</option>
          {statesDropdown}
        </select>
        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className={styles.eachSelect} disabled={!selectedState}>
          <option value="" disabled={!selectedState}>Select City</option>
          {citiesDropdown}
        </select>
      </div>
      {selectedCity && (
        <h2 className={styles.result}>You Selected <span className={styles.city}>{selectedCity}</span>, <span className={styles.stateCountry}>{selectedState}, {selectedCountry}</span></h2>
      )}
    </div>
  )
}

export default XStates;