export interface IRole {
    id: string;
    name: string;
    roleClaims?: string[];
}

export interface IRoleClaim {
   claimName: string;
}

export interface IRoleFormValues {
    id: string;
    name: string;
    roleClaims: IRoleClaim[];
}