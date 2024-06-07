"use client";

import { useEffect, useState } from "react";
export default function ChangePallet(params) {
  const [pallet, setPallet] = useState(params.company.pallets.find(pallet => pallet.id == params.palletId));
  const [company, setCompany] = useState(params.company);
  const updatePallet = async () => {
    const res = await fetch(`/api/company/${company.id}`, {
      

      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    });
    if (res.ok) {
      alert("Pallen er nu opdateret");
    } else {
      alert("Der er sket en fejl, prøv igen eller kontakt administrator")
    }
  }
  const handleChange = (e) => {
    setPallet({ ...pallet, [e.target.name]: e.target.value });
    const updatedPallets = company.pallets.map((pallet) => {
      if (pallet.id === params.palletId) {
        return { ...pallet, [e.target.name]: e.target.value };
      }
      return pallet;
    });
    setCompany({ ...company, pallets: updatedPallets });
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Rediger palle</h1>
    <div className="flex justify-center">
                  <form onSubmit={updatePallet} className='z-50 bg-white max-w-md border-2 p-6 border-black rounded-xl shadow-lg text-center w-96'>
                      <div className='flex flex-col'>
                          <label>Navn</label>
                          <input type='text' name="name" className='border rounded p-1 text-center' value={pallet.name} onChange={handleChange} required/>
                      </div>
                      <div className='flex flex-col'>
                          <label>Pris</label>
                          <input type='text' name="price" className='border rounded p-1 text-center' value={pallet.price} onChange={handleChange}  />
                      </div>
                      <div className='flex flex-col'>
                          <label>Størrelse</label>
                          <input type='text' name="size" className='border rounded p-1 text-center' value={pallet.size} onChange={handleChange}  />
                      </div>
                      <div className='flex flex-col'>
                          <label>Varenummer</label>
                          <input type='text' name="itemNumber" className='border rounded p-1 text-center' value={pallet.itemNumber} onChange={handleChange}  />
                      </div>
                      <div className='flex flex-col'>
                          <label>Kommentar</label>
                          <input type='text' name="comment" className='border rounded p-1 text-center' value={pallet.comment} onChange={handleChange}  />
                      </div>
                      <div className='flex flex-col'>
                          <label>co2 forbrug</label>
                          <input type='text' name="coToo" className='border rounded p-1 text-center' value={pallet.coToo} onChange={handleChange} />
                      </div>
                      <div className='flex justify-center mt-4'>
                          <input type='submit' value={"Gem"} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600" />
                          <button onClick={updatePallet} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Fortryd</button>
                          
                      </div>
                  </form>
              </div>
    </div>
  );
}