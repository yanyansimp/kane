export interface IRole {
    name: string;
    roleClaims?: IRoleClaim[];
}

export interface IRoleClaim {
    claimType: string;
    claimValue: string;
}

export interface IRoleFormValues {
    name: string;
    roleCalims: IRoleClaim[];
}