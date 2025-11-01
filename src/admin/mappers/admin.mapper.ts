import { Admin as PrismaAdmin } from '@prisma/client';
import { Admin } from '@/admin/entities/admin.entity';

export const AdminMapper = {
  toEntity(prismaAdmin: PrismaAdmin): Admin {
    return new Admin(
      prismaAdmin.id,
      prismaAdmin.name,
      prismaAdmin.email,
      prismaAdmin.password,
      prismaAdmin.createdAt,
      prismaAdmin.updatedAt,
    );
  },

  toPersistence(
    admin: Pick<Admin, 'name' | 'email' | 'password'>,
  ): Pick<PrismaAdmin, 'name' | 'email' | 'password'> {
    return {
      name: admin.name,
      email: admin.email,
      password: admin.password,
    };
  },
};
