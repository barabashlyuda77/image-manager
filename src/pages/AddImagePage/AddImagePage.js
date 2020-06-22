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
  const dispatch = useDispatch()
  const history = useHistory()

  const { id: imageId } = useParams();
  const imageList = useSelector(imageListSelector)
  const selectedImage = imageList.find(image => image.id === imageId) || {}
  const { image, tooltipText, tooltipPosition, tooltipColor } = selectedImage

  const pageTitle = imageId ? 'EditImagePage' : 'AddImagePage'

  const cancelHandler = useCallback((event) => {
    const location = imageId ? `/view/${imageId}` : '/'
    history.push(location)
  }, [history, imageId])

  const submitHandler = async ({ file, tooltipText, tooltipPosition, tooltipColor }) => {
    const image = file instanceof File
      ? await getImageFromFile(file)
      : file
    const imageWithTooltip = {
      image,
      tooltipText,
      tooltipPosition,
      tooltipColor,
    }
    
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
      <h1>{pageTitle}</h1>
      <Formik
        initialValues={{ tooltipText, tooltipPosition, tooltipColor, file: image }}
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
            <input type="text" name="tooltipText" value={props.values.tooltipText} onChange={props.handleChange} />
            <select name="tooltipPosition" value={props.values.tooltipPosition} onChange={props.handleChange}>
              {Object.values(TooltipPosition).map(
                value => <option key={value} value={value}>{value}</option>
              )}
            </select>
            <select name="tooltipColor" value={props.values.tooltipColor} onChange={props.handleChange}>
              {Object.values(TooltipColor).map(
                value => <option key={value} value={value}>{value}</option>
              )}
            </select>
            <input type="submit" value="Submit" />
            <input type="button" value="Cancel" onClick={cancelHandler} />
          </form>
        )}
      </Formik>
    </>
  );
}

export default AddImagePage;
