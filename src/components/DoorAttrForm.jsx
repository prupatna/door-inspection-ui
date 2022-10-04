import React from 'react';
import doorAttributes from '../common/doorAttributes.json';
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const DoorAttrForm = () => {

  const doorAttrObj = Object(doorAttributes)
  const doorAttributeKeys = Object.keys(doorAttributes)

  const getDefaultValues = (doorAttributeKeys) => {
    const defValues = {}
    for (let key of doorAttributeKeys) {
      defValues[key] = ""
    }
    return defValues
  }

  const { control, handleSubmit } = useForm({
    defaultValues: getDefaultValues(doorAttributeKeys)
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        doorAttributeKeys.map(key => {
          if (doorAttrObj[key].length === 0) {
            return (
              <>
                <label>{window.bundle.dropdowns.doorAttributes[key]}</label>
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => <input {...field} type="text" className='form-control' id={key} name={key} />}
                  rules={{ required: true }}
                />
                <br />
              </>
            )
          } else {
            return (
              <>
                <label>{window.bundle.dropdowns.doorAttributes[key]}</label>
                <Controller
                  name={key}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <Select
                    {...field}
                    options={
                      doorAttrObj[key].map(optionVal => {
                        return (
                          {
                            value: optionVal,
                            label: optionVal
                          }
                        )
                      })
                    }
                  />}
                />
                <br />
              </>
            )
          }
        })
      }
      {/* TODO: @prupatna - Form submit not working */}
      <input type="submit" />
    </form>
  );
  

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <label>Ice Cream Preference</label>
  //     <Controller
  //       name="iceCreamType"
  //       render={({ field }) => (
  //         <Select
  //           {...field}
  //           options={[
  //             { value: "chocolate", label: "Chocolate" },
  //             { value: "strawberry", label: "Strawberry" },
  //             { value: "vanilla", label: "Vanilla" }
  //           ]}
  //         />
  //       )}
  //       control={control}
  //       defaultValue=""
  //     />

  //     <input type="submit" />
  //   </form>
  // );
}

export default DoorAttrForm