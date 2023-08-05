import app from "../app.js";

const port: number | string = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
