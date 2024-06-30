import { IsBoolean, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Length(5, 30)
  title: string;

  @IsOptional()
  @Length(0, 80)
  description?: string;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;

  @IsNotEmpty()
  @Length(3, 30)
  category: string;
}
