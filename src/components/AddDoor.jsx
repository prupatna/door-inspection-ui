import { useState } from 'react';
import Creatable from 'react-select/creatable';
import DoorAttrForm from './DoorAttrForm';

const AddDoor = () => {
  
  // Display flags for floor, door and rest of the options.
  const [isBuildingSelected, setIsBuildingSelected] = useState(false)
  const [isFloorSelected, setIsFloorSelected] = useState(false)
  const [isDoorSelected, setIsDoorSelected] = useState(false)

  // Building
  const [selectedBuilding, setSelectedBuilding] = useState({})
  // TODO: @prupatna - call api to get initial set of Buildings in DB
  const [buildingOptions, setBuildingOptions] = useState([])

  const addBuildingOption = (e) => {
    setBuildingOptions([...buildingOptions, {label: e, value: e}])
    // TODO: @prupatna - call the api to create option
  }

  const onBuildingSelect = (e) => {
    setSelectedBuilding(e)
    if(e!==null) {
      setIsBuildingSelected(true)
    } else {
      setIsBuildingSelected(false)
      setIsFloorSelected(false)
      setIsDoorSelected(false)
    }
  }

  // Floor
  const [selectedFloor, setSelectedFloor] = useState({})
  // TODO: @prupatna - call api to get initial set of Fllors for the selected building in DB
  const [floorOptions, setFloorOptions] = useState([])

  const addFloorOption = (e) => {
    setFloorOptions([...floorOptions, {label: e, value: e}])
    // TODO: @prupatna - call the api to create option
  }

  const onFloorSelect = (e) => {
    setSelectedFloor(e)
    if(e!==null) {
      setIsFloorSelected(true)
    } else {
      setIsFloorSelected(false)
      setIsDoorSelected(false)
    }
  }

  // Door
  const [selectedDoor, setSelectedDoor] = useState({})
  // TODO: @prupatna - call api to get initial set of doors for the selected floor in DB
  const [doorOptions, setDoorOptions] = useState([])

  const addDoorOption = (e) => {
    setDoorOptions([...doorOptions, {label: e, value: e}])
    // TODO: @prupatna - call the api to create option
  }

  const onDoorSelect = (e) => {
    setSelectedDoor(e)
    setIsDoorSelected(e!==null)
  }

  return (
    <>
      <Creatable
        options={buildingOptions}
        onCreateOption={addBuildingOption}
        onChange={onBuildingSelect}
        placeholder={window.bundle.dropdowns.buildingPlaceholder}
        escapeClearsValue={true}
        isClearable={true}
      />
      {isBuildingSelected && 
      <Creatable
        options={floorOptions}
        onCreateOption={addFloorOption}
        onChange={onFloorSelect}
        placeholder={window.bundle.dropdowns.floorPlaceholder}
        escapeClearsValue={true}
        isClearable={true}
      />}
      {isFloorSelected && 
      <Creatable
        options={doorOptions}
        onCreateOption={addDoorOption}
        onChange={onDoorSelect}
        placeholder={window.bundle.dropdowns.doorPlaceholder}
        escapeClearsValue={true}
        isClearable={true}
      />}
      {isDoorSelected &&
        // TODO: @prupatna - Add the door parameter dropdowns
        // <DoorAttrForm />
        <></>
      }
      <DoorAttrForm />
    </>
  )
}

export default AddDoor;