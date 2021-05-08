app.use('/api',require("./routes/index" ))
app.use('/api',require("./routes/todo"))
app.use('/api', require("./routes/ninja"))
app.use('/api/users', require("./routes/user"))