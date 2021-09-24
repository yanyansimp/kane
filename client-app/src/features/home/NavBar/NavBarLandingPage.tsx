import React, { useContext, useEffect, useState } from 'react';
import { Menu, Responsive, Dropdown, DropdownMenu, Button, Image, Popup, Grid, Header } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
// import LogoutModal from './LogoutModal';


const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]
const NavMenu: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Laptop Item')
    const [showModal, setShowModal] = useState(false)
    const rootStore = useContext(RootStoreContext);
    // const {displayPropertyTypes} = rootStore.propertyTypeStore;
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
                <Responsive as ={Menu.Item} minWidth={790}
                        style={{color:'white'}}
                        name = "Login"
                    />
                    <Responsive as ={Menu.Item} minWidth={790}
                        style={{color:'white'}}
                        name = "Register"
                    />
                </Menu.Menu>
                <Responsive as ={Menu.Menu} maxWidth={789}  position='right'>
                    <Dropdown
                        item
                        icon ='bars'
                        >
                        <Dropdown.Menu>
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