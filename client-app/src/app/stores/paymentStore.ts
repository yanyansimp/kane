import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IPayment, IPaymentFormValues } from '../models/payment';
import { RootStore } from './rootStore';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IClient } from '../models/client';

export default class PaymentStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable payment: IPayment | null = null;
  @observable loading = false;
  @observable submitting = false;
  @observable loadingInitial = false;
  @observable loadingSearch = false;
  @observable paymentRegistry: IClient[] | null = [];

  @computed get paymentByName() {
    return this.paymentRegistry;
  }

  @action searchPayments = async (keyword: string) => {
    this.loadingInitial = true;
    this.loadingSearch = true;
    try {
      const reservations = await agent.Clients.search(keyword);

      runInAction('loading client reservations', () => {
        this.paymentRegistry = [];
        reservations.forEach((client) => {
          client.transactions.forEach((transaction) => {
            let totalPayment = 0;
            transaction.payments?.forEach((payment) => {
              totalPayment += payment.amount;
            });
            transaction.balance = transaction.contractPrice - totalPayment;
          });
          this.paymentRegistry?.push(client);
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

  @action loadPayments = async () => {
    this.loadingInitial = true;
    try {
      const reservations = await agent.Clients.list();
      runInAction('loading client reservations', () => {
        this.paymentRegistry = [];
        reservations.forEach((client) => {
          client.transactions.forEach((transaction) => {
            let totalPayment = 0;
            transaction.payments?.forEach((payment) => {
              totalPayment += payment.amount;
            });
            transaction.balance = transaction.contractPrice - totalPayment;
          });
          this.paymentRegistry?.push(client);
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

  @action loadPayment = async (id: string) => {
    this.loadingInitial = true;
    try {
      const payment = await agent.Payments.details(id);
      runInAction(() => {
        payment.dateOfPayment = new Date(payment.dateOfPayment);
        this.payment = payment;
        this.loadingInitial = false;
      });
      console.log(payment);
      return payment;
    } 
    catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  }

  @action createPayment = async (payment: IPaymentFormValues) => {
    this.submitting = true;
    try {
      console.log(payment);
      await agent.Payments.create(payment);
      runInAction('Creating payment', () => {
        this.submitting = false;
        history.push('/payment');
      });
      toast.success('Payment successfully saved');
    } catch (error) {
      runInAction('Error creating payment', () => {
        this.submitting = false;
      });
      toast.error('Error saving payment');
      console.log(error);
    }
  };

  @action editPayment = async (payment: IPaymentFormValues) => {
    this.submitting = true;
    try {
      console.log(payment);
      await agent.Payments.update(payment);
      runInAction('Updating payment', () => {
        this.submitting = false;
        history.push('/payment');
      });
      toast.success('Payment successfully saved');
    } catch (error) {
      runInAction('Error updating payment', () => {
        this.submitting = false;
      });
      toast.error('Error updating payment');
      console.log(error);
    }
  };
}
