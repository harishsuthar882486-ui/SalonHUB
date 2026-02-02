export interface SalonService {
  id: string;
  "name": string;
  "price": number;
  "durationMin": number;
}

export interface Staff {
  "id": string;
  "name": string;
  "email": string;
  "skills": string[];
  "active": boolean;
}

export interface SalonsDatatype {
  _id: string;
  "key": string;
  "salonName": string;
  "salonEmail": string;
  "salonContact": string;
  "salonServices": number;
  "salonStaff": number;
  "salAdmName": string;
  "salAdmEmail": string;
  "salAdmContact": string;
  "city": string;
  "status": "Open" | "Closed";
  "category": "Unisex" | "Man" | "Woman" | "Spa" | "Beauty Parler";
  "services": SalonService[];
  "staffs": Staff[];
  "fullAddress": string;
}

// export const SalonDetails: SalonsDatatype[] = [
//   {
//     "key": "s1",
//     "salAdmName": "Amit Kapoor",
//     "salAdmEmail": "admin@glamourstudios.com",
//     "salAdmContact": "+91 85249 35687",
//     "salonName": "Glamour Studios",
//     "salonEmail": "contact@glamourstudios.com",
//     "salonContact": "+91 98765 43210",
//     "city": "Mumbai",
//     "status": "Open",
//     "category": "Unisex",
//     "services": [
//       { "id": "s1-1", "name": "Haircut", "price": 350, "durationMin": 45, },
//       { "id": "s1-2", "name": "Hair Coloring", "price": 1200, "durationMin": 45, },
//       { "id": "s1-3", "name": "Facial", "price": 800, "durationMin": 45, },
//       { "id": "s1-4", "name": "Manicure", "price": 500, "durationMin": 45, },
//       { "id": "s1-5", "name": "Pedicure", "price": 700, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF1-1", "name": "Sarah Johnson", "email": "sarah@glamourstudios.com", "skills": ["Haircut", "Hair Coloring", "Manicure"], "active": true},
//       { "id": "STF1-2", "name": "Mike Davis", "email": "mike@glamourstudios.com", "skills": ["Haircut", "Pedicure"],  "active": true},
//       { "id": "STF1-3", "name": "Emily Chen", "email": "emily@glamourstudios.com", "skills": ["Manicure", "Facial", "Pedicure"],  "active": true},
//       { "id": "STF1-4", "name": "Riya Deshmukh", "email": "riya@glamourstudios.com", "skills": ["Haircut", "Hair Coloring", "Facial"],  "active": true},
//     ],
//     "salonServices": 5,
//     "salonStaff": 4,
//   },
//   {
//     "key": "s2",
//     "salAdmName": "Amit Sharma",
//     "salAdmEmail": "admin@elitehair.com",
//     "salAdmContact": "+91 87654 32109",
//     "salonName": "Elite Hair & Beauty",
//     "salonEmail": "contact@elitehair.com",
//     "salonContact": "+91 91234 56789",
//     "city": "Delhi",
//     "status": "Closed",
//     "category": "Man",
//     "services": [
//       { "id": "s2-1", "name": "Haircut", "price": 250, "durationMin": 45, },
//       { "id": "s2-2", "name": "Beard Trim", "price": 150, "durationMin": 45, },
//       { "id": "s2-3", "name": "Hair Styling", "price": 300, "durationMin": 45, },
//       { "id": "s2-4", "name": "Head Massage", "price": 250, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF2-1", "name": "Raj Malhotra", "email": "raj@elitehair.com", "skills": ["Haircut", "Hair Styling", "Beard Trim"],  "active": true},
//       { "id": "STF2-2", "name": "Arjun Meena", "email": "arjun@elitehair.com", "skills": ["Head Massage", "Beard Trim", "Haircut"], "active": true},
//     ],
//     "salonServices": 4,
//     "salonStaff": 2,
//   },
//   {
//     "key": "s3",
//     "salAdmName": "Priya Verma",
//     "salAdmEmail": "admin@urbancuts.com",
//     "salAdmContact": "+91 88990 11223",
//     "salonName": "Urban Cuts & Colors",
//     "salonEmail": "hello@urbancuts.com",
//     "salonContact": "+91 99887 76655",
//     "city": "Bengaluru",
//     "status": "Open",
//     "category": "Woman",
//     "services": [
//       { "id": "s3-1", "name": "Haircut", "price": 450, "durationMin": 45, },
//       { "id": "s3-2", "name": "Hair Spa", "price": 900, "durationMin": 45, },
//       { "id": "s3-3", "name": "Facial", "price": 1000, "durationMin": 45, },
//       { "id": "s3-4", "name": "Threading", "price": 120, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF3-1", "name": "Nisha Rao", "email": "nisha@urbancuts.com", "skills": ["Haircut", "Hair Spa"],  "active": true},
//       { "id": "STF3-2", "name": "Meera Kulkarni", "email": "meera@urbancuts.com", "skills": ["Facial", "Threading"],  "active": true},
//       { "id": "STF3-3", "name": "Anaya Singh", "email": "anaya@urbancuts.com", "skills": ["Haircut", "Facial", "Threading"],  "active": true},
//     ],
//     "salonServices": 4,
//     "salonStaff": 3,
//   },
//   {
//     "key": "s4",
//     "salAdmName": "Rohit Malhotra",
//     "salAdmEmail": "admin@luxelocks.com",
//     "salAdmContact": "+91 90123 45678",
//     "salonName": "Luxe Locks Salon",
//     "salonEmail": "info@luxelocks.com",
//     "salonContact": "+91 90123 45678",
//     "city": "Hyderabad",
//     "status": "Open",
//     "category": "Spa",
//     "services": [
//       { "id": "s4-1", "name": "Body Massage", "price": 1600, "durationMin": 45, },
//       { "id": "s4-2", "name": "Aromatherapy", "price": 2200, "durationMin": 45, },
//       { "id": "s4-3", "name": "Facial", "price": 1400, "durationMin": 45, },
//       { "id": "s4-4", "name": "Steam Bath", "price": 800, "durationMin": 45, },
//       { "id": "s4-5", "name": "Relaxation Therapy", "price": 2000, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF4-1", "name": "Kabir Nair", "email": "kabir@luxelocks.com", "skills": ["Body Massage", "Relaxation Therapy"], "active": true},
//       { "id": "STF4-2", "name": "Ishita Menon", "email": "ishita@luxelocks.com", "skills": ["Aromatherapy", "Relaxation Therapy"], "active": true },
//       { "id": "STF4-3", "name": "Neha Joshi", "email": "neha@luxelocks.com", "skills": ["Facial", "Steam Bath"], "active": true },
//       { "id": "STF4-4", "name": "Siddharth Das", "email": "siddharth@luxelocks.com", "skills": ["Body Massage", "Steam Bath", "Aromatherapy"], "active": true },
//     ],
//     "salonServices": 5,
//     "salonStaff": 4,
//   },
//   {
//     "key": "s5",
//     "salAdmName": "Sneha Iyer",
//     "salAdmEmail": "admin@thebeautybar.com",
//     "salAdmContact": "+91 90909 09090",
//     "salonName": "The Beauty Bar",
//     "salonEmail": "support@thebeautybar.com",
//     "salonContact": "+91 90909 09090",
//     "city": "Chennai",
//     "status": "Open",
//     "category": "Beauty Parler",
//     "services": [
//       { "id": "s5-1", "name": "Facial", "price": 900, "durationMin": 45, },
//       { "id": "s5-2", "name": "Manicure", "price": 500, "durationMin": 45, },
//       { "id": "s5-3", "name": "Pedicure", "price": 700, "durationMin": 45, },
//       { "id": "s5-4", "name": "Waxing", "price": 600, "durationMin": 45, },
//       { "id": "s5-5", "name": "Cleanup", "price": 400, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF5-1", "name": "Divya Iyer", "email": "divya@thebeautybar.com", "skills": ["Facial", "Cleanup"], "active": true },
//       { "id": "STF5-2", "name": "Sana Khan", "email": "sana@thebeautybar.com", "skills": ["Waxing", "Cleanup"], "active": true },
//       { "id": "STF5-3", "name": "Pavitra N", "email": "pavitra@thebeautybar.com", "skills": ["Manicure", "Pedicure"], "active": true },
//       { "id": "STF5-4", "name": "Hema R", "email": "hema@thebeautybar.com", "skills": ["Facial", "Waxing", "Manicure"], "active": true },
//     ],
//     "salonServices": 5,
//     "salonStaff": 4,
//   },
//   {
//     "key": "s6",
//     "salAdmName": "Karan Mehta",
//     "salAdmEmail": "admin@chicshine.com",
//     "salAdmContact": "+91 93456 78123",
//     "salonName": "Chic & Shine",
//     "salonEmail": "hello@chicshine.com",
//     "salonContact": "+91 93456 78123",
//     "city": "Pune",
//     "status": "Closed",
//     "category": "Unisex",
//     "services": [
//       { "id": "s6-1", "name": "Haircut", "price": 300, "durationMin": 45, },
//       { "id": "s6-2", "name": "Hair Styling", "price": 350, "durationMin": 45, },
//       { "id": "s6-3", "name": "Head Massage", "price": 250, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF6-1", "name": "Vikas Kulkarni", "email": "vikas@chicshine.com", "skills": ["Haircut", "Hair Styling"], "active": true },
//       { "id": "STF6-2", "name": "Pooja Salvi", "email": "pooja@chicshine.com", "skills": ["Head Massage", "Haircut"], "active": true },
//     ],
//     "salonServices": 3,
//     "salonStaff": 2,
//   },
//   {
//     "key": "s7",
//     "salAdmName": "Rohit Singh",
//     "salAdmEmail": "admin@goldenscissors.com",
//     "salAdmContact": "+91 95678 91234",
//     "salonName": "Golden Scissors",
//     "salonEmail": "contact@goldenscissors.com",
//     "salonContact": "+91 95678 91234",
//     "city": "Kolkata",
//     "status": "Open",
//     "category": "Man",
//     "services": [
//       { "id": "s7-1", "name": "Haircut", "price": 220, "durationMin": 45, },
//       { "id": "s7-2", "name": "Beard Shaping", "price": 180, "durationMin": 45, },
//       { "id": "s7-3", "name": "Hair Coloring", "price": 700, "durationMin": 45, },
//       { "id": "s7-4", "name": "Face Cleanup", "price": 350, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF7-1", "name": "Sourav Sen", "email": "sourav@goldenscissors.com", "skills": ["Haircut", "Beard Shaping"], "active": true },
//       { "id": "STF7-2", "name": "Imran Ali", "email": "imran@goldenscissors.com", "skills": ["Hair Coloring", "Face Cleanup", "Haircut"], "active": true },
//       { "id": "STF7-3", "name": "Debashis Paul", "email": "debashis@goldenscissors.com", "skills": ["Beard Shaping", "Face Cleanup"], "active": true },
//     ],
//     "salonServices": 4,
//     "salonStaff": 3,
//   },
//   {
//     "key": "s8",
//     "salAdmName": "Vikram Patel",
//     "salAdmEmail": "admin@blissbeauty.com",
//     "salAdmContact": "+91 98123 45670",
//     "salonName": "Bliss Beauty Lounge",
//     "salonEmail": "info@blissbeauty.com",
//     "salonContact": "+91 98123 45670",
//     "city": "Ahmedabad",
//     "status": "Open",
//     "category": "Spa",
//     "services": [
//       { "id": "s8-1", "name": "Full Body Massage", "price": 1800, "durationMin": 45, },
//       { "id": "s8-2", "name": "Aroma Therapy", "price": 2300, "durationMin": 45, },
//       { "id": "s8-3", "name": "Facial", "price": 1200, "durationMin": 45, },
//       { "id": "s8-4", "name": "Body Scrub", "price": 1500, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF8-1", "name": "Kriti Shah", "email": "kriti@blissbeauty.com", "skills": ["Facial", "Body Scrub"], "active": true },
//       { "id": "STF8-2", "name": "Manav Trivedi", "email": "manav@blissbeauty.com", "skills": ["Full Body Massage", "Aroma Therapy"], "active": true },
//       { "id": "STF8-3", "name": "Radhika Joshi", "email": "radhika@blissbeauty.com", "skills": ["Body Scrub", "Aroma Therapy"], "active": true },
//       { "id": "STF8-4", "name": "Harsh Vyas", "email": "harsh@blissbeauty.com", "skills": ["Full Body Massage", "Body Scrub"], "active": true },
//       { "id": "STF8-5", "name": "Aditi Mehta", "email": "aditi@blissbeauty.com", "skills": ["Facial", "Aroma Therapy", "Full Body Massage"], "active": true },
//     ],
//     "salonServices": 4,
//     "salonStaff": 5,
//   },
//   {
//     "key": "s9",
//     "salAdmName": "Anjali Gupta",
//     "salAdmEmail": "admin@stylestreet.com",
//     "salAdmContact": "+91 97012 34567",
//     "salonName": "Style Street Salon",
//     "salonEmail": "stylestreet@gmail.com",
//     "salonContact": "+91 97012 34567",
//     "city": "Jaipur",
//     "status": "Open",
//     "category": "Woman",
//     "services": [
//       { "id": "s9-1", "name": "Haircut", "price": 400, "durationMin": 45, },
//       { "id": "s9-2", "name": "Hair Smoothening", "price": 2500, "durationMin": 45, },
//       { "id": "s9-3", "name": "Facial", "price": 900, "durationMin": 45, },
//       { "id": "s9-4", "name": "Manicure", "price": 450, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF9-1", "name": "Kavya Jain", "email": "kavya@stylestreet.com", "skills": ["Haircut", "Hair Smoothening"], "active": true },
//       { "id": "STF9-2", "name": "Neelam Yadav", "email": "neelam@stylestreet.com", "skills": ["Facial", "Manicure"], "active": true },
//       { "id": "STF9-3", "name": "Sakshi Sharma", "email": "sakshi@stylestreet.com", "skills": ["Haircut", "Facial", "Manicure"], "active": true },
//     ],
//     "salonServices": 4,
//     "salonStaff": 3,
//   },
//   {
//     "key": "s-10",
//     "salAdmName": "Pooja Khanna",
//     "salAdmEmail": "admin@crownglory.com",
//     "salAdmContact": "+91 88990 01122",
//     "salonName": "Crown & Glory",
//     "salonEmail": "contact@crownglory.com",
//     "salonContact": "+91 88990 01122",
//     "city": "Chandigarh",
//     "status": "Open",
//     "category": "Beauty Parler",
//     "services": [
//       { "id": "s-10-1", "name": "Facial", "price": 900, "durationMin": 45, },
//       { "id": "s-10-2", "name": "Waxing", "price": 650, "durationMin": 45, },
//       { "id": "s-10-3", "name": "Manicure", "price": 500, "durationMin": 45, },
//       { "id": "s-10-4", "name": "Pedicure", "price": 750, "durationMin": 45, },
//     ],
//     "staffs": [
//       { "id": "STF10-1", "name": "Simran Kaur", "email": "simran@crownglory.com", "skills": ["Facial", "Cleanup"], "active": true },
//       { "id": "STF10-2", "name": "Ritika Arora", "email": "ritika@crownglory.com", "skills": ["Waxing", "Manicure"], "active": true },
//       { "id": "STF10-3", "name": "Jasleen Anand", "email": "jasleen@crownglory.com", "skills": ["Pedicure", "Manicure"], "active": true },
//       { "id": "STF10-4", "name": "Aanchal Sood", "email": "aanchal@crownglory.com", "skills": ["Facial", "Waxing", "Pedicure"], "active": true},
//     ],
//     "salonServices": 4,
//     "salonStaff": 4,
//   },
// ];
