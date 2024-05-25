import { deleteData } from "@/lib/mongodb";

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