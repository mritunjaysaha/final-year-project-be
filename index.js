const { app } = require("./app");

// setting PORT
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
