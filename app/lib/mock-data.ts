export const students = [
  { id: "stu_1", name: "Maya Patel", grade: "8th Grade", email: "maya@owldesk.test", subjects: ["Math", "Science"], status: "ACTIVE", assignedTutor: "Jordan Lee", sessions: 8, balance: 180 },
  { id: "stu_2", name: "Ethan Brooks", grade: "11th Grade", email: "ethan@owldesk.test", subjects: ["Physics", "Calculus"], status: "ACTIVE", assignedTutor: "Amara Chen", sessions: 5, balance: 90 },
  { id: "stu_3", name: "Sophia Ramirez", grade: "5th Grade", email: "sophia@owldesk.test", subjects: ["Reading"], status: "PAUSED", assignedTutor: "Jordan Lee", sessions: 3, balance: 0 },
];

export const tutors = [
  { id: "tut_1", name: "Jordan Lee", email: "jordan@owldesk.test", subjects: ["Math", "Reading"], ratePerHr: 55, sessionCount: 14, monthlyEarnings: 770 },
  { id: "tut_2", name: "Amara Chen", email: "amara@owldesk.test", subjects: ["Physics", "Calculus", "Chemistry"], ratePerHr: 68, sessionCount: 11, monthlyEarnings: 1122 },
  { id: "tut_3", name: "Noah Turner", email: "noah@owldesk.test", subjects: ["Writing", "History"], ratePerHr: 50, sessionCount: 6, monthlyEarnings: 420 },
];

export const sessions = [
  { id: "ses_1", studentId: "stu_1", student: "Maya Patel", tutorId: "tut_1", tutor: "Jordan Lee", subject: "Math", date: "2026-03-20T15:30:00.000Z", duration: 60, status: "SCHEDULED", paymentStatus: "PENDING", amount: 55 },
  { id: "ses_2", studentId: "stu_2", student: "Ethan Brooks", tutorId: "tut_2", tutor: "Amara Chen", subject: "Physics", date: "2026-03-20T18:00:00.000Z", duration: 90, status: "COMPLETED", paymentStatus: "PAID", amount: 102 },
  { id: "ses_3", studentId: "stu_3", student: "Sophia Ramirez", tutorId: "tut_1", tutor: "Jordan Lee", subject: "Reading", date: "2026-03-23T14:00:00.000Z", duration: 45, status: "SCHEDULED", paymentStatus: "UNPAID", amount: 41 },
  { id: "ses_4", studentId: "stu_1", student: "Maya Patel", tutorId: "tut_2", tutor: "Amara Chen", subject: "Science", date: "2026-03-27T16:00:00.000Z", duration: 60, status: "CANCELLED", paymentStatus: "OVERDUE", amount: 55 },
];

export const payments = [
  { id: "pay_1", sessionId: "ses_1", student: "Maya Patel", amount: 55, status: "PENDING", dueDate: "2026-03-21T00:00:00.000Z" },
  { id: "pay_2", sessionId: "ses_2", student: "Ethan Brooks", amount: 102, status: "PAID", dueDate: "2026-03-19T00:00:00.000Z" },
  { id: "pay_3", sessionId: "ses_3", student: "Sophia Ramirez", amount: 41, status: "UNPAID", dueDate: "2026-03-24T00:00:00.000Z" },
  { id: "pay_4", sessionId: "ses_4", student: "Maya Patel", amount: 55, status: "OVERDUE", dueDate: "2026-03-18T00:00:00.000Z" },
];
