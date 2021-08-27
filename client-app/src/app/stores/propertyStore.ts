import { action, computed, observable, runInAction } from "mobx";
import { SyntheticEvent, useState } from "react";
import agent from "../api/agent";
import { IProperty } from "../models/Property";
import { RootStore } from "./rootStore";
import { history } from '../..';
import { forEachChild } from "typescript";


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
    @observable propertyTypeAvailableId: any = [];
    
    @computed get propertiesByName() {
        return Array.from(this.propertyRegistry.values()).sort();
    }
    @action propertyTypeAvailable(data:any){
        runInAction('loading Property Type Id',() =>{
            this.propertyRegistry.push({
                key:data,
                text: data,
                value: data
            });

        })
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
        this.loading = true;
        try{
                // Agent.ts Connection to Bakcend (API)
                await agent.Properties.update(property);
                
                // Mobx
                runInAction('editing property', () => {
                    this.propertyRegistry.set(property.id, property);
                    this.property = property;
                    this.loading = false;
                    // history.push('/dashboard')
                })
            } catch (error){
                runInAction('editing property error', () => {
                    this.loading = false;
                })
                console.log("error")
            }
    }

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
    }

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
    

}

