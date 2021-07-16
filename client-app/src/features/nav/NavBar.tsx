import React, { useContext, useEffect } from 'react';
import { Menu, Container, Dropdown, Image, Icon, Button, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUser } from '../../app/models/user';

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;


  return (
    <Menu fixed="top" secondary>
      <Container fluid>
        <Menu.Item as={NavLink} exact to="/">
          <Image
            src="/assets/logo/LogoBlackGold.svg"
            alt="logo"
            style={{ width: '150px' }}
          />
        </Menu.Item>

        {/* <Menu.Item name="Activities" as={NavLink} to="/activities" /> */}
        <Menu.Item>
          {/* <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          /> */}
          {user!.roleClaims.includes('User') && <Label>Hello Admin</Label>}
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Menu.Item position="right">
              <Icon name="bell outline" size="large" />
              <Icon />
              <Icon name="envelope outline" size="large" />
            </Menu.Item>
            <Image
              avatar
              size="mini"
              spaced="right"
              src={user.image || '/assets/user.png'}
            />
            {/* <Dropdown pointing="top right" text={user.displayName} > */}
            <Dropdown pointing="top right">
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
