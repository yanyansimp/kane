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
    @observable loading = false;
    @observable target = '';
    @observable submitting = false;

    @computed get propertiesByName() {
        return Array.from(this.propertyRegistry.values()).sort();
    }

    @action getProperties = async (callback: any) => {
        try {
            const properties = await agent.Properties.list();
            callback(properties)
        } catch (error) {
            console.log(error)
        }
    }

    @action loadProperties = async () => { 
        try {
            const properties = await agent.Properties.list();
            // console.log(properties)
            runInAction('loading property types', () => {
                properties.forEach((property) => {
                    this.propertyRegistry.push({
                        key: property.name,
                        text: property.name,
                        value: property.id
                    });
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action createProperty = async (property: IProperty) => {
        try {
            await agent.Properties.create(property);
        } catch (error) {

        }
    }
    
    @action EditProperty = async (property: IProperty) => {
        // console.log(property);
        this.loading = true;
        try{
                // Agent.ts Connection to Bakcend (API)
                await agent.Properties.update(property);
                
                // Mobx
                runInAction('editing property', () => {
                    this.propertyRegistry.set(property.id, property);
                    this.property = property;
                    this.loading = false;
                })
            } catch (error){
                runInAction('editing property error', () => {
                    this.loading = false;
                })
                console.log("nono")
            }
    }


    @action DeleteProperty = async (
        // event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        console.log(id)
        this.submitting = true;
        // this.target = event.currentTarget.name;
        try {
            await agent.Properties.delete(id);
            runInAction('deleting property', () => {
              this.propertyRegistry.delete(id);
              this.submitting = false;
              this.target = '';
              history.push('/property')
            });
          } catch (error) {
            runInAction('delete property error', () => {
              this.submitting = false;
              this.target = '';
            });
            console.log("nono");
          }
    };
}