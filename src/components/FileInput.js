import React, { Component } from 'react'
import CSVReader from 'react-csv-reader'
 
const FileInput = ({ onChangeFile }) => {

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
  }

  return (
    // <CSVReader fileEncoding="EUC-KR" onFileLoaded={data => onChangeFile(data)} parserOptions={papaparseOptions} />
    <CSVReader onFileLoaded={data => onChangeFile(data)} parserOptions={papaparseOptions} />
  )
}

export default FileInput;