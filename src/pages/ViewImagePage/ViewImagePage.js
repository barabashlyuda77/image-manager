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
import Tooltip from '../../components/tooltip/Tooltip';

const ViewImagePage = () => {
  const { id: imageId } = useParams();
  const imageList = useSelector(imageListSelector)
  const imageWithTooltip = imageList.find(image => image.id === imageId)

  if (!imageWithTooltip) {
    return <div>No image with such id</div>
  }

  const image = imageWithTooltip.image
  const { tooltipText, tooltipColor, tooltipPosition } = imageWithTooltip

  return (
    <>
      <h1>ViewImagePage</h1>
      <div className="back-button">
        <Link to={`/`}>Back</Link>
      </div>
      <div className="edit-image-button">
        <Link to={`/edit/${imageId}`}>Edit Image</Link>
      </div>
      <div className="view-image">
        <Tooltip
          text={tooltipText}
          color={tooltipColor}
          position={tooltipPosition}
        >
          <img src={image.contents} alt="" height="400" />
        </Tooltip>
      </div>
    </>
  );
}

export default ViewImagePage;
