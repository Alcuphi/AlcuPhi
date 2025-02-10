/*
    alcuφ server
    ©2025 alcuφ. Open source under the CC0 v1 license.
*/
// Imports
import chalk from 'chalk';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

// Constants
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== "production"
const app = next({dev})
const handle = app.getRequestHandler()


// Console!
console.clear()
console.log(chalk.redBright("alcuφ server") + "\n" + chalk.cyanBright(`©${new Date().getFullYear()} alcuφ. Open source under the CC0 v1 license.`));
console.log("-".repeat(50) + "\n");
if (!dev) {
    console.log(chalk.blueBright("🏗️ Building server..."))   
}
console.log(chalk.yellowBright("🟡 Starting server..."))

// App server
app.prepare().then(() => {
  createServer((req,res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req,res, parsedUrl)
  }).listen(port)
  console.log(chalk.greenBright(`✅ Server has started and is running at http://localhost:${port} in ${dev ? "development mode" : process.env.NODE_ENV + "mode"}.`))
})

