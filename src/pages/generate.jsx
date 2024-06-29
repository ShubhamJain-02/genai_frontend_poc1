import React, { useState } from 'react';
import './generate.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Generate = () => {
  const [topic, setTopic] = useState('');
  const [slideTopics, setSlideTopics] = useState('');
  const [numSlides, setNumSlides] = useState('');
  const [template, setTemplate] = useState('template_1');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const ppt_gen = async (e) => {
    e.preventDefault();
    const slides = parseInt(numSlides, 10);
    if (slides > 12) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Number of slides cannot exceed 12');
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    setGeneratingMessage('PPT generating...');
    try {
      const response = await fetch('http://127.0.0.1:8000/generate-ppt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          num_slides: slides,
          headers: slideTopics,
          template: template,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSnackbarSeverity('success');
        setSnackbarMessage(data.message);
        setDownloadLink(`http://127.0.0.1:8000/download/${data.filename}`);
      } else {
        const errorData = await response.json();
        setSnackbarSeverity('error');
        setSnackbarMessage(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setGeneratingMessage('');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className='gen' id="generate_page">
      <div className="generate">
        <div className="info">
          <h2>Generate your own presentation</h2>
          <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
        </div>
        <form action="#" method="POST" className="genForm" name="genform">
          <ul className="noBullet">
            <li className='left'>
              <label htmlFor="topic"></label>
              <input type="text" className="inputFields" id="topic" name="topic" placeholder="Enter topic" value={topic} 
                onChange={(e) => setTopic(e.target.value)} required />
            </li>
            <li className='left'>
              <label htmlFor="slide_top"></label>
              <input type="text" className="inputFields" id="slide_top" name="slide_top" placeholder="Give slide topics" value={slideTopics}
                onChange={(e) => setSlideTopics(e.target.value)} required />
            </li>
            <li className='left'>
              <label htmlFor="num_slides"></label>
              <input type="number" className="inputFields" id="num_slides" name="num_slides" placeholder="Number of slides" value={numSlides}
                onChange={(e) => setNumSlides(e.target.value)} max="12" required />
            </li>
            <li className='left'>
              <label htmlFor="file_upload"></label>
              <input type="file" className="inputFields" id="file_upload" name="file_upload" onChange={handleFileUpload} />
            </li>
            <li className='left'>
              <label htmlFor="template"></label>
              <select className="inputFields" id="template" name="template" value={template} onChange={(e) => setTemplate(e.target.value)} required>
                <option value="template_1">EY Template 1</option>
                <option value="template_2">EY Template 2</option>
                {uploadedFileName && <option value="uploaded_file">{uploadedFileName}</option>}
              </select>
            </li>
            <li id="center-btn" className='left'>
              <input type="submit" id="generate-btn" name="generate" alt="generate" value="Generate" onClick={ppt_gen} />
            </li>
          </ul>
        </form>
        {loading && <CircularProgress className="loading-spinner" />}
        {generatingMessage && <p>{generatingMessage}</p>}
        {downloadLink && (
          <a href={downloadLink} download>
            <button id="download-btn" className='left'>Download Presentation</button>
          </a>
        )}
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Generate;
