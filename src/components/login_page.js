"use client"

export default function Loginpage(){
    const handleSubmission = async (event) => {
      event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.get("fUserName"),
                password: formData.get("fPassword"),
            }),
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            // window.location.reload();

        } else {
            alert("forkert login");
        }
    };

    return (
        <div>
             <form className="mt-4" onSubmit={handleSubmission}>
              <div className="mb-4">
                <label htmlFor="userId" className="block text-gray-700 font-bold">Brugernavn:</label>
                <input type="text" name="fUserName" className="border-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold">Password:</label>
                <input type="password" name="fPassword" className="border-2" />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Log ind
              </button>
            </form>
        </div>
    )
}