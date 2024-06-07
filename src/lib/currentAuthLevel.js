export const currentAuthLevel = async () => {
  let retry = 0;
  while (retry < 5) {
   const res = await fetchAuthLevel();
    if (res.ok) {
      const data = await res.json();
      return data.user_auth;
      
    } else {
      retry += 1;
    }
  }
  alert("Der er sket en fejl, prøv igen eller kontakt administrator (Auth Error)")
  return 0;

}


const fetchAuthLevel = async () => {  
  const res = await fetch("/api/check-auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
