import React from 'react';
import axios from 'axios';
import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('idle');

  const handleFormSubmit = images => {
    setGallery([]);
    setPage(1);
    setImages(images);
  };

  useEffect(() => {
    if (images === '') {
      return;
    }
    setStatus('pending');
    setError(null);
    const res = axios
      .get(
        `https://pixabay.com/api/?key=31020563-d44473fd087eb3f9b37189b03&q=${images}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
      )
      .then(({ data }) => {
        if (!data.total) {
          setStatus('idle');
          return alert('There is no picture for that name');
        }
        setStatus('resolved');
        setGallery(prevGallery => [...prevGallery, ...data.hits]);
      })
      .catch(error => {
        setStatus('rejected');
        setError(error.message);
      });
  }, [page, images]);

  const onClickButton = () => {
    setPage(page + 1);
  };
  const onClickImage = imageUrl => {
    setImageUrl(imageUrl);
  };
  const onCloseModal = () => {
    setImageUrl('');
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery images={gallery} onClick={onClickImage} />
      )}
      {status === 'resolved' && <Button onClick={onClickButton} />}
      {status === 'rejected' && (
        <h1 style={{ textAlign: 'center' }}>{error}</h1>
      )}
      {imageUrl && (
        <Modal onClose={onCloseModal}>
          <img src={imageUrl} alt="" />
        </Modal>
      )}
    </AppWrapper>
  );
};