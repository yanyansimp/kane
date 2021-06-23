import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

export const SideBar = () => {
  return (
    <Menu inverted vertical fixed="left">
      <Menu.Item as={NavLink} to="/activities">
        <span>
          <Icon name="chart bar outline" size="large" />
          Dashboard
        </span>
      </Menu.Item>
      <Menu.Item as={NavLink} to="/dashboard">
        <span>
          <Icon name="calendar outline" size="large" />
          Calendar
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="sticky note outline" size="large" />
          Reservation
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="credit card outline" size="large" />
          Payment
        </span>
      </Menu.Item>
      <Menu.Item as={NavLink} to="/property">
        <span>
          <Icon name="map outline" size="large" />
          Property
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="user outline" size="large" />
          User
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="newspaper outline" size="large" />
          Report
        </span>
      </Menu.Item>
    </Menu>
  );
};
