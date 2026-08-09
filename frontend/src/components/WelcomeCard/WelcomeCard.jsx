function WelcomeCard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name || "Developer";

  const today = new Date();

  const date = today.toLocaleDateString("en-PK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 shadow-lg">

      <h1 className="text-4xl font-bold">

        Welcome, {userName} 👋

      </h1>

      <p className="mt-3 text-blue-100">

        Stay focused and complete your tasks on time.

      </p>

      <p className="mt-5">

        📅 {date}

      </p>

    </div>

  );

}

export default WelcomeCard;