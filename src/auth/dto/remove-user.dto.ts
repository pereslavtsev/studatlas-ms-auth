import { IsString } from 'class-validator';

export class RemoveUserDto {
  @IsString()
  id: string;
}
