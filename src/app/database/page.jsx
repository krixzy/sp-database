"use client"
import { Suspense, useEffect, useState } from "react";



export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);  
  const [companies, setCompanies] = useState([]);

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
    event.preventDefault(); // Forhindrer sidegenindlæsning
    setSubmitting(true);
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const address = formData.get("address") == "" ? "blank" : formData.get("address");
    const email = formData.get("email") == "" ? "blank" : formData.get("email");
    const billingMail = formData.get("billing-mail") == "" ? "blank" : formData.get("billing-mail");
    const phone = formData.get("phone") == "" ? "blank" : formData.get("phone");
    // Sender en POST-anmodning med formulardataene
    const res = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, email, billingMail, phone }),
    });
    const resData = await res.json();
    // Nulstiller formularfelterne efter vellykket indsendelse
    event.target.reset();
    alert(resData.message);
    setSubmitting(false);
    toggleForm();
  }
  
  useEffect(() => {
    const auth = async () => {
      const authLevel = await checkAuth();
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
          {showForm && (
            <form className="fixed z-50 bg-white max-w-md border-2 p-6 border-black rounded-xl shadow-lg text-center w-96" onSubmit={(event) => createCompany(event, setSubmitting, toggleForm)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold">Name</label>
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
              <div className="mb-4 flex ">
                <input type="submit" value="Tilføj" disabled={submitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600" />
                <button onClick={toggleForm} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Fortryd</button>
              </div>
            </form>
          )}
        </div>
        <div className=" z-0">
          
          <h1 className="text-center text-3xl mb-6 font-bold">Virksomheder</h1>
            <div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Navn</th>
                    <th>Adresse</th>
                    <th>Email</th>
                    <th>Faktura Mail</th>
                    <th>Telefon</th>
                    <th>aktioner</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {companies.map((company) => (
                    console.log(company),
                    <tr key={company._id}>
                      <td>{company.name}</td>
                      <td>{company.address}</td>
                      <td>{company.email}</td>
                      <td>{company.billingMail}</td>
                      <td>{company.phone}</td>
                      <td className="text-center">
                        <button className=" bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Se mere</button>
                        <button onClick={() =>{deleteCompany(company._id)}} className=" bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-red-600">Slet</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
  }

const checkAuth = async () => {
  const res = await fetch("/api/check-auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.user_auth;
}


