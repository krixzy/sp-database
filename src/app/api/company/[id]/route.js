import { deleteData, getData, updateData } from "@/lib/mongodb";

export const DELETE = async (req, { params }) => {
  const { id } = params;
  await deleteData(id, "companies");
  return new Response(JSON.stringify({ message: "Virksomhed slettet" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const companie = await getData(id, "companies");
    return new Response(JSON.stringify(companie), {
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

export const PUT = async (req) => {
  const company = await req.json();
  await updateData(company.id, company, "companies");
  return new Response(JSON.stringify({ message: "Virksomhed opdateret" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}