import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [CommonModule],
})
export class FilmsModule {}
