import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IPayment, IPaymentFormValues } from '../models/payment';
import { RootStore } from './rootStore';
import { history } from '../..';
import { toast } from 'react-toastify';

export default class PaymentStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable payment: IPayment | null = null;
  @observable loading = false;
  @observable submitting = false;
  @observable loadingInitial = false;
  @observable paymentRegistry: any = [];

  @computed get paymentByName() {
    return this.paymentRegistry;
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
}
