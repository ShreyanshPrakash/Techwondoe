import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { ActionButtons } from "components";
import useRecorder from "hooks/useRecorder";
import React from "react";
import styled from "styled-components";

const AudioRecorderWrapper = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const BodyWrapper = styled.div`
  padding: 24px;
  text-align: center;
  margin: 16px 0px;

  .audio-player-wrapper {
    margin-bottom: 16px;
  }

  .record-button {
    margin-right: 24px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  /* margin: 16px 0px; */
`;

export const AudioRecorder = ({ onClose, onSubmit }) => {
  const [audioURL, isRecording, recorderError, startRecording, stopRecording] =
    useRecorder();

  const handleSubmit = () => {
    onSubmit(audioURL);
  };

  return (
    <AudioRecorderWrapper>
      <Title>Record your voice memo</Title>
      <BodyWrapper>
        <Box className="audio-player-wrapper">
          <audio src={audioURL} controls />
          {recorderError && (
            <ErrorMessage>{`Recorder Error : ${recorderError}`}</ErrorMessage>
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          className="record-button"
          onClick={startRecording}
          disabled={isRecording}
        >
          Record
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Stop
        </Button>
      </BodyWrapper>
      <Divider />
      <ActionButtons onClose={onClose} onSubmit={handleSubmit} />
    </AudioRecorderWrapper>
  );
};
