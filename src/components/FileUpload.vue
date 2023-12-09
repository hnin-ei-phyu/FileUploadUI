<template>
    <div id="app" class="container">
        
        <h1>Upload File and Read Data</h1>
        <ul>
          <li><input type="file" @change="handleFileChange" /></li>
          <li><button @click="uploadFile">Upload File</button></li>  
          <li><button @click="makePDF">Download PDF</button></li>
        </ul>
        
        <div id="to-print" class="mt-4">
          <div v-if="sequenceInfo.length > 0">
              <h2>ATB_Status Summary Report</h2>
              <table>
                <thead>
                    <tr class="title">
                      <th>Sequence</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="time" v-for="(sequence, index) in sequenceInfo" :key="index">
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
  
    </div>

  </template>
  
  
  
  <script>
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

        makePDF: function() {
            this.$htmlToPaper("to-print");
        }
      },
    };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  #app {
      text-align: center;
      padding:0px 100px 100px 100px;
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
    padding: 8px 0px 8px 0px;
    text-align: center;
  }
  th {
    background-color: #e5fcfc;
  }
  li button,input{
    background-color: skyblue;
    padding: 10px;
    border-radius: 5px;
    border-color: skyblue;
  }
  ul{
    display: flex;
    list-style-type: none;
    justify-content: center;
  }
  ul li{
    padding: 100px;
    background-color: rgb(233, 255, 255);
  }
  </style>