import { action, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
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
    @observable status = '';


      /// Image Upload
      @observable image: Blob | null = null;
      @observable files: any[] = [];
      @observable uploadingPhoto = false;
  
      @action setFiles = (files: object[]) => {
          this.files = files;
        };
      
      @action setImage = (file: Blob) => {
          this.image = file;
      };

    @action displayLandingPageHeader = async (callback :any) => {
        try {
            const landingSlide:any = [];
            var i = 0
            const landingPhoto = await agent.LandingPhotos.list();
            landingPhoto.forEach((landing)=>{
                if(landing.isMain === "Header"  ){
                    landingSlide[i] = landing
                    i++
                }
            })
            runInAction('loading Property TYpe', () => {
                callback(landingSlide)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action displayLandingPageFooter = async (callback :any) => {
        try {
            const landingSlide:any = [];
            var i = 0
            const landingPhoto = await agent.LandingPhotos.list();
            landingPhoto.forEach((landing)=>{
                if(landing.isMain === "Footer"  ){
                    landingSlide[i] = landing
                    i++
                }
            })
            runInAction('loading Property TYpe', () => {
                callback(landingSlide)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action displayLandingBody = async (callback :any) => {
        try {
            const landingSlide:any = [];
            var i = 0
            const landingPhoto = await agent.LandingPhotos.list();
            landingPhoto.forEach((landing)=>{
                if(landing.isMain === "Body"  ){
                    landingSlide[i] = landing
                    i++
                }
            })
            runInAction('loading Property TYpe', () => {
                callback(landingSlide)
            })
        }catch (error){
            console.log(error)
        }
    }
    @action createLandingPage = async (LandingPhoto: ILandingPhoto) => {
        this.submitting = true;
        try {
            runInAction(() => {
                this.status = 'Uploading Details...'
            })
            var returnimage = await agent.LandingPhotos.uploadPhoto(this.image!);
            LandingPhoto.url = returnimage.url;
            await agent.LandingPhotos.create(LandingPhoto);
            toast.success('Property Successfully Added');
            window.location.reload();
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