import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormModel } from "src/models";
import { isFormDataValid } from "src/utils";
import styled from "styled-components";

const AudioMemoWrapper = styled.div`
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

export function AudioMemo() {
  const [formState, setFormState] = useState(new FormModel());
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  useEffect(() => {
    if (formState) {
      const isFormDataInvalid = isFormDataValid(formState);

      setIsFormInvalid(isFormDataInvalid);
    }
    console.log(formState);
  }, [formState]);

  const handleFormChange = (event) => {
    const { name, value, checked } = event?.target;
    setFormState((state) => ({
      ...state,
      [name]: name === "tncChecked" ? checked : value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <AudioMemoWrapper>
      <form
        className="form-container"
        onChange={handleFormChange}
        onSubmit={handleOnSubmit}
      >
        <TextField
          className="form-field"
          label="Name"
          name="name"
          size="small"
          value={formState?.name}
        />
        <TextField
          className="form-field"
          label="Email"
          name="email"
          size="small"
          value={formState?.email}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          size="small"
          className="form-field"
          value={formState?.phoneNumber}
        />
        <TextField
          label="Password"
          name="password"
          size="small"
          className="form-field"
          value={formState?.password}
        />
        <TextField
          label="Reenter Password"
          name="reenterPassword"
          size="small"
          className="form-field"
          value={formState?.reenterPassword}
        />
        <FormControlLabel
          className="form-field"
          control={
            <Checkbox name="tncChecked" checked={formState?.tncChecked} />
          }
          label="I agree to TnC"
        />
        <Button
          className="form-field"
          type="submit"
          variant="contained"
          color="primary"
          disabled={isFormInvalid}
        >
          Submit
        </Button>
      </form>
    </AudioMemoWrapper>
  );
}
