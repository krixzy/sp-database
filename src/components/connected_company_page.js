import { useEffect, useState } from 'react';
import Company from '@/models/company';

export default function ConnectedCompanyPage(params) {

    const [pageLoading, setPageLoading] = useState(true);
    const [connectedCompany, setConnectedCompany] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            const res = await fetch(`/api/company/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            const connectedCompany = Company.fromJSON(data);
            setConnectedCompany(connectedCompany);
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


    while (pageLoading) {
        return <div className="border border-black rounded-md p-6 bg-white text-black">Loading...</div>;
    }
    


    return(
         <div className=" mb-10">
            <h1 className='font-bold text-2xl text-center'>{connectedCompany.name} paller</h1>
            <div className="flex justify-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={removeConnection}>Fjern tilsluttning</button>
            </div>
                <table className='w-full mt-4 text-center'>    
                    <thead className="">
                        <tr>
                            <th>Varenummer</th>
                            <th>Type</th>
                            <th>Kommentar</th>
                            <th>Størrelse</th>
                            <th>Pris</th>
                            <th>Co2 forbrug</th>
                        </tr>
                    </thead>
                    <tbody>
                        {connectedCompany.pallets.map((pallet) => {
                            return(
                                <tr className=" border-b-2 odd:bg-white even:bg-gray-200 " key={pallet.id}>
                                    <td>{pallet.itemNumber}</td>
                                    <td>{pallet.name}</td>
                                    <td className=" max-w-72">{pallet.comment}</td>
                                    <td>{pallet.size} mm.</td>
                                    <td>{pallet.price}kr</td>
                                    <td>{pallet.coToo.startsWith("Ikke")? (pallet.coToo):(pallet.coToo + "g")}</td>
                                    
                               </tr>
                        )
                        }) }

                    </tbody>
                    
                    </table>
            </div>
    )
}