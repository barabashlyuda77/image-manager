import React from 'react';
import { useParams } from 'react-router-dom';
import './ViewImagePage.scss';
import { useSelector } from 'react-redux';
import { imageListSelector } from '../../selectors';
import Tooltip from '../../components/tooltip/Tooltip';
import LinkButton from '../../components/link-button/LinkButton';

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
        <LinkButton to={`/`}>Back</LinkButton>
      </div>
      <div className="edit-image-button">
        <LinkButton to={`/edit/${imageId}`}>Edit Image</LinkButton>
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
