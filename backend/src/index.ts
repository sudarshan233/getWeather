import dotenv from 'dotenv';

import app from "./server";

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, (error) =>
{
    if (error) console.error(error);

    console.log("Server running on port: " + PORT);
});
