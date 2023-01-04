const API_KEY = "c64684b1-a8f4-4273-8b1c-41824bf12fae";

//get all the upcoming matches

export const getMatches = () => {
  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}`;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const getMatchDetails = (id) => {
  const url = `https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=${id}`;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
