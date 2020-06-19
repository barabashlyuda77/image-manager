import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListImagePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { imageListSelector} from '../../selectors'
import { getImageList } from '../../actions';

const ListImagePage = () => {
  const imageList = useSelector(imageListSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImageList())
  }, [dispatch])

  console.log('imageList', imageList);
  return (
    <>
      <div>ListImagePage</div>
      {imageList.map(({ id, image }) => (
        <img key={id} src={image.contents} alt="" height="100" />
      ))}
    </>
  );
}

export default ListImagePage;
