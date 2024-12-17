<template>
    <div>
      <h2>Your Portfolio</h2>
      <ul>
        <li v-for="(file, index) in portfolioFiles" :key="index">
          {{ file.name }} - <a :href="file.url" target="_blank">View</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        portfolioFiles: [], // List of files
      };
    },
    mounted() {
      this.fetchPortfolio();
    },
    methods: {
      async fetchPortfolio() {
        try {
          const response = await fetch("http://localhost:3000/portfolio");
          if (response.ok) {
            this.portfolioFiles = await response.json();
          } else {
            alert("Failed to load portfolio.");
          }
        } catch (error) {
          console.error("Error fetching portfolio:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Basic styling */
  </style>
  