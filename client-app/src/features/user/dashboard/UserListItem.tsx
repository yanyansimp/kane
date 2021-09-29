import React from 'react'
import { Header, Table, Image, Label, Button } from 'semantic-ui-react';
import { IUser } from '../../../app/models/user';

const dummyData = [
  {
    image: 'assets/images/lena.png',
    name: 'Lena B. Roger',
    cellNumber: '09464426558',
    email: 'lenaroger457@gmail.com',
    status: true,
  },
  {
    image: 'assets/images/lindsay.png',
    name: 'Lindsay Doe',
    cellNumber: '09464426558',
    email: 'lindsay12@gmail.com',
    status: true,
  },
  {
    image: 'assets/images/mark.png',
    name: 'Mark Suckerberg',
    cellNumber: '09464426558',
    email: 'hailmarkfullofgrace@gmail.com',
    status: true,
  },
  {
    image: 'assets/images/lena.png',
    name: 'Mary Poppins',
    cellNumber: '09464426009',
    email: 'marygrace01@gmail.com',
    status: true,
  },
];

const UserListItem: React.FC<{ user: IUser}> = ({ user }) => {
    return (
        <Table.Row>
                <Table.Cell>
                    <Header as="h4" image>
                        <Image src="assets/images/lena.png" rounded size="medium" />
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <h4>Lena B. Roger</h4>
                </Table.Cell>
                <Table.Cell>09464426558</Table.Cell>
                <Table.Cell>lenaroger457@gmail.com</Table.Cell>
                <Table.Cell>
                    <Label color={'green'} rounded>
                        Active
                    </Label>
                </Table.Cell>
                <Table.Cell>
                    <Button circular icon="id badge outline" />
                    <Button circular icon="pencil" />
                    <Button circular icon="trash alternate outline" />
                </Table.Cell>
        </Table.Row>
    );
}

export default UserListItem;
