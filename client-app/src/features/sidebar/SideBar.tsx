import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Segment,
  Sidebar,
  Menu,
  Icon,
  Header,
  Image,
  Grid,
} from 'semantic-ui-react';

export const SideBar = () => {
  return (
    <Menu inverted vertical fixed="left">
      <Menu.Item as={NavLink} to="/activities">
        <span>
          <Icon name="dashboard" /> Dashboard
        </span>
      </Menu.Item>
      <Menu.Item as={NavLink} to="/dashboard">
        <span>
          <Icon name="calendar" />
          Calendar
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          {/* <Icon name=""/> */}
          Reservation
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="payment" />
          Payment
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="box" />
          Property
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="users" />
          User
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          {/* <Icon name="paper" /> */}
          Report
        </span>
      </Menu.Item>
    </Menu>
  );
};
