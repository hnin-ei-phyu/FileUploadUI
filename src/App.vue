<template>
  <div>
    <h1>Upload File Here</h1>
    <form action="uploadFile">
      <input 
        type="file"
        ><br><br>
      <button type="submit">upload</button>
    </form>
  </div>
</template>

<script>
import UF from "./api/uploadFile.ts"
export default {
  name: 'App',
  data : function() {
    return {
       loading : false,
       file: null,
       TotalATB_Status : null,
       sequenceInfo : [],

    }
  },
  methods: {
    uploadFile : async function() {
      this.loading = true;
      let fileData = {
        file : this.file
      }

      try {
        
        let uploadfile = new UF()
        let result = uploadfile.uploadfile(fileData)
        this.sequenceInfo = result.data
        console.log(result.data)
      } catch (error) {
        console.log("Error :",error);
      }
      this.loading = false;
    }
  }

}
</script>