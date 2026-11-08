# Hospital Appointment API

A Node.js + Prisma CRUD module for the hospital appointment domain.

## Stack

- **Node.js** with TypeScript (ESM, `"type": "module"`)
- **Prisma 7.10.0** with `@prisma/adapter-pg` (PostgreSQL)
- **dotenv** for environment configuration

## Models

| Model | Table | Description |
|-------|-------|-------------|
| `Patient` | `patients` | Hospital patients |
| `Doctor` | `doctors` | Doctors with specialties |
| `Appointment` | `appointments` | Appointments linking patients and doctors |

## Setup

```bash
npm install
cp .env.example .env
# Edit .env and set DATABASE_URL
npx prisma db pull
npx prisma generate
```

## Running Tests

```bash
npx tsx src/test.ts
```

## Seeding

```bash
npx tsx src/seed.ts
```

## CRUD Functions

### Patients (`src/patients.ts`)
- `createPatient(data)` — Create a new patient
- `getPatient(id)` — Get patient by ID
- `searchPatients(nameQuery)` — Case-insensitive partial name search
- `updatePatientPhone(id, phone)` — Update phone number
- `deletePatient(id)` — Delete patient

### Doctors (`src/doctors.ts`)
- `createDoctor(data)` — Create a new doctor
- `getDoctor(id)` — Get doctor by ID
- `listDoctorsBySpecialty(specialty)` — List doctors by specialty
- `deleteDoctor(id)` — Delete doctor

### Appointments (`src/appointments.ts`)
- `bookAppointment(data)` — Book appointment with `connect` + `include`
- `getAppointmentFull(id)` — Get appointment with patient and doctor
- `getDoctorAppointments(doctorId)` — All appointments for a doctor
- `cancelAppointment(id)` — Cancel/delete an appointment
