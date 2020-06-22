import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ListImagePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { imageListSelector} from '../../selectors'
import { getImageList, removeImage } from '../../actions';

const ListImagePage = () => {
  const imageList = useSelector(imageListSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImageList())
  }, [dispatch])

  const removeImageHandler = imageId => {
    dispatch(removeImage(imageId))
  }

  return (
    <>
      <h1>ListImagePage</h1>
      <div className="add-image-button">
        <Link to="/add">Add Image</Link>
      </div>
      <div className="gridview">
        <div className="gridview-header">Image</div>
        <div className="gridview-header">Actions</div>
        {imageList.map(({ id, image }) => (
          <>
            <div className="gridview-image-container">
              <Link to={`/view/${id}`}>
                <img key={id} data-id={id} src={image.contents} alt="" height="100" />
              </Link>
            </div>
            <div>
              <button onClick={() => removeImageHandler(id)}>Remove</button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default ListImagePage;
