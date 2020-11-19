const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') })
const { runMigration } = require('contentful-migration/built/bin/cli')

const options = {
  spaceId: dotenv.parsed.CONTENTFUL_SPACE_ID,
  accessToken: dotenv.parsed.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  environmentId: dotenv.parsed.CONTENTFUL_MIGRATION_ENVIRONMENT,
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
