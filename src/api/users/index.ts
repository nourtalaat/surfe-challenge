import { USERS_ENDPOINT, MOST_MENTIONED_USERS_ENDPOINT } from "./endpoints";
import httpClient from "../../config/HttpClient";

const axiosInstance = httpClient();

export const fetchUsersAPIRequest = async () => {
  try {
    const response = await axiosInstance.get(USERS_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMostMentionedUsersAPIRequest = async () => {
  try {
    const response = await axiosInstance.get(MOST_MENTIONED_USERS_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
};
