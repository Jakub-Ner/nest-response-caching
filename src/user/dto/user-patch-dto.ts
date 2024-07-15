import { ApiProperty } from "@nestjs/swagger";

export class UserPatchDto {
  @ApiProperty()
  newUsername: string;
}