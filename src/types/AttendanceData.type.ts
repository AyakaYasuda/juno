import { IAttendanceReqBody } from './AttendanceReqBody.type';

export interface IAttendanceData {
  eventId: string;
  attendanceReqBody: IAttendanceReqBody;
}
