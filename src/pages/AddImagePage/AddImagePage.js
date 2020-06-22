import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Link, useHistory, useParams
} from 'react-router-dom';
import './AddImagePage.css';
import { addImage, updateImage } from '../../actions';
import { TooltipPosition, TooltipColor } from '../../helpers';
import { imageListSelector } from '../../selectors';

const getImageFromFile = file => {
  return new Promise(resolve => {
    const readerLoadCallback = () => {
      // convert image file to base64 string
      const base64file = reader.result;
      const {name, size, type} = file
      const image = {
        name,
        size,
        type,
        contents: base64file,
      }
      resolve(image)
    }

    const reader = new FileReader();
    reader.addEventListener('load', readerLoadCallback);
    reader.readAsDataURL(file);
  })
}

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
    const location = imageId ? `/view/${imageId}` : '/'
    history.push(location)
  }, [history, imageId])

  const submitHandler = async ({ file, tooltipText, tooltipPosition, tooltipColor }) => {
    const image = await getImageFromFile(file)
    const imageWithTooltip = {
      image,
      tooltipText,
      tooltipPosition,
      tooltipColor,
    }
    console.log(imageWithTooltip)
    if (imageId) {
      dispatch(updateImage(imageId, imageWithTooltip))
    } else {
      dispatch(addImage(imageWithTooltip))
    }
    
    const location = imageId ? `/view/${imageId}` : '/'
    history.push(location)
  }

  return (
    <>
      {imageId ? (
        <div>EditImagePage</div>
      ) : (
        <div>AddImagePage</div>
      )}
      <Formik
        initialValues={{ tooltipText, tooltipPosition, tooltipColor, file: '' }}
        onSubmit={submitHandler}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            {imageId ? (
              <div className="edit-image">
                <img src={image.contents} alt="" height="400" />
              </div>
            ) : (
              <input type="file" name="file" onChange={event => {
                props.setFieldValue('file', event.target.files[0])
              }} required />
            )}
            {props.errors.file && <div className="form-error">{props.errors.file}</div>}
            <input type="text" name="tooltipText" onChange={props.handleChange} />
            {props.errors.tooltipText && <div className="form-error">{props.errors.tooltipText}</div>}
            <select name="tooltipPosition" onChange={props.handleChange}>
              {Object.values(TooltipPosition).map(
                value => <option key={value} value={value}>{value}</option>
              )}
            </select>
            {props.errors.tooltipPosition && <div className="form-error">{props.errors.tooltipPosition}</div>}
            <select name="tooltipColor" onChange={props.handleChange}>
              {Object.values(TooltipColor).map(
                value => <option key={value} value={value}>{value}</option>
              )}
            </select>
            {props.errors.tooltipColor && <div className="form-error">{props.errors.tooltipColor}</div>}
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={cancelHandler} />
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddImagePage;
