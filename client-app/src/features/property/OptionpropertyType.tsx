import React, { useContext, useEffect }  from 'react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { observer } from 'mobx-react-lite'

const OptionpropertyType = () => {
    const rootStore = useContext(RootStoreContext);
    const {propertyTypesByName, loadPropertyTypes} = rootStore.propertyTypeStore;
    
    useEffect(() => {
        loadPropertyTypes()
    }, [loadPropertyTypes]);
        return (
           <div>
               {propertyTypesByName.map((propertyType) => (
                       <option key={propertyType.id}>
                          {propertyType.name}
                       </option>
               ))
               
               }
           </div>
        )
}

export default observer(OptionpropertyType)
