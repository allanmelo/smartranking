import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PlayersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URI,
      { useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false }),
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
