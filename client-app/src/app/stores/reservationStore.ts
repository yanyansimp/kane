import { RootStore } from './rootStore';
import { observable, action, runInAction, toJS, computed } from 'mobx';
import { IClient } from '../models/client';
import { history } from '../..';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { addZeroDate, setClientProps, setTansactionProps } from '../common/util/util';
import { ITransaction } from '../models/transaction';

export default class ReservationStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable client: IClient | null = null;
  @observable transaction: ITransaction | null = null;
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
  };

  getClient = (id: string) => {
    return this.reservationRegistry?.find(c => c.id === id);
  };

  getTransaction = (clientId: string, transId: string) => {
    const client = this.getClient(clientId);

    return client?.transactions.find((t) => t.id === transId);
  };

  @action loadClient = async (id: string) => {
    this.loadingInitial = true;

    // let client = this.getClient(id);

    // if (client) {
    //   this.client = setClientProps(client);
    //   return toJS(client);
    // } else {
    //   try {
    //     client = await agent.Clients.details(id);
    //     runInAction('Getting client', () => {
    //       this.client = setClientProps(client!);
    //       console.log(this.client);
    //       this.loadingInitial = false;
    //     });
    //     return client;
    //   } catch (error) {
    //      runInAction('get client error', () => {
    //        this.loadingInitial = false;
    //      });
    //     console.log(error);
    //   }
    // }

    try {
      const client = await agent.Clients.details(id);
      runInAction('Getting client', () => {
        this.client = setClientProps(client!);
        console.log(this.client);
        this.loadingInitial = false;
      });
      return client;
    } catch (error) {
        runInAction('get client error', () => {
          this.loadingInitial = false;
        });
      console.log(error);
    }

  };

  @action editClient = async (client: IClient) => {
    this.submitting = true;
    try {
      await agent.Clients.update(client);
      runInAction('editing client', () => {
        if (!this.reservationRegistry) {
            this.loadReservations();
            this.client = client;
        }
          this.submitting = false;
      });
      history.push(`/clients/${client.id}`);
      toast.success('Edit Success');
    } catch (error) {
      runInAction('edit client error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
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

  @action loadReservation = async (clientId: string, transId: string) => {
    this.loadingInitial = false;

    // try {
    //   let transaction = this.getTransaction(clientId, transId);

    //   if (transaction) {
    //     console.log(transaction);
    //     this.transaction = transaction;
    //     this.loadingInitial = false;
    //     return toJS(transaction);
    //   } else {
    //     transaction = await agent.Transactions.details(clientId, transId);
    //     runInAction(() => {
    //       this.transaction = setTansactionProps(transaction!);
    //       this.loadingInitial = false;
    //     });
    //     console.log(transaction);
    //     return transaction;
    //   }
    // } catch (error) {
    //    runInAction(() => {
    //      this.loadingInitial = false;
    //    });
    //    console.log(error);
    // }
    try {
      const transaction = await agent.Transactions.details(clientId, transId);
      runInAction(() => {
        this.transaction = setTansactionProps(transaction!);
        this.loadingInitial = false;
      });
      console.log(transaction);
      return transaction;
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

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
      console.log(error);
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

      console.log(client);
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

