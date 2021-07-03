const { app, port } = require("./app");

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
});
