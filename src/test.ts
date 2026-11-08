import { prisma } from "./lib/prisma.js";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients.js";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors.js";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorAppointments,
  cancelAppointment,
} from "./appointments.js";

async function main() {
  console.log("--- Patients ---");

  const patient = await createPatient({
    name: "Carol White",
    phone: "555-2001",
    dateOfBirth: new Date("1992-07-04"),
  });
  console.log("Created patient:", patient);

  const fetched = await getPatient(patient.id);
  console.log("Fetched patient:", fetched);

  const results = await searchPatients("carol");
  console.log("Search 'carol':", results);

  const updated = await updatePatientPhone(patient.id, "555-9999");
  console.log("Updated phone:", updated);

  console.log("\n--- Doctors ---");

  const doctor = await createDoctor({
    name: "Dr. Susan Lee",
    specialty: "Cardiology",
  });
  console.log("Created doctor:", doctor);

  const fetchedDoc = await getDoctor(doctor.id);
  console.log("Fetched doctor:", fetchedDoc);

  const cardiologists = await listDoctorsBySpecialty("Cardiology");
  console.log("Cardiologists:", cardiologists);

  console.log("\n--- Appointments ---");

  const appt = await bookAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date("2025-03-15T10:00:00Z"),
  });
  console.log("Booked appointment:", appt);

  const fullAppt = await getAppointmentFull(appt.id);
  console.log("Full appointment:", fullAppt);

  const docAppts = await getDoctorAppointments(doctor.id);
  console.log("Doctor appointments:", docAppts);

  await cancelAppointment(appt.id);
  console.log("Cancelled appointment:", appt.id);

  // Cleanup
  await deletePatient(patient.id);
  await deleteDoctor(doctor.id);

  console.log("\n✅ All CRUD operations completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
