import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { BasesModule } from './modules/bases/bases.module';
import { PeriodsModule } from './modules/periods/periods.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    BasesModule,
    PeriodsModule,
    QuestionsModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
