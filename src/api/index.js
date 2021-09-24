import axios from 'axios';

//card data and changeable url for countries
const url = 'https://covid19.mathdro.id/api';
export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const res = await axios.get(changeableUrl);
    const data = res.data;
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

//Chart data
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

//to select a single country
export const fetchCountries = async () => {
  try {
    const res = await axios.get(`${url}/countries`);
    const data = res.data;
    const countries = data.countries;

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};

// //get single country data
export const countryData = async (country) => {
  try {
    const res = await axios.get(`${url}/countries/${country}`);
    const data = res.data;
    const modifiedCountryData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };

    return modifiedCountryData;
  } catch (error) {
    console.log(error);
  }
};
