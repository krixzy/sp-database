"use client";

import { useEffect, useState } from "react";
import { Pallet } from "@/models/pallet";
import ChangePallet from "@/components/change_pallet_page";
import Popup from 'reactjs-popup'; 
import Link from "next/link";
import ChangePalletPricePopup from "@/components/change_pallet_price_popup";
import ConnectToCompanyPopup from "@/components/connect_to_company_popup";
import ConnectedCompanyPage from "./connected_company_page";



export default function PalletsPage(params) {
    const [company, setCompany] = useState(params.company);
    const [originalPallets, setOriginalPallets] = useState(params.company.pallets);
    const [addPallet, setAddPallet] = useState(false);

    const handleAddPallet = () => {
        setAddPallet(!addPallet);
    }

    const createPallet = async (data) => {
        data.preventDefault();
        const formData = new FormData(data.target);
        setAddPallet(false);
        const name = formData.get('name');
        const price = formData.get('price') == '' ? 0 : formData.get('price');
        const size = formData.get('size') == '' ? 0 : formData.get('size');
        const itemNumber = formData.get('itemNumber') == '' ? "N/A" : formData.get('itemNumber');
        const coToo = formData.get('coToo') == '' ? "Ikke udregnet endnu " : formData.get('coToo');  
        const comment = formData.get('comment') == '' ? "N/A" : formData.get('comment');
        const newPallet = new Pallet(name, price, size, itemNumber, comment, coToo, Pallet.generateID());
        const updatedPallets = company.pallets.concat(newPallet);
        const updatedCompany = { ...company, pallets: updatedPallets };
        setCompany(updatedCompany);
    
    await saveCompany(updatedCompany);
        
        
        
    }
    const deletePallet = async (id) => {
       const updatedPallets = company.pallets.filter((pallet) => pallet.id !== id);
        setCompany({ ...company, pallets: updatedPallets });
        await saveCompany({ ...company, pallets: updatedPallets });
    }

    const saveCompany = async (updatedCompany) => {
        const res = await fetch(`/api/company/${updatedCompany.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCompany),
        });
    }

    const serachPallet = async (event) => {
        const value = event.target.value;
        let updatedPallets = [];

        switch (document.getElementById('searchType').value) {
            case 'size':
                updatedPallets = originalPallets.filter((pallet) => pallet.size.toString().includes(value));
                break;    
            case 'itemNumber':
                updatedPallets = originalPallets.filter((pallet) => pallet.itemNumber.includes(value));
                break;
            case 'price':
                updatedPallets = originalPallets.filter((pallet) => pallet.price.toString().includes(value));
                break;
            case 'name':
                updatedPallets = originalPallets.filter((pallet) => pallet.name.includes(value));
                break;
            default:
                updatedPallets = originalPallets;
                break;
        }

        setCompany({ ...company, pallets: updatedPallets });
    }
    return(
        <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4 text-center'>Paller</h1>
            <div className="flex justify-center">
                <button onClick={handleAddPallet} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Tilføj palle</button>
                <Popup trigger={<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-1 me-1'>Ændre pallers pris</button>} modal>
                <ChangePalletPricePopup company={company} save={saveCompany} />
                </Popup>
                <Popup trigger={<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-1 me-1'>Tilslut til andet firma</button>} modal>
                <ConnectToCompanyPopup company={company} save={saveCompany} />
                </Popup>
            </div>
             <div className=" flex ms-10 justify-left mb-2">
                <label className="me-1">Søg på </label>
                <select id="searchType" name="options">
                    <option value="size">Størrelse:</option>
                    <option value="itemNumber">Varenummer:</option>
                    <option value="price">Pris:</option>
                    <option value="name">Navn:</option>
                </select>
                <input  placeholder="Skriv her" className="border-2 rounded-xl border-black" type="text" onChange={serachPallet} />
            </div>
            {addPallet ? (
                <div className="flex justify-center">
                    <form onSubmit={(data) =>{createPallet(data)}}className='z-50 bg-white max-w-md border-2 p-6 border-black rounded-xl shadow-lg text-center w-96'>
                        <div className='flex flex-col'>
                            <label>Navn</label>
                            <input type='text' name="name" className='border rounded p-1 text-center' required/>
                        </div>
                        <div className='flex flex-col'>
                            <label>Pris</label>
                            <input type='text' name="price" className='border rounded p-1 text-center' placeholder="Valgfrit" />
                        </div>
                        <div className='flex flex-col'>
                            <label>Størrelse</label>
                            <input type='text' name="size" className='border rounded p-1 text-center' placeholder="Valgfrit" />
                        </div>
                        <div className='flex flex-col'>
                            <label>Varenummer</label>
                            <input type='text' name="itemNumber" className='border rounded p-1 text-center' placeholder="Valgfrit" />
                        </div>
                        <div className='flex flex-col'>
                            <label>Kommentar</label>
                            <input type='text' name="comment" className='border rounded p-1 text-center' placeholder="Valgfrit" />
                        </div>
                        <div className='flex flex-col'>
                            <label>Co2 forbrug</label>
                            <input type='text' name="coToo" className='border rounded p-1 text-center' placeholder="Valgfrit" />
                        </div>
                        <div className='flex justify-center mt-4'>
                            <input type='submit' value={"Gem"} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600" />
                            <button onClick={handleAddPallet} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Fortryd</button>
                            
                        </div>
                    </form>
                </div>
            ) : null}
    
            <div className=" mb-10">
                <table className='w-full mt-4 text-center'>    
                    <thead className="">
                        <tr>
                            <th>Varenummer</th>
                            <th>Type</th>
                            <th>Størrelse</th>
                            <th>Pris</th>
                            <th>Co2 forbrug</th>
                            <th>Kommentar</th>
                            <th>aktioner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {company.pallets && company.pallets.length > 0 ? (
                        company.pallets.map((pallet) => {
                            return(
                                <tr className=" border-b-2 odd:bg-white even:bg-gray-200 " key={pallet.id}>
                                    <td>{pallet.itemNumber}</td>
                                    <td>{pallet.name}</td>
                                    <td>{pallet.size} mm.</td>
                                    <td>{pallet.price}kr</td>
                                    <td>{pallet.coToo.startsWith("Ikke")? (pallet.coToo):(pallet.coToo + "g")}</td>
                                    <td className=" max-w-72">{pallet.comment}</td>
                                    <td>
                                        <Popup trigger={<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>{}Rediger</button>} modal>
                                            <ChangePallet company={company} palletId={pallet.id}  />
                                        </Popup>
                                        <Link href={`/database/${company.id}/${pallet.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ms-1 me-1' > Byg </Link>
                                        <button onClick={(event) => { deletePallet(pallet.id)}} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Slet</button>
                                    </td>
                                </tr>
                        )
                            
                        })
                        ):(  <tr>
                            <td colSpan="7">Ingen paller tilgængelige</td>
                        </tr>)}
                    </tbody>
                    
                    </table>
            </div>
            {company.connectedCompanyId == null ? null : (
                <ConnectedCompanyPage id={company.connectedCompanyId} company={company} save={saveCompany} />
                )}
            
        </div>
    )
}
