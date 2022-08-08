import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ForgotPassword {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
