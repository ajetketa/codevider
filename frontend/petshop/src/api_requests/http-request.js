import axios from 'axios';

async function makeHttpRequest(requestConfiguration) {
  try {
    const response = await axios(requestConfiguration)
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getHttpRequest(url) {
  return await makeHttpRequest({ method: 'get', url: url });
}

export default getHttpRequest;