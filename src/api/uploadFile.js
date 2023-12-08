import axios from 'axios';

class UploadFile {

    constructor() {

    }

    async uploadfile(formData) {
        let result = await axios.post('http://localhost:3000/api/uploadFile/upload',formData, {headers: { "Content-Type": "multipart/form-data"}})
        console.log(result)
        return result
    }

}

export default UploadFile