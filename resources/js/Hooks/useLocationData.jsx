// hooks/useLocationData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useLocationData(initialCounty = '', initialConstituency = '') {
    const [counties, setCounties] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const [wards, setWards] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState({
        counties: false,
        countries: false,
        constituencies: false,
        wards: false
    });
    const [error, setError] = useState(null);

    // Load initial data (counties and countries)
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(prev => ({ ...prev, counties: true, countries: true }));

                const [countiesRes, countriesRes] = await Promise.all([
                    axios.get(route('api.counties')),
                    axios.get(route('api.countries'))
                ]);

                setCounties(countiesRes.data);
                setCountries(countriesRes.data);

                // If initial county is provided, load its constituencies
                if (initialCounty) {
                    await fetchConstituencies(initialCounty);

                    // If initial constituency is also provided, load its wards
                    if (initialConstituency) {
                        await fetchWards(initialConstituency);
                    }
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(prev => ({ ...prev, counties: false, countries: false }));
            }
        };

        fetchInitialData();
    }, [initialCounty, initialConstituency]);

    const fetchConstituencies = async (county) => {
        try {
            setLoading(prev => ({ ...prev, constituencies: true }));
            setError(null);

            const response = await axios.get(`/api/constituencies?county=${county}`);
            setConstituencies(response.data);
            setWards([]); // Reset wards when county changes
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(prev => ({ ...prev, constituencies: false }));
        }
    };

    const fetchWards = async (constituency) => {
        try {
            setLoading(prev => ({ ...prev, wards: true }));
            setError(null);

            const response = await axios.get(`/api/wards?constituency=${constituency}`);
            setWards(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(prev => ({ ...prev, wards: false }));
        }
    };

    return {
        counties,
        constituencies,
        wards,
        countries,
        loading,
        error,
        fetchConstituencies,
        fetchWards
    };
}