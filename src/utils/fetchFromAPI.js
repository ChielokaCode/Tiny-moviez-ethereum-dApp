import axios from "axios";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: { maxResults: 50 },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  console.log(`Inside fetchFromAPI, complete search URL : ${BASE_URL}/${url}`);
  console.log("Data fetched from URL :", data);
  return data;
};
