import React, { useContext, useEffect, useState } from 'react';
import { Menu, Responsive, Dropdown, DropdownMenu, Button, Image, Popup, Grid, Header } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoginForm from '../../user/LoginForm';

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
        // displayPropertyTypes(propFunc)
    }, []);


    return (
        <div>
            <Menu inverted horizontal fixed="top"  > 
                <Responsive as={NavLink} minWidth={790 } exact to="/">
                <Image
                    src="/assets/logo/LogoBlackGold.svg"
                    alt="logo"
                    style={{ width: '150px' }}
                />
                </Responsive>
                <Responsive  as={Menu.Item} minWidth={790}>
                    <Popup trigger={<Button primary>OUR BRAND</Button>} hoverable basic>
                            <Grid columns={1} style={{width:"150px"}}>
                                {propertyTypes.map((properties:any, index:any) =>{
                                   return(
                                    <><Grid.Column textAlign='left'>
                                           <Button  href={`/properties/${properties.id}`} style={{width:"120px"}} primary>{properties.name}</Button>
                                       </Grid.Column>
                                    </>
                                   )
                                })}
                                
                            </Grid>
                    </Popup>
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
                <Menu.Menu position = 'right'>
                
                {isLoggedIn && user ? (
                <Responsive as = {Menu.Item} minWidth={790}>
                        <Image
                        as={Link}
                        to="/dashboard"
                        avatar
                        size="mini"
                        spaced="right"
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
                <Responsive as ={Menu.Menu} maxWidth={789}  position='right'>
                    <Dropdown
                        item
                        icon ='bars'
                        >
                        <Dropdown.Menu>
                        <Image
                        src="/assets/logo/LogoBlackGold.svg"
                        alt="logo"
                        style={{ width: '150px' }}
                    />
                            <Dropdown.Item>
                                <Popup trigger={<Button primary>OUR BRAND</Button>} hoverable inverted basic position='left center'>
                                <Grid columns={1} style={{width:"150px"}}>
                                    {propertyTypes.map((properties:any, index:any) =>{
                                        return(
                                            <><Grid.Column textAlign='left'>
                                                <Button  href={`/properties/${properties.id}`} style={{width:"120px"}} primary>{properties.name}</Button>
                                            </Grid.Column>
                                            </>
                                        )
                                        })}
                                        
                                    </Grid>
                                </Popup>
                            </Dropdown.Item>
                            <Dropdown.Item text='Kane Realty'/>
                            <Dropdown.Item text='Kane Realty'/>
                            <Dropdown.Item text='Sign Out'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Responsive>
            </Menu>
        </div>
    )
}

export default withRouter(NavMenu);


