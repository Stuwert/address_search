import { createConnection } from "typeorm";
import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await createConnection();
  console.log(`StreetAddress App listening at http://localhost:${port}`);
});
