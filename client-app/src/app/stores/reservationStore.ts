import { RootStore } from './rootStore';
import { observable, action, runInAction } from 'mobx';
import { IClient } from '../models/client';
import { history } from '../..';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

export default class ModalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable client: IClient | null = null;
  @observable reservationRegistry: IClient[] | null = [];
  @observable step = 4;
  @observable newReservationView = false;

  @observable loadingInitial = false;
  @observable loading = false;
  @observable target = '';
  @observable submitting = false;
  @observable predicate = new Map();

  @action nextStep = () => {
      if ( this.step < 5) {
        this.step++;
      } else {
        return;
      }
      console.log(this.step);
  };

  @action prevStep = () => {
      if (this.step > 1) {
        this.step--;
      }
      console.log(this.step);
  };

  @action setNewReservationView = (v: boolean) => {
    this.newReservationView = v;
  };

  @action loadReservations = async () => {
    let totalPayment = 0;
    this.loadingInitial = true;
    try {
      const reservations = await agent.Clients.list();
      runInAction('loading client reservations', () => {
        this.reservationRegistry = [];
        reservations.forEach(client => {
          client.transactions.forEach(transaction => {
            transaction.payments?.forEach(payment => {
              totalPayment += payment.amount;
            });
            transaction.balance = transaction.contractPrice - totalPayment;
          })
           this.reservationRegistry?.push(client);
           console.log(totalPayment);
        });
        this.loadingInitial = false;
        console.log(this.reservationRegistry?.length);
      });
    } catch (error) {
      runInAction('load client reservations error', () => {
        this.loadingInitial = false;
      });
    }
  }

  @action createReservation = async (client: IClient | any) => {
    this.submitting = true;
    try {

      if (client.businessName) {
        let business = {
          id: uuid(),
          name: client.businessName,
          location: client.businessLocation,
          industry: client.businessIndustry,
          type: client.businessType,
          dateEstablished: client.dateEstablished,
        };

        client.businesses = [];
        client.businesses.push(business);
      }

      await agent.Clients.create(client);

      runInAction(() => {
        this.loadReservations();
        this.submitting = false;
      });
      history.push('/reservation');
      toast.success('Successfully saved');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
}
