"use client"
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";



export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);  
  const [companies, setCompanies] = useState([]);
  const [tableToggle, setTableToggle] = useState(true);

  const deleteCompany = async (id) => {
    const res = await fetch(`/api/company/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
      if (res.ok) {
        setCompanies(companies.filter(company => company._id !== id));
      } else {
        console.error('Failed to delete company');
      }
  }

  const getCompanies = async () => {
    const res = await fetch("/api/company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }

  const createCompany = async (event, setSubmitting, toggleForm) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const address = formData.get("address") == "" ? "blank" : formData.get("address");
    const email = formData.get("email") == "" ? "blank" : formData.get("email");
    const billingMail = formData.get("billing-mail") == "" ? "blank" : formData.get("billing-mail");
    const phone = formData.get("phone") == "" ? "blank" : formData.get("phone");
    const paymentDeadline = formData.get("payment-deadline") == "" ? "8 dage" : formData.get("payment-deadline");
    // Sender en POST-anmodning med formulardataene
    const res = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, email, billingMail, phone, paymentDeadline }),
    });
    console.log(res.ok)
    if (res.ok) {
      const resData = await res.json();
      event.target.reset();
      alert(resData.message);
      toggleForm();
    }else{
      alert("Noget gik galt, prøv igen, hvis problemet fortsætter kontakt en administrator");
    }
    setSubmitting(false);
    // Nulstiller formularfelterne efter vellykket indsendelse
  }
  
  useEffect(() => {
    const auth = async () => {
      const authLevel = await checkAuthLevel();
      if (authLevel >= 1) {
        setAuthorized(true);
      }else{
        setAuthorized(false);
      }
      setLoaded(true);
      
    }
    auth();

  }, []);
  
  useEffect(() => {
    const getCompaniesData = async () => {
      const companies = await getCompanies();
      setCompanies(companies);
    }
    getCompaniesData();
  }, [showForm]);


  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleTabelMode = () => {
    setTableToggle(!tableToggle);
  };

    while (!loaded) {
      return <h1 className="text-center">Loading...</h1>;
    }
    if (!authorized) {
      return <h1 className="text-center">Du har ikke tilladelse til at se denne side, hvis dette er en fejl skal du kontakt en administrator</h1>;
    }
  
    return (
      <div>
        <div className="flex flex-col items-center">
          <button
            onClick={toggleForm}
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
            hidden={showForm}
          >
            Tilføj virksomhed
          </button>
          <button
          onClick={toggleTabelMode}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
          >
            {tableToggle ? "skift til faktura mode" : "skift til virksomheds mode"}
          </button>
          {showForm && (
            <form className="fixed z-50 bg-white max-w-md border-2 p-6 border-black rounded-xl shadow-lg text-center w-96" onSubmit={(event) => createCompany(event, setSubmitting, toggleForm)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold">Navn</label>
                <input type="text" name="name" placeholder="tilføj navn" required className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold">Address</label>
                <input type="text" name="address" placeholder="tilføj address (valgfrit)" className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
                <input type="email" name="email" placeholder="tilføj email (valgfrit)" className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="billing-mail" className="block text-gray-700 font-bold">Faktura Mail</label>
                <input type="email" name="billing-mail" placeholder="tilføj faktura mail (valgfrit)" className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-bold">Telefon</label>
                <input type="tel" name="phone" placeholder="tilføj phone number (valgfrit)" className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="payment-deadline" className="block text-gray-700 font-bold">Betalings frist</label>
                <input type="text" name="payment-deadline" placeholder="tilføj betalings frist (valgfrit)" className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4 flex ">
                <input type="submit" value="Tilføj" disabled={submitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600" />
                <button onClick={toggleForm} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Fortryd</button>
              </div>
            </form>
          )}
        </div>
        <div className=" z-0">
          
          <h1 className="text-center text-3xl mb-6 font-bold">Virksomheder</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                  <tr className="text-center">
                    {tableToggle ? (
                        <>
                            <th>Navn</th>
                            <th>Adresse</th>
                            <th>Mail</th>
                            <th>Telefon</th>
                            <th>aktioner</th>
                        </>
                    ) : (
                        <>
                            <th>Navn</th>
                            <th>Adresse</th>
                            <th>Betalings frist</th>
                            <th>Faktura mail</th>
                            <th>aktioner</th>
                        </>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center">
                    {companies.map((company) => (
                        <tr key={company._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            {tableToggle ? (
                                <>
                                  <td>{company.name}</td>
                                  <td>{company.address}</td>
                                  <td>{company.email}</td>
                                  <td>{company.phone}</td>
                                  <td className="text-center">
                                      <Link href={`/database/${company._id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Se mere</Link>
                                      <button onClick={() => deleteCompany(company._id)} className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-red-600">Slet</button>
                                  </td>
                                </>
                            ) : (
                                <>
                                  <td>{company.name}</td>
                                  <td>{company.address}</td>
                                  <td>{company.paymentDeadline}</td>
                                  <td>{company.billingMail}</td>
                                  <td className="text-center">
                                      <Link href={`/database/${company._id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Se mere</Link>
                                      <button onClick={() => deleteCompany(company._id)} className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-red-600">Slet</button>
                                  </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
  }

const checkAuthLevel = async () => {
  const res = await fetch("/api/check-auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.user_auth;
}


