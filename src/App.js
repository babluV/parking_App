import React, { useState } from 'react';
import EmplyTable from './Components/EmplyTable';
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import './App.css';
import useViewCounter from './useViewCounter';


  function App() {
    const [initialData, setInitialData] = useState(undefined);
    const [currentSheet, setCurrentSheet] = useState({});
    const [generatedObjects, setGeneratedObjects] = useState([]);
  
    const handleUpload = (event) => {
      const file = event.target.files[0];
      readFile(file)
        .then((readedData) => setInitialData(readedData))
        .catch((error) => console.error(error));
    };
  
    const handleClick = () => {
      const result = generateObjects(currentSheet);
      setGeneratedObjects(result);
    };
  
    useViewCounter();
  return (
    <>
    
    <div className="App">
      
      <EmplyTable/>

      <div className='AppChild'>
      <input
        type='file'
        accept='.xlsx'
        onChange={handleUpload}
        id='upload'
        style={{ display: 'none' }}
      />
      <label htmlFor='upload'>
        <button
          className='custom-button'
          style={{padding:28,marginTop:20}}
          onClick={() => document.getElementById('upload').click()}
        >
          Choose your Excel file
        </button>
      </label>
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName=''
        reactExcelClassName='react-excel'
      />
      {initialData && (
        <button className='custom-button' onClick={handleClick}>
          Transform
        </button>
      )}
      {generatedObjects.length > 0 && (
        <textarea
          cols={70}
          rows={30}
          value={JSON.stringify(generatedObjects, null, 2)}
          readOnly
          className='text-area'
        />
      )}
    </div>
          </div>
     </>
  );
}

export default App;









