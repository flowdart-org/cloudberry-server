import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtAuthMiddleware } from '@/common/middlewares/jwt-auth.middleware';
import { AuthModule } from '@/auth/auth.module';
import { PrismaAdminRepository } from '@/admin/repositories/prisma-admin.repository';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: 'AdminRepository',
      useClass: PrismaAdminRepository,
    },
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(JwtAuthMiddleware).forRoutes(AdminController);
  }
}
