import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IPayment } from "../models/payment";
import { RootStore } from "./rootStore";


export default class PaymentStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable payment: IPayment | null = null;
    @observable loading = false;
    @observable submitting = false;
    @observable paymentRegistry: any = [];
    

    @computed get paymentByName() {
        return this.paymentRegistry;
    } 

    @action createPayment = async (payment: IPayment) => {
        this.submitting = true;
        // console.log(payment)
        try {
            await agent.Payments.create(payment);
        }catch(error){
            console.log(error)
        }
    }


}