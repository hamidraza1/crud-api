import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepositiory: Repository<Report>,
  ) {}

  public create(createReportDto: CreateReportDto) {
    const report = this.reportRepositiory.create(createReportDto);
    return this.reportRepositiory.save(report);
  }

  public find() {
    return this.reportRepositiory.find();
  }
}
