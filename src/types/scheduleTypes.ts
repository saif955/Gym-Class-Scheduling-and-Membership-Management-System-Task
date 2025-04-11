export interface ClassScheduleRequestBody {
    trainerId: string;
    className: string;
    description: string;
    date: string;
    startTime: string;
    maxParticipants: number;
}