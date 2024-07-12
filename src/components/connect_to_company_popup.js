import { useState, useEffect } from 'react';
import Company from '@/models/company';

export default function ConnectToCompanyPopup(params) {
    const company = params.company;
    const [pageLoading, setPageLoading] = useState(true);
    const [companyList, setCompanyList] = useState(null);

useEffect(() => {
    const fetchCompany = async () => {
        setPageLoading(true);
            const res = await fetch("/api/company", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                });
                const data = await res.json();
                const companys = data.map((company) => Company.fromJSON(company)).sort((a, b) => a.name.localeCompare(b.name));
                setCompanyList(companys);
                setPageLoading(false);
        };
    fetchCompany();
}, [params.id]);
    
    const addConnectedCompany = async (data) => {
        data.preventDefault();
        const formData = new FormData(data.target);
        const companyId = formData.get('company');
        company.connectedCompanyId = companyId;
        await params.save(company);
        window.location.reload();
    }

while (pageLoading) {
    return <div className="border border-black rounded-md p-6 bg-white text-black">Loading...</div>;
}
return(
    <div className="border border-black rounded-md p-6 bg-white text-black">
        <h1 className='font-bold text-xl'>Vælg et firma at tilslutte til</h1>
        <form onSubmit={addConnectedCompany}>
            <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-bold">Firma:</label>
                <select name="company" className="border-2">
                    {companyList.map((company) => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Tilslut
            </button>
        </form>
    </div>
    
)
}