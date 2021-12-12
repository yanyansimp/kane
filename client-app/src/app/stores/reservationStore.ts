import { RootStore } from './rootStore';
import { observable, action, runInAction, toJS, computed } from 'mobx';
import { IClient } from '../models/client';
import { history } from '../..';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { addZeroDate, setClientProps, setTansactionProps, toName } from '../common/util/util';
import { IDocument, ITransaction, ITransactionValues } from '../models/transaction';
import { SyntheticEvent } from 'react';

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

  //
  @observable loadingSearch = false;
  @observable searchResults: any[] = [];
  @observable clientProperties: any[] = [];
  //

  @action nextStep = () => {
    if (this.step < 5) {
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

  @action handleSearchChange = async (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    this.loadingSearch = true;
    try {
      if (this.reservationRegistry) {
        // let results =
      }
    } catch (error) {}
  };

  @computed get getPaymentDues() {
    return toJS(this.paymentDues);
  }

  @computed get getIsDocsComplete() {
    return this.client?.documents?.length === 10 ? 'Complete' : 'Lacking';
  }

  @action IsDocsComplete = (doc: IDocument[] | null) => {
    if (doc) {
      return doc.length === 10 ? 'Complete' : 'Lacking';
    } else {
      return 'Lacking';
    }
  };

  @action isDocExists = (doc: string) => {
    return this.client?.documents?.find((d) => d.type === doc) ? true : false;
  };

  getClient = (id: string) => {
    return this.reservationRegistry?.find((c) => c.id === id);
  };

  getTransaction = (clientId: string, transId: string) => {
    const client = this.getClient(clientId);

    return client?.transactions.find((t) => t.id === transId);
  };

  //
  @action searchClient = async (keyword: string) => {
    this.loadingSearch = true;
    try {
      const reservations = await agent.Clients.search(keyword);
      runInAction('loading client reservations', () => {
        this.searchResults = [];
        reservations.forEach((client) => {
          this.searchResults.push({
            'id': client.id,
            'title': toName(client.lastName, client.firstName, client.middleName, client.suffix)
          });
        });
        this.loadingSearch = false;
        // console.log(toJS(this.reservationRegistry));
        // console.log(this.reservationRegistry?.length);
      });
    } catch (error) {
      this.loadingSearch = false;
    }
  }

  @action loadClientProperties = async (id: string) => {
    this.loadingInitial = true;
    try {
      const client = await agent.Clients.details(id);
      runInAction('loading client properties', () => {
        this.clientProperties = [];
        client.transactions.forEach((transaction: any) => {
          this.clientProperties.push({
            key: transaction.property.id,
            text: `#${transaction.sequenceNo} - ${transaction.property.name}`,
            value: transaction.sequenceNo,
          });
        });
        // console.log(client.transactions);
        console.log(toJS(this.clientProperties));
        this.loadingInitial = false;
      });
      return client;
    } catch (error) {
      runInAction('get client error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  }
  //

  // E refactor ni
  @action searchReservations = async (keyword: string) => {
    this.loadingInitial = true;
    this.loadingSearch = true;
    try {
      // if (this.reservationRegistry) {
      //   if (keyword != null) {
      //     runInAction(() => {
      //       this.reservationRegistry = this.reservationRegistry!.filter(
      //         (client) => {
      //           return (
      //             client.lastName.toLowerCase().includes(keyword) ||
      //             client.firstName.toLowerCase().includes(keyword) ||
      //             client.middleName.toLowerCase().includes(keyword)
      //           );
      //         }
      //       );
      //     });
      //     console.log(toJS(this.reservationRegistry));
      //     this.loadingSearch = false;
      //     this.loadingInitial = false;
      //   } else {
      //     this.loadReservations();
      //     this.loadingSearch = false;
      //     this.loadingInitial = false;
      //   }
      // } else {
      //   const reservations = await agent.Clients.search(keyword);
      //   runInAction('loading client reservations', () => {
      //     this.reservationRegistry = [];
      //     reservations.forEach((client) => {
      //       client.transactions.forEach((transaction) => {
      //         let totalPayment = 0;
      //         transaction.payments?.forEach((payment) => {
      //           totalPayment += payment.amount;
      //         });
      //         transaction.balance = transaction.contractPrice - totalPayment;
      //       });
      //       this.reservationRegistry?.push(client);
      //     });
      //     this.loadingInitial = false;
      //     // console.log(toJS(this.reservationRegistry));
      //     // console.log(this.reservationRegistry?.length);
      //   });
      // }
      const reservations = await agent.Clients.search(keyword);

      runInAction('loading client reservations', () => {
        this.reservationRegistry = [];
        reservations.forEach((client) => {
          client.transactions.forEach((transaction) => {
            let totalPayment = 0;
            transaction.payments?.forEach((payment) => {
              totalPayment += payment.amount;
            });
            transaction.balance = transaction.contractPrice - totalPayment;
          });
          this.reservationRegistry?.push(client);
        });
        this.loadingSearch = false;
        this.loadingInitial = false;
        // console.log(toJS(this.reservationRegistry));
        // console.log(this.reservationRegistry?.length);
      });
    } catch (error) {
      this.loadingSearch = false;
      this.loadingInitial = false;
    }
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
        // console.log(this.client);
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
      console.log(client);
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

  @action deleteClient = async (clientId: string) => {
    this.submitting = true;
    try {
      if (clientId) {
        await agent.Clients.delete(clientId);
        runInAction('deleting client', () => {
          this.submitting = false;
          this.target = '';
        });
        toast.success('Client successfully deleted');
        history.push('/reservation');
      }
    } catch (error) {
      runInAction('delete client error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  //
  @action loadPaymentDues = async () => {
    this.loadingInitial = true;
    try {
      const clients = await agent.Clients.list();
      runInAction('loading payment dues', () => {
        this.paymentDues = [];
        clients.forEach((client) => {
          client.transactions.forEach((transaction) => {
            if (transaction.status !== 'Completed') {
              if (
                !transaction.payments?.find(
                  (p) =>
                    new Date(p.dateOfPayment!).toISOString().slice(0, 7) ===
                    new Date().toISOString().slice(0, 7)
                )
              ) {
                const d = new Date();
                this.paymentDues.push({
                  title: `#${transaction.sequenceNo}-${client.lastName}, ${client.firstName}`,
                  date: `${d.getFullYear()}-${addZeroDate(
                    d.getMonth() + 1
                  )}-${addZeroDate(
                    new Date(transaction.createdAt!).getDate()
                  )}`,
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
  };

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
      // console.log(transaction);
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
        reservations.forEach((client) => {
          client.transactions.forEach((transaction) => {
            let totalPayment = 0;
            transaction.payments?.forEach((payment) => {
              totalPayment += payment.amount;
            });
            transaction.balance = transaction.contractPrice - totalPayment;
          });
          this.reservationRegistry?.push(client);
        });
        this.loadingInitial = false;
        // console.log(toJS(this.reservationRegistry));
        // console.log(this.reservationRegistry?.length);
      });
    } catch (error) {
      runInAction('load client reservations error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

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
      history.push('/reservation'); // Ibalik ra ni
      toast.success('Successfully saved'); // Ibalik ra ni
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error('Error saving data');
      console.log(error);
    }
  };

  @action addReservation = async (transaction: ITransactionValues | any) => {
    this.submitting = true;
    try {
      await agent.Transactions.create(transaction);
      runInAction('adding reservation', () => {
        this.submitting = false;
      });
      history.push(`/clients/${transaction.clientId}`);
      toast.success('Successfully saved');
    } catch (error) {
      runInAction('adding reservation error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editReservation = async (transaction: ITransactionValues | any) => {
    this.submitting = true;
    try {
      await agent.Transactions.update(transaction);
      runInAction('editing reservation', () => {
        this.submitting = false;
      });
      history.push(
        `/clients/${transaction.clientId}/transaction/${transaction.transactionId}`
      );
      toast.success('Successfully saved');
    } catch (error) {
      runInAction('adding reservation error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action deleteReservation = async (
    // event: SyntheticEvent<HTMLButtonElement>,
    id: string | undefined,
    clientId: string | undefined
  ) => {
    this.submitting = true;
    // this.target = event.currentTarget.name;
    try {
      if (id) {
        await agent.Transactions.delete(id);
        runInAction('deleting activity', () => {
          this.submitting = false;
          this.target = '';
        });
        toast.success('Reservation successfully deleted');
        history.push(`/clients/${clientId}`);
        console.log(id);
      }
    } catch (error) {
      runInAction('delete activity error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };
}

