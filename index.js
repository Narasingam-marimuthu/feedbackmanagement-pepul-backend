const express = require("express");
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();
const port = process.env.PORT || 3001;
const cors = require("cors");
const multer = require("./multer");
const { logMiddleware, trackingMiddleware } = require("./middleware");
const path = require("path");


app.use(cors()); 
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
// app.use(multer.any());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(logMiddleware); 
app.use(trackingMiddleware); 



app.use("/api/feedbacks", require("./routes/feedbackroutes"));  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
