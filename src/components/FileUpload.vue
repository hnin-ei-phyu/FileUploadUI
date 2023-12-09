<template>
    <div id="app" class="container">
        
        <h1>Upload File and Read Data</h1>
        <ul>
          <li><input type="file" @change="handleFileChange" /></li>
          <li><button @click="uploadFile">Upload File</button></li>  
          <li><button @click="makePDF">Download PDF</button></li>
        </ul>
        
        <div id="to-print" class="mt-4">

          <div>
              <h2>WTAU A700 Data Log Report</h2>
                <table class="table1" border="1">
                    <tr>
                      <td>Project</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>Crane Manage</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>Manufacture</td>
                      <td>U.STATED</td>
                    </tr>
                    <tr>
                      <td>Crane Mode</td>
                      <td>L5126H-2</td>
                    </tr>
                    <tr>
                      <td>Crane Serial Number</td>
                      <td>J2JO-3796</td>
                    </tr>
                    <tr>
                      <td>Crane Type</td>
                      <td>CRAWLER</td>
                    </tr>
                    <tr>
                      <td>LM Certificate</td>
                      <td>2751128</td>
                    </tr>
                    <tr>
                      <td>Date Logger S/N</td>
                      <td>WT170600046</td>
                    </tr>
                    <tr>
                      <td>Install Date</td>
                      <td>20170523</td>
                    </tr>
                </table>
          </div>

          <div v-if="sequenceInfo.length > 0">
              <h2>ATB_Status Summary Report</h2>
              <table  class="table2" border="1">
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

          <div v-if="oldData.length > 0">
              <h2>Original Data</h2>
              <table class="table3" border="1">
                <thead>
                    <tr class="header">
                      <th>Timestamp</th>
                      <th>ATB</th>
                      <th>BoomLength</th>
                      <th>BoomOverHoist</th>
                      <th>Bypass</th>
                      <th>Config</th>
                      <th>MainAngle</th>
                      <th>MainLoad</th>
                      <th>Overload</th>
                      <th>Radius</th>
                      <th>SWL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(origindata, index) in oldData" :key="index">
                      <td>{{ origindata.Timestamp }}</td>
                      <td>{{ origindata.ATB_Status }}</td>
                      <td>{{ origindata.BoomLength }}</td>
                      <td>{{ origindata.BoomOverHoist_Status }}</td>
                      <td>{{ origindata.Bypass_Status }}</td>
                      <td>{{ origindata.Config }}</td>
                      <td>{{ origindata.MainAngle }}</td>
                      <td>{{ origindata.MainLoad }}</td>
                      <td>{{ origindata.Overload_Status }}</td>
                      <td>{{ origindata.Radius }}</td>
                      <td>{{ origindata.SWL }}</td>
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
          totalTime: null,
          oldData: []
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
            this.totalTime = result.data.TotalTime;
            this.oldData = result.data.oldData;
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

  li button,input{
    background-color: skyblue;
    padding: 5px;
    border-radius: 3px;
    border-color: skyblue;
  }
  ul{
    display: flex;
    list-style-type: none;
    justify-content: center;
    background-color: rgb(233, 255, 255);
    padding: 50px;
  }
  ul li{
    padding-right: 100px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    border: 1px solid rgb(5, 5, 6);
  }
  
  .total td {
    font-weight: 600;
    background-color: rgb(211, 250, 237);
  }
  
  th, td {
    padding: 8px;
    text-align: center;
  }

  .table1 {
    background-color: rgb(219, 249, 249);
    text-align: center;
  }
  .table2 {
    background-color: rgb(225, 252, 243);
  }
  </style>