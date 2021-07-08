import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import PropertyTypeStore from "./propertyTypeStore";
import PropertyStore from "./propertyStore";

configure({ enforceActions: 'always' });

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    propertyTypeStore: PropertyTypeStore;
    propertyStore: PropertyStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.propertyTypeStore = new PropertyTypeStore(this);
        this.propertyStore = new PropertyStore(this);
    }

}

export const RootStoreContext = createContext(new RootStore());