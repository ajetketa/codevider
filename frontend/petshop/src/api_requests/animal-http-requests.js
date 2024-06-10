import getHttpRequest  from "./http-request.js"

export async function getDogs() {
  console.log(`${process.env.REACT_APP_BACKEND_URI}/dogs`);
  return await getHttpRequest(`${process.env.REACT_APP_BACKEND_URI}/dogs`);
}

export async function getCats() {
  return await getHttpRequest(`${process.env.REACT_APP_BACKEND_URI}/cats`);
}

export async function getBirds() {
  return await getHttpRequest(`${process.env.REACT_APP_BACKEND_URI}/birds`);
}