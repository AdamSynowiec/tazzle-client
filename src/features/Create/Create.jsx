import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const Create = () => {
  const navigate = useNavigate();
  useTitle("Tazzle - Create");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    project: null,
    issueType: null,
    priority: null,
    summary: "",
    description: "",
    assignee: null,
    reporter: null,
  });

  // Pobranie projektów
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/projects");
      const result = await response.json();
      if (result.status === "success" && Array.isArray(result.data)) {
        setProjects(result.data);
      } else {
        throw new Error("Unexpected response format (projects)");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Pobranie użytkowników
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/users");
      const result = await response.json();
      if (result.status === "success" && Array.isArray(result.data)) {
        setUsers(result.data);
      } else {
        throw new Error("Unexpected response format (users)");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const issueTypeOptions = [
    { value: "zadanie", label: "Zadanie" },
    { value: "blad", label: "Błąd w programie" },
    { value: "story", label: "Story" },
    { value: "epik", label: "Epik" },
  ];

  const prioTypeOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Walidacja wymaganych pól
    if (!formData.project || !formData.issueType || !formData.priority || !formData.summary || !formData.description || !formData.assignee || !formData.reporter) {
      setError("Wszystkie pola oznaczone * są wymagane");
      return;
    }

    const ticketData = {
      project: formData.project.value,
      issueType: formData.issueType.value,
      priority: formData.priority.value,
      summary: formData.summary,
      description: formData.description,
      assignee: formData.assignee.value,
      reporter: formData.reporter.value,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/v1/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });

      const result = await response.json();
      if (result.status === "success") {
        navigate("/"); // Redirect po sukcesie
      } else {
        throw new Error(result.message || "Wystąpił błąd");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Nagłówek */}
      <header className="col-span-12 flex items-center justify-between mb-6">
        <h2 className="font-poppins text-2xl font-normal">Utwórz zgłoszenie</h2>
        <button
          className="w-8 h-8 hover:bg-slate-100 rounded-md cursor-pointer"
          onClick={() => navigate("/")}
          aria-label="Powrót"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><path d="M6 18 17.94 6M18 18 6.06 6"></path></svg>
        </button>
      </header>

      <section className="col-span-12">
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form className="grid md:grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-poppins text-xs mb-1">
              Projekt <span className="text-rose-600">*</span>
            </label>
            <Select
              options={projects.map((p) => ({ value: p.project_id, label: p.project_name }))}
              value={formData.project}
              onChange={(selected) => setFormData({ ...formData, project: selected })}
            />
          </div>

          <div>
            <label className="block font-poppins text-xs mb-1">
              Typ zgłoszenia <span className="text-rose-600">*</span>
            </label>
            <Select
              options={issueTypeOptions}
              value={formData.issueType}
              onChange={(selected) => setFormData({ ...formData, issueType: selected })}
            />
          </div>

          <div>
            <label className="block font-poppins text-xs mb-1">
              Priorytet <span className="text-rose-600">*</span>
            </label>
            <Select
              options={prioTypeOptions}
              value={formData.priority}
              onChange={(selected) => setFormData({ ...formData, priority: selected })}
            />
          </div>

          <div>
            <label className="block font-poppins text-xs mb-1">
              Podsumowanie <span className="text-rose-600">*</span>
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              type="text"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-poppins text-xs mb-1">
              Opis <span className="text-rose-600">*</span>
            </label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md min-h-64"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block font-poppins text-xs mb-1">
              Osoba przypisana <span className="text-rose-600">*</span>
            </label>
            <Select
              options={users.map((u) => ({ value: u.user_id, label: u.username }))}
              value={formData.assignee}
              onChange={(selected) => setFormData({ ...formData, assignee: selected })}
            />
          </div>

          <div>
            <label className="block font-poppins text-xs mb-1">
              Osoba zgłaszająca <span className="text-rose-600">*</span>
            </label>
            <Select
              options={users.map((u) => ({ value: u.user_id, label: u.username }))}
              value={formData.reporter}
              onChange={(selected) => setFormData({ ...formData, reporter: selected })}
            />
          </div>

          <div className="flex gap-4 mt-2">
            <button
              type="button"
              className="hover:bg-slate-50 p-2 rounded-md"
              onClick={() => navigate("/")}
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="hover:bg-blue-600 p-2 rounded-md bg-blue-500 text-white"
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

export default Create;
