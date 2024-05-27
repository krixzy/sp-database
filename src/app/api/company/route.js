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
   try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('your-database-name');
    const collection = database.collection('companies');

    const result = await collection.deleteOne({ _id: id });

    await client.close();

    return new Response(
      JSON.stringify({ message: "Virksomhed slettet", result }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "En fejl opstod", error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  const companies = await getCollection("companies");
  return new Response(JSON.stringify(companies), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
