// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Pure Node JS Script

async function resetDatabase() {
  try {
    console.log('🗑️ Clearing webpage table...')

    // Delete all existing webpages
    const deleteResult = await prisma.webpage.deleteMany({})
    console.log(`✅ Deleted ${deleteResult.count} existing webpages`)

    // Reset the auto-increment sequence in PostgreSQL
    await prisma.$executeRaw`ALTER SEQUENCE webpages_id_seq RESTART WITH 1;`
    console.log(`✅ Reset ID sequence to start from 1`)

    console.log(`🌱 Database reset complete!`)
  } catch (error) {
    console.error('❌ Error resetting database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetDatabase()