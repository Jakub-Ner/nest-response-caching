import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty()
  userId: string;
}
