import { IUser } from "../../models/user";
import { IActivity, IAttendee } from "../../models/activity";
import { IClient } from "../../models/client";
import { ITransaction } from "../../models/transaction";

export const toMoney = (m: any) => {
    return m?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toName = (lastname: string, firstname: string, middlename: string, suffix: string) => {
  return `${lastname}, ${firstname} ${middlename ? middlename.charAt(0) + '.' : ''} ${suffix ? suffix : ''}`;
}

export const addZeroDate = (d: any) => {
  return d <= 9 ? '0'+d : d;
};

export const setStatusColor = (status: string) => {
  if (status === 'On Going') {
    return 'blue';
  } else if (status === 'Completed' || status === 'Complete') {
    return 'green';
  } else {
    return 'red';
  }
};

export const setIcon = (status: boolean) => {
  return status ? 'check circle' : 'times circle';
};

export const setIconColor = (status: boolean) => {
  return status ? 'green' : 'red';
};

export const combineDateAndTime = (date: Date, time: Date) => {
    // const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const dateString = `${year}-${month}-${day}`;

    // return new Date(dateString + ' ' + timeString);

    const dateString = date.toISOString().split('T')[0];
    const timeString = time.toISOString().split('T')[1];

    return new Date(dateString + 'T' + timeString);
}

export const setDocsProps = (docs: any[]) => {
  return docs.map(d => d.type);
};

export const setClientProps = (client: IClient) => {
  client.birthDate = new Date(client.birthDate);

  if (client.spouseBirthDate !== null) {
    client.spouseBirthDate = new Date(client.spouseBirthDate);
  }

  if (client.coBirthDate !== null) {
    client.coBirthDate = new Date(client.coBirthDate);
  } 

  if (client.atBirthDate !== null) {
    client.atBirthDate = new Date(client.atBirthDate);
  }
  
  return client;
}

export const setTansactionProps = (transaction: ITransaction) => {
  transaction.createdAt = new Date(transaction.createdAt!);
  
  return transaction;
}

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(
        a => a.username === user.username
    );
    activity.isHost = activity.attendees.some(
        a => a.username === user.username && a.isHost
    );
    return activity;
}

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    };
}
