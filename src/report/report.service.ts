import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto';

interface Report {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: string): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((report) => report.type == reportType)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: string, id: string): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const report = data.report
      .filter((report) => report.type == reportType)
      .find((report) => report.id === id);
    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(type: string, { amount, source }: Report): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const newReport = {
      id: uuid(),
      source,
      amount,
      create_at: new Date(),
      update_at: new Date(),
      type: reportType,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(type: string, id: string, body: Report): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data.report
      .filter((report) => report.type == reportType)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      update_at: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(type: string, id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportIndex = data.report
      .filter((report) => report.type == reportType)
      .findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
