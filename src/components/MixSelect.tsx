import './MixSelect.scss'

import { useState } from 'react'
import { Checkbox, Radio, Select } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

interface Props {
  checkboxData: any[]
  radioCheckboxData: any[]
  onChange: (values: any[]) => void
}

const MixSelect = () => {
  // select all text
  const checkAllLabel = 'Select All'
  // if haven't check all options
  const [indeterminate, setIndeterminate] = useState(false)
  // is check all checkbox checked
  const [checkAll, setCheckAll] = useState(false)

  const mode = 'multiple'
  // const tagRender = (props: CustomTagProps) => {
  //   return ''
  // }

  const [value, setValue] = useState<any[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false)
  const [isRadioCheckboxDisabled, setIsRadioCheckboxDisabled] = useState(false)

  const handleCheckboxSelect = (checkboxValue: any) => {
    if (checkboxValue.length > 0) {
      setIsRadioCheckboxDisabled(true)
    } else {
      setIsRadioCheckboxDisabled(false)
    }
    setValue(checkboxValue)
    setIndeterminate(
      !!checkboxValue.length && checkboxValue.length < checkboxData.length
    )
    setCheckAll(checkboxValue.length === checkboxData.length)
  }
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setValue(e.target.checked ? checkboxData.map(({ value }) => value) : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
    setIsRadioCheckboxDisabled(e.target.checked ? true : false)
  }
  const handleRadioCheckboxSelect = (radioCheckboxValue: any) => {
    setIsCheckboxDisabled(true)
    setValue([radioCheckboxValue])
  }
  const checkboxData = [
    {
      value: 3,
      label: 'noah',
    },
    {
      value: 5,
      label: 'nahua',
    },
    {
      value: 6,
      label: 'nahua',
    },
    {
      value: 7,
      label: 'nahua',
    },
    {
      value: 8,
      label: 'nahua',
    },
    {
      value: 9,
      label: 'nahua',
    },
    {
      value: 10,
      label: 'nahua',
    },
    {
      value: 11,
      label: 'nahua',
    },
  ]
  const radioCheckboxData = [
    {
      value: 'male',
      label: '男',
    },
    {
      value: 'female',
      label: '女',
    },
  ]
  const generateCheckboxGroup = () => (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Checkbox
          checked={checkAll}
          onChange={onCheckAllChange}
          disabled={isCheckboxDisabled}
          indeterminate={indeterminate}
        >
          {checkAllLabel}
        </Checkbox>
      </div>
      <Checkbox.Group
        style={{ display: 'flex', flexDirection: 'column' }}
        disabled={isCheckboxDisabled}
        options={checkboxData}
        value={value}
        onChange={(checkboxValue) => {
          handleCheckboxSelect(checkboxValue)
        }}
      />
    </>
  )
  const generateRadioCheckboxGroup = () => (
    <Radio.Group
      style={{ display: 'flex', flexDirection: 'column' }}
      value={value[0]}
      disabled={isRadioCheckboxDisabled}
      onChange={(e) => {
        handleRadioCheckboxSelect(e.target.value)
      }}
    >
      {radioCheckboxData.map(({ label, value }) => (
        <Radio className="SelectOption" key={value} value={value}>
          <div>{label}</div>
        </Radio>
      ))}
    </Radio.Group>
  )
  const dropdownRender = () => {
    return (
      <div>
        {generateCheckboxGroup()}
        {generateRadioCheckboxGroup()}
      </div>
    )
  }
  return (
    <Select
      mode={mode}
      value={value}
      showArrow={false}
      allowClear={true}
      className="Select"
      // tagRender={tagRender}
      open={isDropdownOpen}
      dropdownRender={dropdownRender}
      listHeight={256}
      dropdownStyle={{ maxHeight: 256, overflowY: 'scroll' }}
      onClear={() => {
        setValue([])
        setCheckAll(false)
        setIndeterminate(false)
        setIsCheckboxDisabled(false)
        setIsRadioCheckboxDisabled(false)
      }}
      onDropdownVisibleChange={(isDropdownOpen) => {
        setIsDropdownOpen(isDropdownOpen)
      }}
    />
  )
}

export default MixSelect
