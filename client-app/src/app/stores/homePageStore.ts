import { action, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { ILandingPhoto } from "../models/landingPhoto";
import { RootStore } from "./rootStore";


export default class HomePageStore{
    rootStore:RootStore | undefined;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable homepage: ILandingPhoto | null = null;
    @observable landingPhoto: ILandingPhoto | null = null;
    @observable loading = false;
    @observable submitting = false;
    @observable landingPageRegistry: any = [];
    @observable target = '';

    @action displayLandingPage = async (callback :any) => {
        try {
            const landingPhoto = await agent.LandingPhotos.list();
            runInAction('loading Property TYpe', () => {
                callback(landingPhoto)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action createLandingPage = async (LandingPhoto: ILandingPhoto) => {
        try {
            await agent.LandingPhotos.create(LandingPhoto);
        } catch (error) {
            console.log(error)
        }
    }
    @action DeleteLandingPage = async (id: string) => {
        this.submitting = true;
        try {
            await agent.LandingPhotos.delete(id);
            runInAction('deleting property', () => {
              this.landingPageRegistry.delete(id);
              this.submitting = false;
              this.target = '';
            });
          } catch (error) {
            runInAction('delete property error', () => {
              this.submitting = false;
              this.target = '';
            });
            console.log(error);
          }
    }
    @action EditLandingPage = async (landingPhoto: ILandingPhoto) => {
            try{
                await agent.LandingPhotos.update(landingPhoto);
                runInAction('editing landing page', () => {
                    this.landingPageRegistry.set(landingPhoto.id, landingPhoto);
                    this.landingPhoto = landingPhoto;
                    this.loading = false;
                })
            }catch(error){
                runInAction('editing landing page error', () => {
                    this.loading = false;
                })
            }
    }


}