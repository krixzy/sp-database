import  Company  from '@/models/company';
import { saveData, getCollection} from '@/lib/mongodb';

export const POST = async (req) => {
  const { name, address,  email, billingMail, phone, paymentDeadline } = await req.json();
  const company = new Company(name, address, phone, email, billingMail, paymentDeadline);
  await saveData(company, "companies");


return new Response(JSON.stringify({ message: "Virksomhed tilføjet" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });

};
export const GET = async (req) => {
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
