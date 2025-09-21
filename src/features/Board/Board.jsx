import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/ticket");
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
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Header */}
      <header className="col-span-12 flex items-center justify-between mb-6">
        <h2 className="font-poppins text-2xl font-normal">Twoja praca</h2>
        <button
          className="w-8 h-8 hover:bg-slate-100 rounded-md cursor-pointer"
          onClick={() => navigate("/")}
          aria-label="Powrót"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M6 18 17.94 6M18 18 6.06 6"></path></svg>
        </button>
      </header>

      {/* Tickets Section */}
      <section className="col-span-12">
        <h3 className="text-lg font-medium mb-4">Przypisane do mnie</h3>
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.ticket_id}
                className="border-b p-2 cursor-pointer hover:bg-slate-50"
                onClick={() =>
                  navigate(`/browse/${ticket.project_key}-${ticket.ticket_number}`)
                }
              >
                <div className="flex flex-row items-center gap-4">
                  <div className="grid grid-cols-12 w-full">
                    <div className="col-span-1">
                      {/* Koło z pierwszą literą projektu */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-poppins font-semibold">
                        {ticket.project_key?.charAt(0).toUpperCase() || "P"}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="font-poppins text-sm font-semibold">
                        {ticket.project_key}-{ticket.ticket_number}
                      </span>
                    </div>
                    <div className="col-span-7">
                      <span className="font-poppins text-sm font-light text-slate-600">
                        {ticket.ticket_title}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-poppins text-sm font-light text-slate-600">
                        {ticket.priority_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Brak przypisanych zadań.</p>
          )}

        </div>
      </section>
    </div>
  );
};

export default Board;
