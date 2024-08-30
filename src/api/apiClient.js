import axios from 'axios';
import { BASE_URL } from '../helpers/config';


export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});


export const fetchTables = (table) => apiClient.get(`/entity/${table}`);

export const fetchTableData = (table) => apiClient.get(`/values/${table}`);

export const createRecord = (table, data) => apiClient.post(`/tables/${table}`, data);

export const updateRecord = (table, id, data) => apiClient.put(`/entity/${table}`, data);

export const deleteRecord = (table, id) => apiClient.delete(`/entity/${table}?id=${id}`);


