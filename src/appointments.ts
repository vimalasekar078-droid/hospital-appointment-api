import { prisma } from "./lib/prisma.js";
import type { Appointment, Patient, Doctor } from "../../generated/prisma/client.js";

type AppointmentFull = Appointment & {
  Patient: Patient;
  Doctor: Doctor;
};

// Book a new appointment
export async function bookAppointment(data: {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
}): Promise<AppointmentFull> {
  return prisma.appointment.create({
    data: {
      Patient: { connect: { id: data.patientId } },
      Doctor: { connect: { id: data.doctorId } },
      appointmentDate: data.appointmentDate,
    },
    include: {
      Patient: true,
      Doctor: true,
    },
  });
}

// Get a full appointment by ID (includes patient and doctor)
export async function getAppointmentFull(
  id: number
): Promise<AppointmentFull | null> {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      Patient: true,
      Doctor: true,
    },
  });
}

// Get all appointments for a specific doctor
export async function getDoctorAppointments(
  doctorId: number
): Promise<AppointmentFull[]> {
  return prisma.appointment.findMany({
    where: { doctorId },
    include: {
      Patient: true,
      Doctor: true,
    },
    orderBy: { appointmentDate: "asc" },
  });
}

// Cancel (delete) an appointment by ID
export async function cancelAppointment(id: number): Promise<Appointment> {
  return prisma.appointment.delete({
    where: { id },
  });
}
