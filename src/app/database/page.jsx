"use client"
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";



export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);  
  const [companies, setCompanies] = useState([]);
  const [tableToggle, setTableToggle] = useState(true);
  const [allCompanies, setAllCompanies] = useState([companies]);
  const [currentSearch, setCurrentSearch] = useState("");

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
    const comment = formData.get("comment") == "" ? "blank" : formData.get("comment");
    const res = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, email, billingMail, phone, paymentDeadline, comment }),
    });
    if (res.ok) {
      const resData = await res.json();
      event.target.reset();
      alert(resData.message);
      toggleForm();
    }else{
      alert("Noget gik galt, prøv igen, hvis problemet fortsætter kontakt en administrator");
    }
    setSubmitting(false);
  }
  
  useEffect(() => {
    const getCompaniesData = async () => {
      const companies = await getCompanies();
      setCompanies(companies.sort((a, b) => a.name.localeCompare(b.name)));
      setAllCompanies(companies);
      setLoaded(true);
    }
    getCompaniesData();
  }, [showForm]);


  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleTabelMode = () => {
    setTableToggle(!tableToggle);
  };

  const searchCompany = (event) => {
    const search = event.target.value;
    switch (document.getElementById('searchType').value) {
      case 'name':
        var updatedCompanies = allCompanies.filter((company) => company.name.toLowerCase().includes(search.toLowerCase()));
        setCompanies(updatedCompanies);
        break;
      case 'address':
        var updatedCompanies = allCompanies.filter((company) => company.address.toLowerCase().includes(search.toLowerCase()));
        setCompanies(updatedCompanies);
        break;
      case 'phone':
        var updatedCompanies = allCompanies.filter((company) => company.phone.toLowerCase().includes(search.toLowerCase()));
        setCompanies(updatedCompanies);
        break;
      case 'email':
        var updatedCompanies = allCompanies.filter((company) => company.email.toLowerCase().includes(search.toLowerCase()));
        setCompanies(updatedCompanies);
        break;
      case 'billingMail':
        var updatedCompanies = allCompanies.filter((company) => company.billingMail.toLowerCase().includes(search.toLowerCase()));
        setCompanies(updatedCompanies);
        break;
      default:
        break;
    }
  }

  const orderCompanyBy = (event) => {
    const value = event.target.value;
    let sortedCompanies;
    const regex = /(\d+)/;
    switch (value) {
      case 'company':
        if( currentSearch ==  "company"){
          sortedCompanies = [...companies].sort((a, b) => b.name.localeCompare(a.name));
          setCompanies(sortedCompanies);
          setCurrentSearch("");
          break;  
        }else{
          sortedCompanies = [...companies].sort((a, b) => a.name.localeCompare(b.name));
          setCompanies(sortedCompanies);
          setCurrentSearch("company");
          break;
        }
      case 'address':
        if( currentSearch ==  "address"){
          sortedCompanies = [...companies].sort((a, b) => b.address.localeCompare(a.address));
          setCompanies(sortedCompanies);
          setCurrentSearch("");
          break;
        }else{
        sortedCompanies = [...companies].sort((a, b) => a.address.localeCompare(b.address));
        setCompanies(sortedCompanies);
        setCurrentSearch("address");
        break;
        }
      case 'phone':
        if( currentSearch ==  "phone"){
          sortedCompanies = [...companies].sort((a, b) => b.phone.localeCompare(a.phone));
          setCompanies(sortedCompanies);
          setCurrentSearch("");
          break;
        }else{
        sortedCompanies = [...companies].sort((a, b) => a.phone.localeCompare(b.phone));
        setCompanies(sortedCompanies);
        setCurrentSearch("phone");
        break;
        }
      case 'email':
        if( currentSearch ==  "email"){
          sortedCompanies = [...companies].sort((a, b) => b.email.localeCompare(a.email));
          setCompanies(sortedCompanies);
          setCurrentSearch("");
          break;
        }else{
        sortedCompanies = [...companies].sort((a, b) => a.email.localeCompare(b.email));
        setCompanies(sortedCompanies);
        setCurrentSearch("email");
        break;
        }
      case 'billingMail':
        if( currentSearch ==  "billingMail"){
          sortedCompanies = [...companies].sort((a, b) => b.billingMail.localeCompare(a.billingMail));
          setCompanies(sortedCompanies);
          setCurrentSearch("");
          break;
        }else{
        sortedCompanies = [...companies].sort((a, b) => a.billingMail.localeCompare(b.billingMail));
        setCompanies(sortedCompanies);
        setCurrentSearch("billingMail");
        break;
        }
      case 'paymentDeadline':
        if( currentSearch ==  "paymentDeadline"){
          sortedCompanies = [...companies].sort((a, b) => b.paymentDeadline.match(regex)[0] - a.paymentDeadline.match(regex)[0]);
          setCompanies(sortedCompanies);
          setCurrentSearch("");
          break;
        }else{
        sortedCompanies = [...companies].sort((a, b) =>a.paymentDeadline.match(regex)[0] - b.paymentDeadline.match(regex)[0]);
        setCompanies(sortedCompanies);
        setCurrentSearch("paymentDeadline");
        break;
        }
      default:
        break;
    }
  };
    while (!loaded) {
      return <h1 className="text-center">Loading...</h1>;
    }
    
    return (
      <div>
        <div className="flex flex-col items-center">
          <button
            onClick={toggleForm}
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
          >
            Tilføj virksomhed
          </button>
          <button
          onClick={toggleTabelMode}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
          >
            {tableToggle ? "Skift til faktura mode" : "Skift til virksomheds mode"}
          </button>
          {showForm && (
            <form className="fixed z-50 bg-white max-w-md border-2 p-6 border-black rounded-xl shadow-lg text-center w-96" onSubmit={(event) => createCompany(event, setSubmitting, toggleForm)}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold">Virksomhed</label>
                <input type="text" name="name" placeholder="tilføj Virksomhed " required className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-bold">Adresse</label>
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
              <div className="mb-4">
                <label htmlFor="payment-deadline" className="block text-gray-700 font-bold">Betalingsfrist</label>
                <input type="text" name="payment-deadline" placeholder="8 dage" className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 font-bold">Kommentar</label>
                <input type="text" name="comment" placeholder="kommentar (valgfrit)" className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4 flex ">
                <input type="submit" value="Gem" disabled={submitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600" />
                <button onClick={toggleForm} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">Fortryd</button>
              </div>
            </form>
          )}
        </div>
        
        <div className=" z-0 mb-14 md:mx-10">
          
          <h1 className="text-center text-3xl mb-6 font-bold">Virksomheder</h1>
          <div className=" container flex justify-left mb-2">
            <label className="me-1" htmlFor="">Søg på </label>
            <select id="searchType" name="options">
              <option value="name">Virksomhed:</option>
              <option value="address">Adresse:</option>
              <option value="phone">Telefon:</option>
              <option value="email">Mail:</option>
              <option value="billingMail">Faktura mail:</option> 
            </select>
            <input  placeholder="Skriv her" className="border-2 rounded-xl border-black" onChange={searchCompany} type="text" />
          </div>
            <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    {tableToggle ? (
                        <>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"company"}>Virksomhed</button></th>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"address"}>Adresse</button></th>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"email"} >Mail</button></th>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"phone"}>Telefon</button></th>
                            <th>Kommentar</th>
                            <th>Aktioner</th>
                        </>
                    ) : (
                        <>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"company"}>Virksomhed</button></th>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"address"}>Adresse</button></th>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"paymentDeadline"}>Betalingsfrist</button></th>
                            <th><button className=" hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={orderCompanyBy} value={"billingMail"}>Faktura mail</button></th>
                            <th>Kommentar</th>
                            <th>Aktioner</th>
                        </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  
                    {companies.map((company) => (
                        <tr key={company._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-200 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            {tableToggle ? (
                                <>
                                  <td className="text-base">{company.name}</td>
                                  <td className="text-base">{company.address}</td>
                                  <td className="text-base">{company.email}</td>
                                  <td className="text-base">{company.phone}</td>
                                  <td className="text-base max-w-52">{company.comment}</td>
                                  <td className="flex flex-col text-center md:flex-row">
                                    <Link href={`/database/${company._id}`} className="bg-blue-500 text-white p-1 text-xs md:text-sm md:py-2 md:px-4 rounded-md cursor-pointer hover:bg-blue-600">Se mere</Link>
                                    <button onClick={() => deleteCompany(company._id)} className="bg-red-500 text-white p-1 text-xs md:text-sm md:py-2 md:px-4 rounded-md cursor-pointer hover:bg-red-600">Slet</button>
                                  </td>
                                </>
                            ) : (
                                <>
                                  <td className=" text-base">{company.name}</td>
                                  <td className="text-base">{company.address}</td>
                                  <td className="text-base">{company.paymentDeadline}</td>
                                  <td className="text-base">{company.billingMail}</td>
                                  <td className="text-base max-w-52">{company.comment}</td>
                                  <td className="flex flex-col text-center md:flex-row">
                                    <Link href={`/database/${company._id}`} className="bg-blue-500 text-white p-1 text-xs md:text-sm md:py-2 md:px-4 rounded-md cursor-pointer hover:bg-blue-600">Se mere</Link>
                                    <button onClick={() => deleteCompany(company._id)} className="bg-red-500 text-white p-1 text-xs md:text-sm md:py-2 md:px-4 rounded-md cursor-pointer hover:bg-red-600">Slet</button>
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


