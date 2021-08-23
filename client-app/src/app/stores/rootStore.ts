import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import PropertyTypeStore from "./propertyTypeStore";
import PropertyStore from "./propertyStore";
import ReservationStore from './reservationStore';
import TransactionTypeStore from './transactionTypeStore';
import PaymentStore from './paymentStore';

configure({ enforceActions: 'always' });

export class RootStore {
  activityStore: ActivityStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  propertyTypeStore: PropertyTypeStore;
  propertyStore: PropertyStore;
  reservationStore: ReservationStore;
  transactionTypeStore: TransactionTypeStore;
  paymentStore: PaymentStore;

  constructor() {
    this.activityStore = new ActivityStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
    this.propertyTypeStore = new PropertyTypeStore(this);
    this.propertyStore = new PropertyStore(this);
    this.reservationStore = new ReservationStore(this);
    this.transactionTypeStore = new TransactionTypeStore(this);
    this.paymentStore = new PaymentStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());