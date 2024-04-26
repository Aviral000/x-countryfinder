import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Countries.css';

export default function countries() {
const [countries, setCountries] = useState([]);
const [text, setText] = useState('');
const [searchCountries, setSearchCountries] = useState([]);

const apiCall = async() => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

useEffect(() => {
    apiCall();
}, []);

useEffect(() => {
    const selected = countries.filter(country => country.name.common.toLowerCase().includes(text.toLowerCase()));
    setSearchCountries(selected);
}, [text])

  return (
    <div>
        <nav>
            <div className='searchbar'>
            <input
                type="text"
                placeholder="Search for countries..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            </div>
        </nav>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", paddingTop: "1rem" }}>
        {text.length === 0 ? (
            countries.map((country) => {
                return <div key={country.cca2}>
                    <div>
                        <div>
                            <img src={country.flags.png} alt={country.flags.alt} />
                            <h2>{country.name.common}</h2>
                        </div>
                    </div>
                </div>
            })) : (
                searchCountries.map((country) => {
                    return <div key={country.cca2}>
                        <div>
                            <div>
                                <img src={country.flags.png} alt={country.flags.alt} />
                                <h2>{country.name.common}</h2>
                            </div>
                        </div>
                    </div>
                })
            )
        }
      </div>
    </div>
  )
}
