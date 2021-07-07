import { observable, computed, action, runInAction, toJS } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import { RootStore } from './rootStore';
import agent from '../api/agent';
import { history } from '../..';
import { IRole } from '../models/role';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;
  @observable loadingInitial = false;

  @observable roleRegistry: any = [];

  @computed get getRoles() {
    return this.roleRegistry;
  }

  @action loadRoles = async () => {
    this.loadingInitial = true;
    try {
      const roles = await agent.Role.list();
      runInAction('loading roles', () => {
        roles.forEach((role) => {
          this.roleRegistry.push({
            key: role.name,
            text: role.name,
            value: role.name
          });
          console.log(role);
        });
      })
    } catch (error) {}
  };

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };
}
