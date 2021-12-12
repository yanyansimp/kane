import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';
import { IPhoto, IProfile } from '../models/profile';
import { IPropertyType } from '../models/propertyType';
import { IProperty } from '../models/Property';
import { IRole } from '../models/role';
import { ITransactionType, ITransactionTypeFormValues } from '../models/transactionType';
import { IPayment, IPaymentFormValues } from '../models/payment';
import { IClient } from '../models/client';
import { ITransaction, ITransactionValues } from '../models/transaction';
import { ILandingPhoto } from '../models/landingPhoto'
import { IAmenities } from '../models/amenities';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('jwt');
  if (token)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure API is running!');
  }
  const {status, data, config} = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
    history.push('/notfound');
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
  throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

// Adding delay for development purposes only :::: remove in production 
const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url: string) => axios.get(url)
    // .then(sleep(1000))
    .then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body)
    // .then(sleep(1000))
    .then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body)
    // .then(sleep(1000))
    .then(responseBody),
  del: (url: string) => axios.delete(url)
    // .then(sleep(1000))
    .then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post(url, formData, {
      headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
  },
};

const TransactionTypes ={
  list: (): Promise<ITransactionType[]> => requests.get('/transactionTypes'),
  create: (transactionType: ITransactionType) => requests.post('/transactionTypes', transactionType),
};

const Payments = {
  details: (id: string) => requests.get(`/payments/${id}`),
  create: (payment: IPaymentFormValues) => requests.post('/payments', payment),
  update: (payment: IPaymentFormValues) =>
    requests.put(`/payments/${payment.id}`, payment),
};

const PropertyTypes = {
  list: (): Promise<IPropertyType[]> => requests.get('/propertyTypes'),
  create: (propertyType: IPropertyType) => requests.post('/propertyTypes', propertyType),
  update: (propertyType: IPropertyType) => 
    requests.put(`/propertyTypes/${propertyType.id}`,propertyType),
  delete: (id: string) => requests.del(`/propertyTypes/${id}`),
  uploadPhoto: (photo: Blob ): Promise<IPhoto> =>
    requests.postForm(`/photos/addPhoto`, photo),
  
};

const Properties = {
  list: (): Promise<IProperty[]> => requests.get('/properties'),
  create: (property: IProperty) => requests.post('/properties', property),
  update: (property: IProperty) => 
    requests.put(`/properties/${property.id}`,property),
  delete: (id: string) => requests.del(`/properties/${id}`),
  uploadPhoto: (photo: Blob ): Promise<IPhoto> =>
    requests.postForm(`/photos/addPhoto`, photo),
};

const LandingPhotos = {
  list: (): Promise<ILandingPhoto[]> => requests.get('/landingPhotos'),
  create: (landingPhoto: ILandingPhoto) => requests.post('/landingPhotos', landingPhoto),
  update: (landingPhoto: ILandingPhoto) => 
    requests.put(`/landingPhotos/${landingPhoto.id}`,landingPhoto),
  delete: (id: string) => requests.del(`/landingPhotos/${id}`),
  uploadPhoto: (photo: Blob ): Promise<IPhoto> =>
    requests.postForm(`/photos/addPhoto`, photo),
}



const Activities = {
  list: (): Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => requests.del(`/activities/${id}/attend`)
};

const Role = {
  list: (): Promise<IRole[]> => requests.get('/roles'),
  create: (role: IRole) => requests.post('/roles', role)
};

const Clients = {
  list: (): Promise<IClient[]> => requests.get('/clients'),
  details: (id: string) => requests.get(`/clients/${id}`),
  create: (client: IClient) => requests.post('/clients', client),
  update: (client: IClient) => 
    requests.put(`/clients/${client.id}`, client),
  search: (keyWord: string): Promise<IClient[]> => requests.get(`/clients?keyWord=${keyWord}`),
  delete: (id: string) => 
    requests.del(`/clients/${id}`)
};

const Transactions = {
  create: (transaction: ITransactionValues) =>
    requests.post('/transactions', transaction),
  update: (transaction: ITransactionValues | any) => 
    requests.put(`/transactions/${transaction.clientId}`, transaction),
  details: (clientId: string, transactionId: string) =>
    requests.get(`/transactions/${clientId}/${transactionId}`),
  delete: (transactionId: string) =>
    requests.del(`/transactions/${transactionId}`)
};


const User = {
  list: (): Promise<IUser[]> => requests.get('/user/list'),
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post('/user/login', user),
  register: (user: IUserFormValues) => requests.post('/user/register', user)
  // register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user)
};

const Profiles = {
  get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`)
}

const Amenities = {
  list: (): Promise<IAmenities[]> => requests.get('/amenities'),
  create: (values: IAmenities) => requests.post('/amenities', values),
  update: (values: IAmenities) => 
    requests.put(`/amenities/${values.id}`,values),
  delete: (id: string) => requests.del(`/amenities/${id}`),
}



export default {
  Activities,
  User,
  Profiles,
  PropertyTypes,
  Properties,
  Role,
  TransactionTypes,
  Transactions,
  Payments,
  Clients,
  LandingPhotos,
  Amenities
};
