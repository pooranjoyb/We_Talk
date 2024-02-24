const express = require("express");

const app = express();

app.get('/' , (req, res) => {
  console.log("Server Running Smoothly")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
