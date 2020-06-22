import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListImagePage.scss';

import { useSelector, useDispatch } from 'react-redux';
import { imageListSelector} from '../../selectors'
import { getImageList, removeImage } from '../../actions';
import Button from '../../components/button/Button';
import LinkButton from '../../components/link-button/LinkButton';

const ListImagePage = () => {
  const imageList = useSelector(imageListSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImageList())
  }, [dispatch])

  const removeImageHandler = imageId => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeImage(imageId))
    }
  }

  return (
    <>
      <h1>ListImagePage</h1>
      <div className="add-image-button">
        <LinkButton to="/add">Add Image</LinkButton>
      </div>
      <div className="gridview">
        <div className="cell gridview-header">Image</div>
        <div className="cell gridview-header">Actions</div>
        {imageList.map(({ id, image }) => (
          <>
            <div className="cell gridview-image-container">
              <Link to={`/view/${id}`}>
                <img key={id} data-id={id} src={image.contents} alt="" height="100" />
              </Link>
            </div>
            <div className="cell actions">
              <Button onClick={() => removeImageHandler(id)}>Remove</Button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default ListImagePage;
