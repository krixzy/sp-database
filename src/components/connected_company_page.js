import { useEffect, useState } from 'react';
import Company from '@/models/company';

export default function ConnectedCompanyPage(params) {

    const [pageLoading, setPageLoading] = useState(true);
    const [connectedCompany, setConnectedCompany] = useState(null);
    const [originalPallets, setOriginalPallets] = useState(null);


    useEffect(() => {
        const fetchCompany = async () => {
            const res = await fetch(`/api/company/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            const currentConnectedCompany = Company.fromJSON(data);
            setConnectedCompany(currentConnectedCompany);
            setOriginalPallets(currentConnectedCompany.pallets);
            setPageLoading(false);
        };
        fetchCompany();
    }, [params.id]);

    const removeConnection = async () => {
        const company = params.company;
        company.connectedCompanyId = null;
        await params.save(company);
        window.location.reload();
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

        setConnectedCompany({ ...connectedCompany, pallets: updatedPallets });
    }

    

    while (pageLoading) {
        return <div className="border border-black rounded-md p-6 bg-white text-black">Loading...</div>;
    }
    


    return(
         <div className=" mb-10">
            <h1 className='font-bold text-2xl text-center'>{connectedCompany.name} paller</h1>
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
            <div className="flex justify-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={removeConnection}>Fjern tilsluttning</button>
            </div>
                <table className='w-full mt-4 text-center'>    
                    <thead className="">
                        <tr>
                            <th>Varenummer</th>
                            <th>Type</th>
                            <th>Størrelse</th>
                            <th>Pris</th>
                            <th>Co2 forbrug</th>
                            <th>Kommentar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {connectedCompany.pallets.map((pallet) => {
                            return(
                                <tr className=" border-b-2 odd:bg-white even:bg-gray-200 " key={pallet.id}>
                                    <td>{pallet.itemNumber}</td>
                                    <td>{pallet.name}</td>
                                    <td>{pallet.size} mm.</td>
                                    <td>{pallet.price}kr</td>
                                    <td>{pallet.coToo.startsWith("Ikke")? (pallet.coToo):(pallet.coToo + "g")}</td>
                                    <td className=" max-w-72">{pallet.comment}</td>
                                    
                               </tr>
                        )
                        }) }

                    </tbody>
                    
                    </table>
            </div>
    )
}