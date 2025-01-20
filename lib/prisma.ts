import { PrismaClient } from '@prisma/client'

declare global {
    // hold instance of PrismaClient
    var prisma: PrismaClient | undefined;
}

// @ts-ignore: Props data will be handled dynamically
let prisma: any;
if(process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
}else{
    if(!global.prisma){
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}
export default prisma;
