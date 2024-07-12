'use client';

import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup'; 
import PalletComponentPopup from '@/components/pallet_component_popup';
import Company from '@/models/company';
import Pallet from '@/models/pallet';
import Plank from '@/models/plank';
import Block from '@/models/block';
import PalletCalculaterPopup from '@/components/price_calculater_popup';

export default function Page({params}) {
    const [pageLoading, setPageLoading] = useState(true);
    const [company, setCompany] = useState(null);
    const [pallet, setPallet] = useState(null);
    const [editPlank, setEditPlank] = useState([false, 0]);
    const [editBlock, setEditBlock] = useState([false, 1]);

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
            const company = Company.fromJSON(data);
            setCompany(company);
            setPallet(company.pallets.find((pallet) => pallet.id === params.palletId));
            setPageLoading(false);
        };
        fetchCompany();
    },[]);

    const addPlank = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const plank = new Plank(formData.get("amount"), formData.get("length"), formData.get("width"), formData.get("height"), formData.get("price"));
        plank.m3 = ((plank.length * plank.width * plank.height * plank.amount) / 1000000000).toFixed(4);
        pallet.palletComponentes.planks.push(plank);
        if (await saveCompanyApi()) {
            window.location.reload();
        };
    }
    
    const addBlock = async () => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const block = new Block(formData.get("amount"), formData.get("length"), formData.get("width"), formData.get("height"), formData.get("price"));
        block.m3 = ((block.length * block.width * block.height * block.amount) / 1000000000).toFixed(4);
        pallet.palletComponentes.blocks.push(block);
        if (await saveCompanyApi()) {
            window.location.reload();
        };
    
    }

    const saveEditedPlank = async () => {
        if (await saveCompanyApi()) {
            setEditPlank([false, 0]);
        }
    }

    const handlePlank = (event, target) => {
        const { name, value } = event.target;
        pallet.palletComponentes.planks[target][name] = value;
        pallet.palletComponentes.planks[target].m3 = ((pallet.palletComponentes.planks[target].length * pallet.palletComponentes.planks[target].width * pallet.palletComponentes.planks[target].height * pallet.palletComponentes.planks[target].amount) / 1000000000).toFixed(4);
        setPallet({ ...pallet});
    }

    const deletePlank = async(index) => {
        pallet.palletComponentes.planks.splice(index, 1);
        setPallet({ ...pallet});
        await saveCompanyApi();
    }

    const saveEditedBlock = async () => {
        if (await saveCompanyApi()) {
            setEditBlock([false, 0]);
        }
    }
    const handleBlock = (event, target) => {
        const { name, value } = event.target;
        pallet.palletComponentes.blocks[target][name] = value;
        pallet.palletComponentes.blocks[target].m3 = ((pallet.palletComponentes.blocks[target].length * pallet.palletComponentes.blocks[target].width * pallet.palletComponentes.blocks[target].height * pallet.palletComponentes.blocks[target].amount) / 1000000000).toFixed(4);
        setPallet({ ...pallet});
    }
    const deleteBlock = async(index) => {
        pallet.palletComponentes.blocks.splice(index, 1);
        setPallet({ ...pallet});
        await saveCompanyApi();
    }
    const saveCompanyApi = async () => {
        const res = await fetch(`/api/company/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(company),
        });
        if (res.ok) {
            return true;
        } else {
            alert("Noget gik galt prøv igen, hvis problemet fortsætter kontakt administartor");
        }

    }
    if (pageLoading) {
        return <div className='text-center'>Loading...</div>;
    }

    return (
        <div className='flex content-center items-center flex-col'>
            <div className=' shadow-lg min-w-80 p-6 mx-auto rounded-lg mb-5 '>
                <h1 className=' font-bold text-lg'>Pallens opbygning</h1>
                <div className='flex'>
                    <h2 className='font-bold me-2'>Størelse: </h2>
                    <h2>{pallet.size}</h2>
                </div>
                <div className='flex'>
                    <h2 className='font-bold me-2'>Pris:</h2>
                    <h2>{pallet.price} kr</h2>
                </div>
                <div className='flex'>
                    <h2 className='font-bold me-2'>Co2:</h2>
                    <h2>{pallet.coToo} g</h2>
                </div>
                <div className='flex'>
                    <h2 className='font-bold me-2'>M3</h2>
                    <h2>{pallet.palletComponentes.m3} m3</h2>
                </div>
                <div>
                    <Popup trigger={<button className='bg-blue-500 text-white rounded p-1 ms-2'>Lav udregninger</button>} position="right center">
                        <PalletCalculaterPopup pallet={pallet} save={saveCompanyApi}/>
                    </Popup>
                </div>
            </div>
            
            <div>
                <h1 className=' font-bold text-xl' >Brædder</h1>
                {pallet.palletComponentes.planks.length > 0 ? (
                    pallet.palletComponentes.planks.map((plank, index) => {
                        return(
                            <div className='flex border justify-center m-2 p-2 border-2 shadow-md justify-between flex-col lg:flex-row' key={index}>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Antal:</h2>
                                    {editPlank[0] && index == editPlank[1]?(
                                        <input type='text' name='amount' className='border-2' value={plank.amount} onChange={(e) => handlePlank(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{plank.amount} stk</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Længde: </h2>
                                    {editPlank[0] && index == editPlank[1]? (
                                        <input type='text' name='length' className='border-2' value={plank.length} onChange={(e) => handlePlank(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{plank.length} mm</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Bredde:</h2>
                                    {editPlank[0] && index == editPlank[1]? (
                                        <input type='text' name='width' className='border-2' value={plank.width} onChange={(e) => handlePlank(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{plank.width} mm</h2>
                                    )}
                                    </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Højde:</h2>
                                    {editPlank[0] && index == editPlank[1]? (
                                        <input type='text' name='height' className='border-2' value={plank.height} onChange={(e) => handlePlank(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{plank.height} mm</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Pris:</h2>
                                    {editPlank[0] && index == editPlank[1]? (
                                        <input type='text' name='price' className='border-2' value={plank.price} onChange={(e) => handlePlank(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{plank.price}kr/m3</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>M3:</h2>
                                    <h2 className='me-2'>{plank.m3}</h2>
                                </div>
                                <div className='flex'>
                                    {editPlank[0] && index == editPlank[1]? (
                                        <button className='bg-blue-500 text-white rounded p-1 ms-2' onClick={saveEditedPlank}>Save</button>
                                    ) : (
                                        <button className='bg-blue-500 text-white rounded p-1 ms-2' onClick={() => setEditPlank([true, index])}>Rediger</button>
                                    )}
                                    <button className='bg-red-500 text-white rounded p-1' onClick={() => deletePlank(index)}>Slet</button>

                                </div>
                            </div>
                        )
                    })
                ) : (null)

                }
                <Popup trigger={<button className="px-4 py-2 bg-blue-500 text-white rounded"> Tilføj bradt</button>} position="right center">
                    <PalletComponentPopup addFunction={addPlank} type={"Bradt"}/>
                </Popup>
            </div>
            
            <div>
                <h1 className=' font-bold text-xl'>Klosser</h1>

                {pallet.palletComponentes.blocks.length > 0 ? (
                    pallet.palletComponentes.blocks.map((block, index) => {
                        return(
                            <div className='flex border justify-center m-2 p-2 border-2 shadow-md justify-between flex-col lg:flex-row' key={index}>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Antal:</h2>
                                    {editBlock[0] && index == editBlock[1]?(
                                        <input type='text' name='amount' className='border-2' value={block.amount} onChange={(e) => handleBlock(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{block.amount} stk</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Længde: </h2>
                                    {editBlock[0] && index == editBlock[1]? (
                                        <input type='text' name='length' className='border-2' value={block.length} onChange={(e) => handleBlock(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{block.length} mm</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Bredde:</h2>
                                    {editBlock[0] && index == editBlock[1]? (
                                        <input type='text' name='width' className='border-2' value={block.width} onChange={(e) => handleBlock(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{block.width} mm</h2>
                                    )}
                                    </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Højde:</h2>
                                    {editBlock[0] && index == editBlock[1]? (
                                        <input type='text' name='height' className='border-2' value={block.height} onChange={(e) => handleBlock(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{block.height} mm</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>Pris:</h2>
                                    {editBlock[0] && index == editBlock[1]? (
                                        <input type='text' name='price' className='border-2' value={block.price} onChange={(e) => handleBlock(e, index)}/>
                                    ) : (
                                    <h2 className='me-2'>{block.price}kr/m3</h2>
                                    )}
                                </div>
                                <div className='flex'>
                                    <h2 className='font-bold me-2'>M3:</h2>
                                    <h2 className='me-2'>{block.m3}</h2>
                                </div>
                                <div className='flex'>
                                    {editBlock[0] && index == editBlock[1]? (
                                        <button className='bg-blue-500 text-white rounded p-1 ms-2' onClick={saveEditedBlock}>Save</button>
                                    ) : (
                                        <button className='bg-blue-500 text-white rounded p-1 ms-2' onClick={() => setEditBlock([true, index])}>Rediger</button>
                                    )}
                                    <button className='bg-red-500 text-white rounded p-1' onClick={() => deleteBlock(index)}>Slet</button>

                                </div>
                            </div>
                        )
                    })
                ) : (null)

                }
                <Popup trigger={<button className="px-4 py-2 bg-blue-500 text-white rounded"> Tilføj klos</button>} position="right center">
                <PalletComponentPopup addFunction={addBlock} type={"klos"}/>
                </Popup>
            </div>

        </div>
    );
}