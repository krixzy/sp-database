export const currentAuthLevel = async () => {
  const res = await fetch("/api/check-auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.user_auth;
}
