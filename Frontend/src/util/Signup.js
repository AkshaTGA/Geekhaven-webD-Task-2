const signup = async (user) => {
  const data = await fetch("http://localhost:3001/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    }),
  });

  return await data.json();
};




export default signup;