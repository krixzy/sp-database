"use client"

import { useEffect, useState } from "react";

export default function Home() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const auth = async () => {
      await fetchData();
      setLoaded(true);
    }
    auth();

  }, []);
    while (!loaded) {
      return <h1 className="text-center">Loading...</h1>;
    }
  return (
    <div>
      <h1 className="text-center">Welcome to the SP database</h1>
    </div>
  );
}




const fetchData = async () => {
  const res = await fetch("/api/check-auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
}
