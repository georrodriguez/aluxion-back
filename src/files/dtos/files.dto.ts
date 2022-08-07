import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  /* @ApiProperty()
  @IsMongoId()
  readonly userId: string; */
}

export class UpdateFileDto extends PartialType(CreateFileDto) {}
