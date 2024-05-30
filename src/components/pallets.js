export default function Pallets(params) {
    const company = params.company;
    return(
        <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4 text-center'>Paller</h1>
            <div className="flex justify-center">
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Tilføj palle</button>
            </div>
            <div>
                <table className='w-full mt-4 text-center'>    
                    <thead className="">
                        <tr>
                            <th>Navn</th>
                            <th>Pris</th>
                            <th>Størrelse</th>
                            <th>Varenummer</th>
                            <th>Type</th>
                            <th>aktioner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Standard palle</td>
                            <td>100</td>
                            <td>1200 x 800 mm.</td>
                            <td>123456</td>
                            <td>Standard</td>
                            <td>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Rediger</button>
                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Slet</button>
                            </td>
                        </tr>
                        </tbody>
                    
                    </table>
            </div>
        </div>
    )
}