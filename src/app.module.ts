import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { ConfigModule } from 'nestjs-config';
import { modifyConfigName } from './shared/utils/modify-config-name.util';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '**/!(*.d).config.{ts,js}'), {
      modifyConfigName,
    }),
    SharedModule,
    AuthModule,
  ],
})
export class AppModule {}
