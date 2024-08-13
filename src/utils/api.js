const API_BASE_URL = "https://api-colombia.com/api/v1";

export const fetchPresidents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/President`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const fetchAirports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Airport`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const fetchAttractions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/TouristicAttraction`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchRegions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Region`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchDepartments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Department`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
