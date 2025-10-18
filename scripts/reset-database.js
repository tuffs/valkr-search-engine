const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function resetDatabase() {
  try {
    console.log('🗑️  Clearing webpages table...')

    // Delete all existing webpages
    const deleteResult = await prisma.webpage.deleteMany({})
    console.log(`✅ Deleted ${deleteResult.count} existing webpages`)

    // Reset the auto-increment sequence (PostgreSQL)
    await prisma.$executeRaw`ALTER SEQUENCE webpages_id_seq RESTART WITH 1;`
    console.log('✅ Reset ID sequence to start from 1')

    console.log('🌱 Database reset complete!')

  } catch (error) {
    console.error('❌ Error resetting database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

resetDatabase()
