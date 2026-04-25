import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

function createExtendedClient(prisma: PrismaClient) {
    return prisma.$extends({
        query: {
            vehicleUser: {
                async create({ args, query }) {
                    const result = await query(args);
                    await (prisma as any).vehicleUserRecord.create({
                        data: {
                            vehicleUserId: result.id,
                            vehicleId: result.vehicleId,
                            userId: result.userId,
                            type: result.type,
                        },
                    });
                    return result;
                },
            },
        },
    });
}

export type ExtendedPrismaClient = ReturnType<typeof createExtendedClient>;

@Injectable()
export class PrismaRemoteRepository extends PrismaClient implements OnModuleInit {
    readonly extended: ExtendedPrismaClient;

    constructor() {
        super();
        this.extended = createExtendedClient(this);
    }

    async onModuleInit() {
        await this.$connect();
    }
}