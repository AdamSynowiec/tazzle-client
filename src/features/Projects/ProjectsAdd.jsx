import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { useAuth } from "../../context/authContext";

const ProjectsAdd = () => {
  const navigate = useNavigate();
  const { userCredentials } = useAuth(); // aktualny użytkownik
  const [formData, setFormData] = useState({
    projectName: "",
    projectKey: "",
    projectDescription: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useTitle("Tazzle - Dodaj projekt " + (formData?.projectName || ""));

  // Generowanie klucza projektu na podstawie nazwy
  const generateProjectKey = (name) => {
    const words = name.split(" ");
    const key = words.map((word) => word[0]).join("").slice(0, 5);
    return key.toUpperCase();
  };

  useEffect(() => {
    if (formData.projectName) {
      setFormData((prev) => ({
        ...prev,
        projectKey: generateProjectKey(formData.projectName),
      }));
    }
  }, [formData.projectName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.projectKey || !formData.projectDescription) {
      setError("Wszystkie pola oznaczone * są wymagane");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_key: formData.projectKey,
          project_name: formData.projectName,
          project_description: formData.projectDescription,
          project_created_by: userCredentials?.user_id,
          owner_id:userCredentials?.user_id,
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        navigate("/projects"); // przekierowanie do listy projektów
      } else {
        setError(result.message || "Błąd podczas tworzenia projektu");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <header className="col-span-12 flex items-start justify-between mb-6">
        <div className="flex flex-col gap-4">
          <h2 className="font-poppins text-2xl font-normal">Tworzenie projektu</h2>
          <p className="text-xs max-w-xs font-poppins text-slate-700">
            Dodaj szczegóły projektu i potwierdź, aby utworzyć nowy projekt. Edytuj szczegóły projektu w dowolnej chwili w ustawieniach projektu.
          </p>
        </div>
        <button
          className="w-8 h-8 hover:bg-slate-100 rounded-md cursor-pointer"
          onClick={() => navigate("/projects")}
          aria-label="Powrót"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
        </button>
      </header>

      <section className="col-span-12">
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="grid md:grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="projectName" className="block font-poppins text-xs mb-1">
              Nazwa <span className="text-rose-600">*</span>
            </label>
            <input
              id="projectName"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Nazwa projektu"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="projectKey" className="block font-poppins text-xs mb-1">
              Klucz <span className="text-rose-600">*</span>
            </label>
            <input
              id="projectKey"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Klucz projektu"
              value={formData.projectKey}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="projectDescription" className="block font-poppins text-xs mb-1">
              Opis <span className="text-rose-600">*</span>
            </label>
            <input
              id="projectDescription"
              className="w-full border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Opis projektu"
              value={formData.projectDescription}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="hover:bg-slate-50 p-2 rounded-md font-medium"
              onClick={() => navigate("/projects")}
            >
              Anuluj
            </button>
            <button
              type="submit"
              className={`p-2 rounded-md text-white font-medium ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={loading}
            >
              {loading ? "Tworzenie..." : "Utwórz"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProjectsAdd;
