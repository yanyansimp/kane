import { RootStore } from './rootStore';
import { observable, action } from 'mobx';

export default class ModalStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable step = 4;

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
}
