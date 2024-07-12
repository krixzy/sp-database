import React, { useState } from 'react';

export default function PalletCalculaterPopup( params ) {
    const pallet = params.pallet;
    const [allPalletPrice, setAllPalletPrice] = useState(0);
    const [onePalletPrice, setOnePalletPrice] = useState(0);
    const [co2, setCo2] = useState(0);
    const [m3, setM3] = useState(0);

    const calculatePrice = (event) => {
        const data = new FormData(event.target);  
        let currentM3 = 0;  
        event.preventDefault();
        const totalPlankPrice = pallet.palletComponentes.planks.reduce((acc, component) => {
            const price = component.price * component.m3;
            currentM3 += Number(component.m3);
            return acc + price;
        }, 0);
        const totalBlockPrice = pallet.palletComponentes.blocks.reduce((acc, component) => {
            const price = component.price * component.m3;
            currentM3 += Number(component.m3);
            return acc + price;
        }, 0);

        const totalWoodPrice = Math.floor(totalPlankPrice * 10000) / 10000 + Math.floor(totalBlockPrice * 10000) / 10000;
        const totalPalletPrice = totalWoodPrice * data.get('palletAmount');
        let totalPrice = totalPalletPrice + (data.get('hourlyRate') * data.get('hourAmount'));
        const extraPrice = totalPrice * (data.get('procentExtra') / 100);
        totalPrice = totalPrice + extraPrice;
        setAllPalletPrice(totalPrice.toFixed(4));
        setOnePalletPrice((totalPrice / data.get('palletAmount')).toFixed(4));
        setM3(currentM3);
        setCo2((currentM3 * data.get('co2Price')).toFixed(2));

    }

    const savePrice = async (event) => {
        event.preventDefault();
        pallet.price = onePalletPrice;
        pallet.palletComponentes.m3 = m3;
        pallet.coToo = co2;
        if(await params.save()){
            window.location.reload();
        }
    }


    return (
        <div className="bg-white border-2 mt-8 border-black p-4">
            <form onSubmit={calculatePrice}>
                <div className="mb-4">
                    <label htmlFor='length' className='block text-gray-700 font-bold'>Time løn:</label>
                    <input type='text' name='hourlyRate' className='border-2' defaultValue={250} />
                </div>
                <div className="mb-4">
                    <label htmlFor='length' className='block text-gray-700 font-bold'>Antal timer:</label>
                    <input type='text' name='hourAmount' className='border-2' defaultValue={1} />
                </div>
                <div className="mb-4">
                    <label htmlFor='length' className='block text-gray-700 font-bold'>antal paller i timen:</label>
                    <input type='text' name='palletAmount' className='border-2' defaultValue={1}/>
                </div>
                <div className="mb-4">
                    <label htmlFor='length' className='block text-gray-700 font-bold'>Gevinst i procent:</label>
                    <input type='text' name='procentExtra' className='border-2' defaultValue={25} />
                </div>
                <div className="mb-4">
                    <label htmlFor='length' className='block text-gray-700 font-bold'>Co2 g/m3:</label>
                    <input type='text' name='co2Price' className='border-2' defaultValue={50} />
                </div>
                <div className="mb-4 justify-center text-center">
                    <input type='submit' value='Beregn' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' />
                    <input value="Gem" onClick={savePrice} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" />
                </div>
            </form>
            <div>
                <h1>Pris pr palle: {onePalletPrice}</h1>
                <h1>Pris for alle paller: {allPalletPrice}</h1>
                <h1>Co2 forbrug: {co2}</h1>
                <h1>m3: {m3}</h1>
            </div>
        </div>
    )
}