export default function ChangePalletPricePopup(params) {
const company = params.company;

const changePrice =  async(event) =>{
    event.preventDefault();
    const data = new FormData(event.target);
    const newPrice = Number(data.get('price'));
    company.pallets.forEach(pallet => {
        pallet.price = (Number(pallet.price) + (Number(pallet.price) * newPrice / 100)).toFixed(4);
    });
    await params.save(company);
    window.location.reload();
}
return(
    <div className="bg-white border-2 border-black p-6 rounded-md text-black text-center">
        <h1 className="font-bold text-2xl">Ændre pris i procent</h1>
        <form onSubmit={changePrice}>
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-bold">Ny pris:</label>
                <div className="flex flex-row justify-end">
                    <input type="text" name="price" className="border-2" />
                    <p className="font-bold">%</p>
                </div>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ændre pris
            </button>
        </form>
    </div>
)

}
