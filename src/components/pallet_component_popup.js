export default function PalletComponentPopup (params) {
    const addFunction = params.addFunction;
    const type = params.type;

    return (
        <div className="bg-white border-2 border-black p-4">
            <h1 className="text-center text-2xl font-bold">Tilføj {type}</h1>
            <form onSubmit={addFunction}>
                <div className="mb-4">
                    <label htmlFor='amount' className='block text-gray-700 font-bold'>Antal:</label>
                    <input type='text' name='amount' className='border-2' />
                </div>
                <div className="mb-4">
                    <label htmlFor='length' className='block text-gray-700 font-bold'>Længde:</label>
                    <input type='text' name='length' className='border-2' />
                </div>
                <div className="mb-4">
                    <label htmlFor='width' className='block text-gray-700 font-bold'>Bredde:</label>
                    <input type='text' name='width' className='border-2' />
                </div>
                <div className="mb-4">
                    <label htmlFor='height' className='block text-gray-700 font-bold'>Højde:</label>
                    <input type='text' name='height' className='border-2' />
                </div>
                <div className="mb-4">
                    <label htmlFor='price' className='block text-gray-700 font-bold'>price pr m3</label>
                    <input type='text' name='price' className='border-2' />    
                </div>
                <div className="mb-4 justify-center text-center">
                    <input type='submit' value='Tilføj' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' />
                </div>
            </form>
        </div>
    )
};