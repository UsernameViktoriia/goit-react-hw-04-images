import React from 'react';
import { Audio } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
      />
    </LoaderWrapper>
  );
};
