<template>
  <div>
    <form @submit.prevent="handleFileUpload">
      <input type="file" @change="handleFileChange" />
      <button type="submit">Upload</button>
    </form>

    <div v-if="uploadStatus">
      <p>{{ uploadStatus }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      uploadStatus: '',
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    async handleFileUpload() {
      if (!this.selectedFile) {
        this.uploadStatus = 'Please select a file first.';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        this.uploadStatus = 'Uploading...';

        const response = await axios.post('https://studpms.onrender.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          this.uploadStatus = `File uploaded successfully! File ID: ${response.data.fileId}`;
        } else {
          this.uploadStatus = 'File upload failed!';
        }
      } catch (error) {
        console.log('Error uploading file:', error.response ? error.response.data : error.message);
        this.uploadStatus = 'An error occurred while uploading the file.';
      }
    },
  },
};
</script>
