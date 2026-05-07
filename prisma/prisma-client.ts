import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

//prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza18wYTF5MjFvMkpjbDRZRV9OeGRpckkiLCJhcGlfa2V5IjoiMDFLTVpCUkhZQVJIUTM3MVNZU1BOQTBOU1kiLCJ0ZW5hbnRfaWQiOiIzMTYzNjAyZTllMGUxYWRiYjU0NTQwN2VlOWMxZTQ5MjNiYTU2NGEyMDM4MmY5NjgwZmQyZTA5NTFiYzI3ZDVkIiwiaW50ZXJuYWxfc2VjcmV0IjoiMGU3ZWU1MGQtMjliMy00ODdhLThhZjItN2I2MGRiMDY2ZWFiIn0.3gtXdJ8hVEZSF3obZwrXRMdraBu-iL3UQKYhCRWbk2Q