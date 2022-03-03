import { Modal } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const CustomModalWrapper = styled.div``;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
`;

export function CustomModal({ open, onClose, children }) {
  return (
    <CustomModalWrapper>
      <Modal open={open} onClose={onClose}>
        <ModalWrapper>{children}</ModalWrapper>
      </Modal>
    </CustomModalWrapper>
  );
}
