export function WorkTable(companies, deleteCompany) {
  console.log(companies)
    return (
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
    );
}
