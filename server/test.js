const mongoose = require("mongoose");

const uri =
  "mongodb+srv://newsMonkey:Jain2004@cluster0.fvv1hln.mongodb.net/newsmonkey?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });