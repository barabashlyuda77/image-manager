import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link, useHistory, useParams
} from 'react-router-dom';
import './AddImagePage.css';
import { addImage, updateImage } from '../../actions';
import { TooltipPosition, TooltipColor } from '../../helpers';
import { imageListSelector } from '../../selectors';

const AddImagePage = () => {
  const { id: imageId } = useParams();
  const imageList = useSelector(imageListSelector)
  const selectedImage = imageList.find(image => image.id === imageId) || {}

  const [image, setImage] = useState(selectedImage.image)
  const [tooltipText, setTooltipText] = useState(selectedImage.tooltipText || '')
  const [tooltipPosition, setTooltipPosition] = useState(selectedImage.tooltipPosition || TooltipPosition.top)
  const [tooltipColor, setTooltipColor] = useState(selectedImage.tooltipColor || TooltipColor.black)
  
  const dispatch = useDispatch()
  const history = useHistory()

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
    history.push('/')
  }, [history])

  const submitHandler = () => {
    const newImage = {
      image,
      tooltipText,
      tooltipPosition,
      tooltipColor,
    }
    console.log(newImage)
    if (imageId) {
      dispatch(updateImage(imageId, newImage))
    } else {
      dispatch(addImage(newImage))
    }
    history.push('/')
  }

  return (
    <>
      <div>AddImagePage</div>
      <form>
        {imageId ? (
          <div className="edit-image">
            <img src={image.contents} alt="" height="400" />
          </div>
        ) : (
          <input type="file" onChange={uploadFileHandler} required />
        )}
        <input type="text" value={tooltipText} onChange={tooltipTextHandler} />
        <select value={tooltipPosition} onChange={tooltipPositionHandler}>
          {Object.values(TooltipPosition).map(
            value => <option key={value} value={value}>{value}</option>
          )}
        </select>
        <select value={tooltipColor} onChange={tooltipColorHandler}>
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
