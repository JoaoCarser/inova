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
import { UsersProjectsModule } from './modules/users-projects/users-projects.module';
import { FilesModule } from './modules/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { EvaluationsModule } from './modules/evaluations/evaluations.module';
import { EditionsModule } from './modules/editions/editions.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    BasesModule,
    PeriodsModule,
    QuestionsModule,
    ProjectsModule,
    UsersProjectsModule,
    FilesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EvaluationsModule,
    EditionsModule,
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
