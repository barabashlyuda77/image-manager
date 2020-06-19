import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Link
} from 'react-router-dom';
import './AddImagePage.css';
import { addImage } from '../../actions';
import { TooltipPosition, TooltipColor } from '../../helpers';

const AddImagePage = () => {
  const [image, setImage] = useState(null)
  const [tooltipText, setTooltipText] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState(TooltipPosition.top)
  const [tooltipColor, setTooltipColor] = useState(TooltipColor.black)
  
  const dispatch = useDispatch()
  const uploadFileHandler = useCallback((event) => {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      const base64file = reader.result;
      const {name, size, type} = file
      setImage({
        name,
        size,
        type,
        contents: base64file,
      })
    }, false);
    reader.readAsDataURL(file);
  }, [setImage])

  const tooltipTextHandler = useCallback((event) => {
    setTooltipText(event.target.value)
  }, [setTooltipText])

  const tooltipPositionHandler = useCallback((event) => {
    setTooltipPosition(event.target.value)
  }, [setTooltipPosition])

  const tooltipColorHandler = useCallback((event) => {
    setTooltipColor(event.target.value)
  }, [setTooltipColor])

  const cancelHandler = useCallback((event) => {
    // return to home page
  }, [])

  const submitHandler = () => {
    const newImage = {
      image,
      tooltipText,
      tooltipPosition,
      tooltipColor,
    }
    console.log(newImage)
    dispatch(addImage(newImage))
  }

  return (
    <>
      <div>AddImagePage</div>
      <form>
        <input type="file" onChange={uploadFileHandler} required />
        <input type="text" onChange={tooltipTextHandler} />
        <select onChange={tooltipPositionHandler}>
          {Object.values(TooltipPosition).map(
            value => <option key={value} value={value}>{value}</option>
          )}
        </select>
        <select onChange={tooltipColorHandler}>
          {Object.values(TooltipColor).map(
            value => <option key={value} value={value}>{value}</option>
          )}
        </select>
        <input type="submit" value="Submit" onClick={submitHandler} />
        <input type="button" value="Cancel" onClick={cancelHandler} />
      </form>
      {/* {imageUrl && <img src={imageUrl} height="100" alt="" />} */}
    </>
  );
}

export default AddImagePage;
