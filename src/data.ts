export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    create_at: Date;
    update_at: Date;
    type: ReportType;
  }[];
}
export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 7500,
      create_at: new Date(),
      update_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid2',
      source: 'Youtube',
      amount: 2500,
      create_at: new Date(),
      update_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid3',
      source: 'Food',
      amount: 500,
      create_at: new Date(),
      update_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};
