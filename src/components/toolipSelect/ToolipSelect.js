import React from 'react'

const ToolipSelect = ({ name, value, onChange, selectValues }) => {
  return (
    <select name={name} value={value} onChange={onChange}>
      {Object.values(selectValues).map(
        item => <option key={item} item={item}>{item}</option>
      )}
    </select>
  );
}

export default ToolipSelect
