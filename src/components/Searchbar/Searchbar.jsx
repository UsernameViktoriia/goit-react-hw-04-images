import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBarHeader,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [images, setImages] = useState('');

  const handleNameChange = e => {
    setImages(e.target.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(images.trim());
    setImages('');
  };
  return (
    <SearchBarHeader>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          onChange={handleNameChange}
          value={images}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchBarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
