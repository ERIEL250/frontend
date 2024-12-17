<template>
  <div class="portfolio-upload">
    <h2>Portfolio Upload</h2>

    <div class="upload-section">
      <input type="text" v-model="portfolioName" placeholder="Portfolio Name" />
      <input type="file" @change="handleFileChange" />
      <button @click="uploadPortfolio">Upload Portfolio</button>
    </div>

    <div v-if="message" class="message">{{ message }}</div>

    <h3>Uploaded Portfolios</h3>
    <ul>
      <li v-for="(file, index) in uploadedFiles" :key="index">
        <a :href="file.webViewLink" target="_blank">{{ file.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      portfolioName: '',
      selectedFile: null,
      uploadedFiles: [],
      message: '',
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadPortfolio() {
      if (!this.portfolioName || !this.selectedFile) {
        this.message = 'Please enter a portfolio name and select a file';
        return;
      }

      const formData = new FormData();
      formData.append('portfolioName', this.portfolioName);
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post('/api/portfolio/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.message = 'File uploaded successfully!';
        this.uploadedFiles.push(response.data.file); // Add file to uploaded files list
      } catch (error) {
        this.message = 'File upload failed.';
        console.error(error);
      }
    },
    async fetchPortfolios() {
      try {
        const response = await axios.get('/api/portfolio/list');
        this.uploadedFiles = response.data.files;
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      }
    },
  },
  mounted() {
    this.fetchPortfolios();
  },
};
</script>

<style scoped>
.portfolio-upload {
  padding: 20px;
}
.message {
  color: green;
}
</style>
