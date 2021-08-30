import { observable, computed, action, runInAction, toJS } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import { RootStore } from './rootStore';
import agent from '../api/agent';
import { history } from '../..';
import { IRole, IRoleClaim, IRoleFormValues } from '../models/role';
import { toast } from 'react-toastify';

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

  @observable role: IRole | null = null;
  @observable roleRegistry: any = [];
  @observable roleClaims: string[] | any = [];

  @computed get getRoles() {
    return this.roleRegistry;
  }

  @action addClaim = async (values: any) => {
    if (!this.roleClaims.includes(values)) {
      this.roleClaims.push(values);
    } else {
      this.roleClaims.splice(this.roleClaims.indexOf(values), 1);
    }
    console.log(this.roleClaims);
  };

  @action checkClaim = (user: IUser, value: string) => {
    return user.roleClaims.includes(value);
  };

  @action loadRoles = async () => {
    this.loadingInitial = true;
    try {
      const roles = await agent.Role.list();
      runInAction('loading roles', () => {
        roles.forEach((role) => {
          this.roleRegistry.push({
            key: role.id,
            text: role.name,
            value: role.name,
          });
        });
      });
    } catch (error) {}
  };

  @action addRole = async (role: IRole) => {
    this.submitting = true;
    try {
      await agent.Role.create(role);
      console.log(role);
      runInAction('creating role', () => {
        this.roleRegistry.push({
          key: role.id,
          text: role.name,
          value: role.name,
        });
        this.submitting = false;
      });
    } catch (error) {
      runInAction('creating role error', () => {
        this.submitting = false;
      });
      console.log(error.response);
    }
  };

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
        console.log(user);
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    this.submitting = true;
    try {
      await agent.User.register(values);
      //this.rootStore.commonStore.setToken(user.token);
      //this.rootStore.modalStore.closeModal();
      // history.push('/dashboard');
      history.push('/user');
      toast.success('User Successfully Added');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      })
      toast.error(error);
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user
        // console.log(this.user);
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
