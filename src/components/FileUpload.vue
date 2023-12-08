<template>
    <div id="app" class="container">
        <div class="row">
            <h1>File Upload and Data Fetching</h1>
            <input type="file" @change="handleFileChange" /> <br><br>
            <button @click="uploadFile" class="btn">Upload File</button>
        </div>

        <div class="button">
            <button @click="makePDF">Download PDF</button>
        </div>
        
        <div v-if="sequenceInfo.length > 0">
            <h2>ATB_Status Summary Report</h2>
            <table border="1">
            <thead>
                <tr>
                <th>Sequence</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sequence, index) in sequenceInfo" :key="index">
                <td>{{ sequence.sequence }}</td>
                <td>{{ sequence.startTime }}</td>
                <td>{{ sequence.endTime }}</td>
                <td>{{ sequence.duration}} minutes</td>
                </tr>
                <tr class="total">
                <td>Total ATB_Status Count times:</td>
                <td>{{ TotalATB_Status }} times</td>
                <td>ATB_Status Total Duration:</td>
                <td>{{ totalTime }} minutes</td>
                </tr>
            </tbody>
            </table>
        </div>
  
    </div>

  </template>
  
  
  
  <script>
    import html2canvas from 'html2canvas';
    import jsPDF from 'jspdf';
    import UploadFile from '../api/uploadFile.js';
  export default {
    data() {
      return {
        file: null,
        sequenceInfo: [],
        TotalATB_Status: null,
        totalTime: null
      };
    },
    methods: {
      handleFileChange(event) {
        this.file = event.target.files[0];
      },

      async uploadFile() {
        try {
          const formData = new FormData();
          formData.append("file", this.file);
  
          let uploadfile = new UploadFile()
          let result = await uploadfile.uploadfile(formData)
  
          this.sequenceInfo = result.data.sequenceInfo;
          this.TotalATB_Status = result.data.TotalATB_Status;
          this.totalTime = result.data.TotalTime
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      },

      makePDF () {
        window.html2canvas = html2canvas;
        var doc = new jsPDF("p","pt","a3");
        doc.html(document.querySelector("#app"), {
            callback: function(pdf) {
                pdf.save("mypdf.pdf");
            }
        });
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  #app {
      margin-left: 40px;
      text-align: center;
      height: 11in;  
      width: 8in;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  
  .total td {
    font-weight: 600;
    background-color: rgb(213, 250, 250);
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #e5fcfc;
  }
  .btn{
    background-color: skyblue;
    padding: 10px;
    border-radius: 5px;
    border-color: skyblue;
  }
  .button{
    padding-top: 8px;
    border-radius: 5px;
    text-align: right;
  }
  .row{
    text-align: center;
  }
  </style>