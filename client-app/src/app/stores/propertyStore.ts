import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IProperty } from "../models/Property";
import { RootStore } from "./rootStore";


export default class PropertyStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    // @observable propertyTypeRegistry = new Map();
    @observable property: IProperty | null = null;

    @observable propertyRegistry: any = [];

    @computed get propertiesByName() {
        return Array.from(this.propertyRegistry.values()).sort();
    }

    @action loadProperties = async () => {
        try {
            const properties = await agent.Properties.list();
            runInAction('loading property types', () => {
                properties.forEach((property) => {
                    this.propertyRegistry.push({
                        key: property.name,
                        text: property.name,
                        value: property.name
                    });
                    console.log(property);
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
}