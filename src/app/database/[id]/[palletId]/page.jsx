// "use client";

// import { useEffect, useState } from 'react';

// export default function page({params}) {
//     const [pageLoading, setPageLoading] = useState(true);
//     const [company, setCompany] = useState(null);
//     const [pallet, setPallet] = useState(null);

//     useEffect(() => {
//         const fetchCompany = async () => {
//             setPageLoading(true);
//             const res = await fetch(`/api/company/${params.id}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             const data = await res.json();
//             setCompany(data);
//             setPallet(data.pallets.find((pallet) => pallet.id === params.palletId));
//             setPageLoading(false);
//         };
//         fetchCompany();
//     }, [params.id]);

//     while(pageLoading){
//         return <div className='text-center'>Loading...</div>;
//     }   
//     console.log(pallet);
//     return(
//         <div className='text-center'>
//             <h1>Page</h1>
//         </div>
//     )
// }