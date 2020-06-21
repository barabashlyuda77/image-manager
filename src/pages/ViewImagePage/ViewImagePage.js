import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useHistory,
  Link,
} from 'react-router-dom';
import './ViewImagePage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { imageListSelector } from '../../selectors';

const ViewImagePage = () => {
  const { id: imageId } = useParams();
  const imageList = useSelector(imageListSelector)
  const image = imageList.find(image => image.id === imageId).image || {}
  console.log('imageId', imageId, imageList);
  

  return (
    <>
      <div>ViewImagePage</div>
      <div className="back-button">
        <Link to={`/`}>Back</Link>
      </div>
      <div className="edit-image-button">
        <Link to={`/edit/${imageId}`}>Edit Image</Link>
      </div>
      <div className="view-image">
        <img src={image.contents} alt="" height="400" />
      </div>
    </>
  );
}

export default ViewImagePage;
