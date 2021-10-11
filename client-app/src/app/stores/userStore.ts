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
  @observable userRegistry: IUser[] | null = null;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;
  @observable loadingInitial = false;

  @observable salesManagerRegistry: any[] = [];
  @observable salesAgentRegistry: any[] = [];

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
        this.roleRegistry = [];
        console.log(roles);
        roles.forEach((role) => {
          this.roleRegistry.push({
            key: role.id,
            text: role.name,
            value: role.name,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
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
      history.push('/user');
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
      });
      toast.error(error);
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
        // console.log(this.user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action loadUsers = async () => {
    this.loadingInitial = true;
    try {
      const users = await agent.User.list();
      runInAction('loading users', () => {
        this.userRegistry = [];
        users.forEach((user) => {
          if (!(user.role?.toLowerCase() === 'admin' || user.role?.toLowerCase() === 'super admin')) {
            this.userRegistry?.push(user);
          }
        });
        this.loadingInitial = false;
        // console.log(toJS(this.userRegistry));
      });
    } catch (error) {
      runInAction('load users error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  loadSalesManagers = (users: any[]) => {
    try {
      runInAction(() => {
        this.salesManagerRegistry = [];
        users.forEach((user) => {
          if ((user.role?.toLowerCase() === 'sales manager' || user.role?.toLowerCase() === 'salesmanager')) {
            this.salesManagerRegistry?.push({
              key: user.id,
              text: `${user.lastName}, ${user.firstName} ${user.middleName?.charAt(0,1)}`,
              value: user.id,
            });
          }
        });
        // console.log(users);
        // console.log(toJS(this.salesManagerRegistry));
      })
    } catch (error) {
      console.log(error);
    }
  };

  loadSalesAgents = (users: any[]) => {
    try {
      runInAction(() => {
        this.salesAgentRegistry = [];
        users.forEach((user) => {
          if ((user.role?.toLowerCase() === 'sales manager' || user.role?.toLowerCase() === 'salesmanager' || user.role?.toLowerCase() === 'sales agent' || user.role?.toLowerCase() === 'salesagent')) {
            this.salesAgentRegistry?.push({
              key: user.id,
              text: `${user.lastName}, ${user.firstName} ${user.middleName?.charAt(0,1)}`,
              value: user.id
            });
          }
        });
        // console.log(users);
        // console.log(toJS(this.salesAgentRegistry));
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action loadSalesManagersAgents = async () => {
    this.loadingInitial = true;
    try {
      if (this.userRegistry !== null) {
        this.loadSalesManagers(this.userRegistry!);
        this.loadSalesAgents(this.userRegistry!);
      } else {
        await this.loadUsers();
        this.loadSalesManagers(this.userRegistry!);
        this.loadSalesAgents(this.userRegistry!);
      }
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
