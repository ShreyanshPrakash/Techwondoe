import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import styled from 'styled-components';
import { FormModel } from 'models';
import { isFormDataValid, isEmailValid } from 'utils';
import { AudioRecorder, CustomModal } from 'components';
import { httpsService } from 'service';
import { API_ENDPOINTS, APP_CONFIG } from 'config';

const AudioMemoWrapper = styled.div`
  margin: 56px 0px;

  .form-container {
    width: 360px;
    margin: auto;

    padding: 24px;
  }

  .form-field {
    display: flex;
    margin: 16px 0px;
  }
`;

const TitleWrapper = styled.div`
  font-size: 24px;
`;

export function AudioMemo() {
  const [formState, setFormState] = useState(new FormModel());
  const [isFormValid, setIsFormValid] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (formState) {
      const isPassReentermMatch =
        formState?.password === formState?.reenterPassword;
      setIsFormValid(
        isFormDataValid(formState) &&
          isPassReentermMatch &&
          isEmailValid(formState?.email) &&
          formState?.phoneNumber.length == 10
      );
    } else {
      setIsFormValid(false);
    }
  }, [formState]);

  /*
    Form Methods
  */

  const handleFormChange = event => {
    const { name, value, checked } = event?.target || {};
    if (
      name === 'phoneNumber' &&
      !(value?.length <= 10 && !isNaN(Number(value)))
    ) {
      return;
    }
    setFormState(state => ({
      ...state,
      [name]: name === 'tncChecked' ? checked : value
    }));
  };

  const handleOnFormSubmit = event => {
    event.preventDefault();
    console.log(formState);
    httpsService
      .post(API_ENDPOINTS[APP_CONFIG.ENV].saveAudioMemo, formState)
      .then(res => console.log(res))
      .catch(error => console.log(error.message));
  };

  const handleOnRecord = () => {
    setOpenModal(true);
  };

  /*
    Modal Methods
  */

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalSubmit = audio => {
    setFormState(state => ({
      ...state,
      audioMemo: btoa(audio)
    }));
    setOpenModal(false);
  };

  return (
    <AudioMemoWrapper>
      <TitleWrapper>Audio Memo</TitleWrapper>
      <form
        className="form-container"
        required
        onChange={handleFormChange}
        onSubmit={handleOnFormSubmit}
      >
        <TextField
          className="form-field"
          label="Name"
          name="name"
          size="small"
          required
          value={formState?.name}
        />
        <TextField
          className="form-field"
          label="Email"
          name="email"
          size="small"
          required
          value={formState?.email}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          size="small"
          className="form-field"
          inputProps={{
            maxenght: 10
          }}
          required
          value={formState?.phoneNumber}
        />
        <TextField
          label="Password"
          name="password"
          size="small"
          className="form-field"
          required
          inputProps={{
            type: 'password'
          }}
          value={formState?.password}
        />
        <TextField
          label="Reenter Password"
          name="reenterPassword"
          size="small"
          className="form-field"
          required
          inputProps={{
            type: 'password'
          }}
          value={formState?.reenterPassword}
        />
        <FormControlLabel
          className="form-field"
          required
          control={
            <Checkbox name="tncChecked" checked={formState?.tncChecked} />
          }
          label="I agree to TnC"
        />
        <IconButton
          className="form-field"
          color="secondary"
          onClick={handleOnRecord}
        >
          <MicIcon color={`${formState?.audioMemo ? 'success' : 'error'}`} />
        </IconButton>
        <Button
          className="form-field"
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          Save Memo
        </Button>
      </form>
      <CustomModal open={openModal} onClose={handleModalClose}>
        <AudioRecorder
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      </CustomModal>
    </AudioMemoWrapper>
  );
}
