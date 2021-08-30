import { action, computed, observable, runInAction } from "mobx";
import { SyntheticEvent, useState } from "react";
import agent from "../api/agent";
import { IProperty } from "../models/Property";
import { RootStore } from "./rootStore";
import { history } from '../..';

export default class PropertyStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // @observable propertyRegistry = new Map();
  @observable property: IProperty | null = null;
  @observable propertyRegistry: any = [];
  @observable loadingInitial = false;
  @observable loading = false;
  @observable target = '';
  @observable submitting = false;

  @computed get propertiesByName() {
    return Array.from(this.propertyRegistry.values()).sort();
  }

  @action getProperties = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      callback(properties);
    } catch (error) {
      console.log(error);
    }
  };

  @action loadProperties = async () => {
    this.loadingInitial = true;
    try {
      const properties = await agent.Properties.list();
      runInAction('loading properties', () => {
        this.propertyRegistry = [];
        properties.forEach((property) => {
          this.propertyRegistry.push({
            key: property.id,
            text: property.name,
            value: property.id,
          });
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('error loading properties', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action createProperty = async (property: IProperty) => {
    try {
      await agent.Properties.create(property);
    } catch (error) {}
  };

  @action EditProperty = async (property: IProperty) => {
    this.loading = true;
    try {
      // Agent.ts Connection to Bakcend (API)
      await agent.Properties.update(property);

      // Mobx
      runInAction('editing property', () => {
        this.propertyRegistry.set(property.id, property);
        this.property = property;
        this.loading = false;
        // history.push('/dashboard')
      });
    } catch (error) {
      runInAction('editing property error', () => {
        this.loading = false;
      });
      console.log('error');
    }
  };

  @action DeleteProperty = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Properties.delete(id);
      runInAction('deleting property', () => {
        this.propertyRegistry.delete(id);
        this.submitting = false;
        this.target = '';
        //   history.push('/property')
      });
    } catch (error) {
      runInAction('delete property error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action returnAvailable = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      runInAction('loading property types', () => {
        var propertyAvailable = new Array(0);
        var i = 0;
        properties.forEach((property) => {
          i++;
          if (property.status === 'Available') {
            propertyAvailable[i] = property;
          }
        });
        callback(propertyAvailable);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action returnReserved = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      runInAction('loading property types', () => {
        var propertyAvailable = new Array(0);
        var i = 0;
        properties.forEach((property) => {
          i++;
          if (property.status === 'Reserved') {
            propertyAvailable[i] = property;
          }
        });
        callback(propertyAvailable);
      });
    } catch (error) {
      console.log(error);
    }
  };
    @action returnStatus = async (callback: any) => {
        try {
            const propertyTypes = await agent.PropertyTypes.list();
            runInAction('loading Property TYpe', () => {
                callback(propertyTypes)
            })
        } catch (error) {
            console.log(error)
        }
    }
    

  @action returnOccupied = async (callback: any) => {
    try {
      const properties = await agent.Properties.list();
      runInAction('loading property types', () => {
        var propertyAvailable = new Array(0);
        var i = 0;
        properties.forEach((property) => {
          i++;
          if (property.status === 'Occupied') {
            propertyAvailable[i] = property;
          }
        });
        callback(propertyAvailable);
      });
    } catch (error) {
      console.log(error);
    }
  };
}

