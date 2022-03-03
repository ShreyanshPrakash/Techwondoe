import { useEffect, useState } from 'react';

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [recorderError, setRecorderError] = useState(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(handleRecorderSuccess, handleRecorderError);
      }
      return;
    }

    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
      // recorder.stream.getTracks().forEach(track => track.stop());
    }

    const handleData = e => {
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener('dataavailable', handleData);
    return () => {
      recorder.removeEventListener('dataavailable', handleData);
      // recorder.stream.getTracks().forEach(track => track.stop());
    };
  }, [recorder, isRecording]);

  const startRecording = () => {
    if (recorderError) {
      return;
    }
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleRecorderSuccess = success => {
    // setInterval(() => {
    //   console.log(success);
    // }, 2 * 1000);
    setRecorder(success);
    setRecorderError(null);
  };

  const handleRecorderError = error => {
    console.log(error.message);
    setRecorderError(error.message);
  };

  return [audioURL, isRecording, recorderError, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
