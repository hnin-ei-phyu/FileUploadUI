import axios from 'axios';

class UF {
    root: string = "http://localhost:3000/api/uploadFile";

    constructor() {

    }

    async uploadfile(fileData: File) {
        let headers: any = {}
        try {
            let result = await axios.post(`${this.root}/upload`,fileData,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

}

export default UF