import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  .close-button {
    margin-right: 24px;
  }
`;

export function ActionButtons({ onClose, onSubmit, disabled }) {
  return (
    <ActionButtonsWrapper>
      <Button
        onClick={onClose}
        disabled={disabled}
        color="primary"
        className="close-button"
      >
        Close
      </Button>
      <Button onClick={onSubmit} disabled={disabled} color="primary">
        Submit
      </Button>
    </ActionButtonsWrapper>
  );
}
