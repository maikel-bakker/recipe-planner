const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })
const fs = require('fs')
const { runMigration } = require('contentful-migration/built/bin/cli')

const options = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  environmentId: process.env.CONTENTFUL_MIGRATION_ENVIRONMENT,
  yes: true
}

;(async function runMigrations () {
  const migrationsFolder = path.join(__dirname, './migrations')
  const migrationFiles = fs.readdirSync(migrationsFolder)
    .map((file) => path.join(migrationsFolder, file))

  for (const filePath of migrationFiles) {
    await runMigration({ ...options, filePath })
  }
})()
