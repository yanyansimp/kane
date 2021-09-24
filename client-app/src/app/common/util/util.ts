import { IUser } from "../../models/user";
import { IActivity, IAttendee } from "../../models/activity";
import { IClient } from "../../models/client";

export const toMoney = (m: any) => {
    return m?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
