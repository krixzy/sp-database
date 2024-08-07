'use client';

import { useEffect, useState } from 'react';
import Company from '@/models/company';
import PalletsPage from '@/components/pallets_page';

export default function Page({ params }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = async () => {
    setIsEditing(false);
    const res = await fetch(`/api/company/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    });
    if (res.ok) {
    } else {
      alert("Noget gik galt prøv igen, hvis problemet fortsætter kontakt administartor");
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      setPageLoading(true);
      const res = await fetch(`/api/company/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCompany(Company.fromJSON(data));
      setPageLoading(false);
    };
    fetchCompany();
  }, [params.id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  while (pageLoading) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <div className="">
      <div className="text-center">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleChange}
            className="border rounded p-1"
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{company.name}</h1>
        )}
      </div>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Address:</span>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={company.address}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            <span className="text-gray-600">{company.address}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Email:</span>
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={company.email}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            <span className="text-gray-600">{company.email}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Telefon:</span>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={company.phone}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            <span className="text-gray-600">{company.phone}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Faktura Mail:</span>
          {isEditing ? (
            <input
              type="text"
              name="billingMail"
              value={company.billingMail}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            <span className="text-gray-600">{company.billingMail}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Betalingsfrist:</span>
          {isEditing ? (
            <input
              type="text"
              name="paymentDeadline"
              value={company.paymentDeadline}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            <span className="text-gray-600">{company.paymentDeadline}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Kommentar:</span>
          {isEditing ? (
            <input
              type="text"
              name="comment"
              value={company.comment}
              onChange={handleChange}
              className="border rounded p-1"
            />
          ) : (
            <span className="text-gray-600">{company.comment}</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-1">
        {isEditing ? (
          <button onClick={handleSaveClick} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        ) : (
          <button onClick={handleEditClick} className="px-4 py-2 bg-green-500 text-white rounded">
            Rediger
          </button>
        )}
      </div>
      <div className=' mt-5'>
        <PalletsPage company={company} />
      </div>
    </div>
  );
}
