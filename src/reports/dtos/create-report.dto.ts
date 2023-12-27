import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  //these are the class validators(Validation pipe), to validate the incoming data from client, before its business logic is handeled

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2023)
  year: number;

  @IsLongitude()
  lang: string;

  @IsLatitude()
  lat: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: string;

  @IsNumber()
  @Min(0)
  price: string;
}
