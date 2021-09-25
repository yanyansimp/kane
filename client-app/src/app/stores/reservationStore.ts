import { RootStore } from './rootStore';
import { observable, action, runInAction, toJS, computed } from 'mobx';
import { IClient } from '../models/client';
import { history } from '../..';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { addZeroDate, setClientProps } from '../common/util/util';

export default class ReservationStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable client: IClient | null = null;
  @observable reservationRegistry: IClient[] | null = [];
  @observable step = 4;
  @observable newReservationView = false;

  @observable paymentDues: any = [];

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

  @computed get getPaymentDues() {
    return toJS(this.paymentDues);
  }

  getClient = (id: string) => {
    return this.reservationRegistry?.find(c => c.id === id);
  }


  @action loadClient = async (id: string) => {
    let client = this.getClient(id);

    if (client) {
      // console.log(client);
      this.client = setClientProps(client);
      return toJS(client);
    } else {
      this.loadingInitial = true;
      try {
        client = await agent.Clients.details(id);
        runInAction('Getting client', () => {
          console.log(client);
          this.client = setClientProps(client!);
          // this.reservationRegistry?.push(client!);
          this.loadingInitial = false;
        });
        return client;
      } catch (error) {
         runInAction('get activity error', () => {
           this.loadingInitial = false;
         });
        console.log(error);
      }
    }
  };

  @action editClient = async (client: IClient) => {
    this.submitting = true;
    try {
      await agent.Clients.update(client);
      runInAction('editing client', () => {
        this.client = client;
        this.submitting = false;
      });
      history.push(`/clients/${client.id}`);
      toast.success('Edit Success');
    } catch (error) {
      runInAction('edit client error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action loadPaymentDues = async () => {
      this.loadingInitial = true;
      try {
        const clients = await agent.Clients.list();
        runInAction('loading payment dues', () => {
          this.paymentDues = [];
          clients.forEach(client => {
            client.transactions.forEach(transaction => {
              if (transaction.status !== 'Completed') {

                if (!transaction.payments?.find(p => new Date(p.dateOfPayment!).toISOString().slice(0,7) ===
                  new Date().toISOString().slice(0,7))) {
                    const d = new Date();
                    this.paymentDues.push({
                      title: `#${transaction.sequenceNo}-${client.lastName}, ${client.firstName}`,
                      date: `${d.getFullYear()}-${addZeroDate(d.getMonth() + 1) }-${addZeroDate(new Date(transaction.createdAt!).getDate())}`,
                    });
                }

              }
            });
          });
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction('loading payment dues error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
  }

  @action loadReservations = async () => {
    this.loadingInitial = true;
    try {
      const reservations = await agent.Clients.list();
      runInAction('loading client reservations', () => {
        this.reservationRegistry = [];
        reservations.forEach(client => {
          client.transactions.forEach(transaction => {
            let totalPayment = 0;
            transaction.payments?.forEach(payment => {
              totalPayment += payment.amount;
            });
            transaction.balance = transaction.contractPrice - totalPayment;
          })
           this.reservationRegistry?.push(client);
           console.log(client);
        });
        this.loadingInitial = false;
        // console.log(this.reservationRegistry?.length);
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

      // console.log(client);
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
      toast.error('Error saving data');
      console.log(error);
    }
  };
}
