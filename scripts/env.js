import * as fs from 'fs'

const templatePath = '.env.template'
const envPath = '.env'

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(templatePath, envPath)
  console.log('.env file created from .env.template.')
} else {
  console.log('.env file already exists.')
}
