import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Board = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const { userCredentials } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/v1/ticket?userId=${userCredentials.user_id}`
        );
        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          setTickets(result.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTickets();
  }, [userCredentials.user_id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Nowy":
        return "bg-red-500 text-white";
      case "W trakcie":
        return "bg-blue-500 text-white";
      case "Zakończony":
        return "bg-green-500 text-white";
      default:
        return "";
    }
  };

  // Funkcja do kolorowania kółka na podstawie pierwszej litery
  const getColorByLetter = (letter) => {
    const colors = [
      "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
      "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
      "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
      "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#FFCDD2",
      "#F8BBD0", "#E1BEE7", "#D1C4E9", "#C5CAE9", "#BBDEFB", "#B2DFDB"
    ];
    if (!letter) return "#000";
    const charCode = letter.toUpperCase().charCodeAt(0);
    const index = (charCode - 65) % colors.length;
    return colors[index];
  };

  return (
    <div className="grid grid-cols-12 gap-6 p-4">
      {/* Header */}
      <header className="col-span-12 flex items-center justify-between mb-6">
        <h2 className="font-poppins text-2xl font-semibold">Twoja praca</h2>
        <button
          className="w-10 h-10 hover:bg-slate-100 rounded-md flex items-center justify-center"
          onClick={() => navigate("/")}
          aria-label="Powrót"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M6 18 17.94 6M18 18 6.06 6"></path>
          </svg>
        </button>
      </header>

      {/* Tickets Section */}
      <section className="col-span-12">
        <h3 className="text-lg font-medium mb-4">Przypisane do mnie</h3>
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <div className="min-w-full bg-white shadow-md rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-4 border-b bg-slate-50 rounded-t-lg">
              <span className="font-poppins text-sm font-semibold">Projekt</span>
              <span className="font-poppins text-sm font-semibold">Status</span>
              <span className="font-poppins text-sm font-semibold">Opis</span>
              <span className="font-poppins text-sm font-semibold">Priorytet</span>
            </div>

            {/* Table Rows */}
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div
                  key={ticket.ticket_id}
                  className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-slate-50 cursor-pointer transition-colors flex items-center"
                  onClick={() =>
                    navigate(`/browse/${ticket.project_key}-${ticket.ticket_number}`)
                  }
                >
                  {/* Projekt */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-poppins font-semibold"
                      style={{ backgroundColor: getColorByLetter(ticket.project_key?.charAt(0)) }}
                    >
                      {ticket.project_key?.charAt(0).toUpperCase() || "P"}
                    </div>
                    <span className="font-poppins text-sm font-semibold">
                      {ticket.project_key}-{ticket.ticket_number}
                    </span>
                  </div>

                  {/* Status */}
                  <span className="font-poppins text-sm font-light text-slate-600">
                    <span
                      className={`d-block py-1 px-2 rounded-full text-xs ${getStatusColor(
                        ticket.status_name
                      )}`}
                    >
                      {ticket.status_name}
                    </span>
                  </span>

                  {/* Opis */}
                  <span className="font-poppins text-sm font-light text-slate-600">
                    {ticket.ticket_title}
                  </span>

                  {/* Priorytet */}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold`}>
                    {ticket.priority_name}
                  </span>
                </div>
              ))
            ) : (
              <p className="p-4 text-slate-500">Brak przypisanych zadań.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Board;
