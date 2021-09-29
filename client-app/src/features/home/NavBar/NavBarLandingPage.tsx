import React, { useContext, useEffect, useState } from 'react';
import { Menu, Responsive, Dropdown, DropdownMenu, Button, Image, Popup, Grid, Header, Icon } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoginForm from '../../user/LoginForm';

const menu = {
    background: 'grey',
    color:'white',
    '&:hover':{
        color:'red'
    }
}

const NavMenu: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Laptop Item')
    const [showModal, setShowModal] = useState(false)
    const rootStore = useContext(RootStoreContext);
    const {openModal} = rootStore.modalStore;
    const { isLoggedIn, user, logout } = rootStore.userStore;
    const {displayPropertyTypes} = rootStore.propertyTypeStore;
    const [propertyTypes, setpropertyTypes] = useState([])
    const propFunc = (prop: any) => {
        setpropertyTypes(prop)
    }
    useEffect(() => {
        displayPropertyTypes(propFunc)
    }, [displayPropertyTypes ]);
    return (
        <div>
            <Menu inverted horizontal fixed="top"  > 
            <Responsive as ={Menu.Menu} maxWidth={789} >
                    <Dropdown item icon='bars' simple >
                        <Dropdown.Menu position='left'>
                            <Dropdown.Item>
                                <Icon name='dropdown' />
                                <span className='text'>OUR BRAND</span>
                                <Dropdown.Menu>
                                    {propertyTypes.map((properties:any) => {
                                            return(
                                                <Dropdown.Item href={`/properties/${properties.id}`}>{properties.name}</Dropdown.Item>
                                            )
                                        })}
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>sample</Dropdown.Item>
                            <Dropdown.Item>sample</Dropdown.Item>
                            <Dropdown.Item>sample</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>sample</Dropdown.Item>
                            <Dropdown.Item>sample</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Responsive>
                <Responsive as={NavLink}  exact to="/">
                <Image
                    src="/assets/logo/LogoBlackGold.svg"
                    alt="logo"
                    style={{ width: '150px' }}
                />
                </Responsive>
                <Responsive as={Menu.Item} minWidth={790}
                    style={{color:'white'}}
                    active={activeItem === 'Kane Realty'}
                    >
                     <Dropdown  item icon ='' text='OUR BRAND' >
                         <Dropdown.Menu style={{color:'white'}} >
                                {propertyTypes.map((properties:any) => {
                                    return(
                                        <Dropdown.Item href={`/properties/${properties.id}`}>{properties.name}</Dropdown.Item>
                                    )
                                })}
                         </Dropdown.Menu>
                     </Dropdown>
                </Responsive>

                <Responsive as={Menu.Item} minWidth={790}
                    style={{color:'white'}}
                    name='ABOUT US'
                    active={activeItem === 'Kane Realty'}
                />
                <Responsive as={Menu.Item} minWidth={790}
                    style={{color:'white'}}
                    name='OUR BRAND'
                    active={activeItem === 'Kane Realty'}
                />
                <Responsive as={Menu.Item} minWidth={790}
                    style={{color:'white'}}
                    name='CONTACT US'
                    active={activeItem === 'Kane Realty'}
                />
                    <Menu.Menu position='right'>
                            {isLoggedIn && user ? (
                            <Responsive as = {Menu.Item} minWidth={790}  >
                                    <Image
                                    as={Link}
                                    to="/dashboard"
                                    avatar
                                    size="mini"
                                    src={user.image || '/assets/user.png'}
                                    />
                            </Responsive>
                                ) : (
                                <Responsive as = {Menu.Item} minWidth={790}
                                    style={{color:'white'}}
                                    name='LOGIN'
                                    onClick={() => openModal(<LoginForm />)} size="huge" inverted
                                />
                                )}
                    </Menu.Menu>
                
            </Menu>
        </div>
    )
}

export default withRouter(NavMenu);


