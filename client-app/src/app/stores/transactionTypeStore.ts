import { action, computed, observable, runInAction, extendObservable  } from "mobx";
import agent from "../api/agent";
import { ITransactionType, ITransactionTypeFormValues } from "../models/transactionType";
import { RootStore } from "./rootStore";
import { history } from '../..';
import { toast } from "react-toastify";



export default class TransactionTypeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    
    @observable transactionType: ITransactionType | null = null;
    @observable loading = false;
    @observable submitting = false;
    @observable loadingInitial = false;
    @observable transactionTypeRegistry: any = [];
    @computed get transactionTypeByName() {
        return this.transactionTypeRegistry;
        // return Array.from(this.transactionTypeRegistry.values()).sort();
    }

    @action createTransactionType = async (transactionType: ITransactionType) => {
       this.submitting = true;
       try {
           await agent.TransactionTypes.create(transactionType);
           history.push('/payments');
           toast.success('User Successfully Added');
       } catch(error) {
           console.log(error)
       }
    }

    @action loadTransactionTypes = async () => {
        this.loadingInitial = true;
        try {
            const transactionTypes = await agent.TransactionTypes.list();
            runInAction('loading transaction type', () => {
                transactionTypes.forEach((transactionType) => {
                    this.transactionTypeRegistry.push({
                        key: transactionType.id,
                        text: transactionType.name,
                        value: transactionType.id
                    });
                });
            });
        }
        catch (error){
            console.log(error)
        }
    };
    
}

