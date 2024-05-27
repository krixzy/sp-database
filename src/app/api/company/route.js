import { Company } from '@/models/company';
import { saveData, getCollection} from '@/lib/mongodb';

export const POST = async (req) => {
  const { name, address,  email, billingMail, phone } = await req.json();
  const company = new Company(name, address, phone, email, billingMail);
  await saveData(company, "companies");


// console.log(name, address,  email, billingMail,  phone);
return new Response(JSON.stringify({ message: "Virksomhed tilføjet" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

};
export const GET = async (req) => {
  console.log("GET BIG TITTS");
  try {
    const companies = await getCollection("companies");
    return new Response(JSON.stringify(companies), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Noget gik galt" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

}
