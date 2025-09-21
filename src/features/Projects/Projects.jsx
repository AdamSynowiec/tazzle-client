import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const Projects = () => {
  const navigate = useNavigate();
  useTitle("Tazzle - Projekty");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/projects");
        if (!response.ok) {
          throw new Error("Błąd pobierania projektów");
        }

        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          setProjects(result.data);
        } else {
          throw new Error(result.message || "Unexpected response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-poppins text-2xl font-normal">Projekty</h2>
          <svg
            className="w-8 h-8 hover:bg-slate-100 rounded-md cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => navigate("/")}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
      </div>

      <div className="col-span-12">
        <h3 className="text-lg font-medium mb-4">Moje projekty</h3>
        <div className="flex flex-col">
          {loading ? (
            "Ładowanie..."
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.project_id}
                className="border-b p-2 cursor-pointer hover:bg-slate-50"
              >
                <div className="flex flex-row items-center gap-4">
                  {/* Ikona projektu jako koło z literą */}
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-poppins font-semibold">
                    {project.project_key ? project.project_key.charAt(0).toUpperCase() : "P"}
                  </div>

                  <div>
                    <h4 className="font-poppins text-sm font-semibold">
                      {project.project_name}
                    </h4>
                    <p className="font-poppins text-sm font-light text-slate-600">
                      {project.project_description || "Brak opisu"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nie masz jeszcze żadnych projektów.</p>
          )}
        </div>
      </div>

      <div className="col-span-12">
        <h3 className="text-lg font-medium mb-4">Utwórz nowy projekt</h3>
        <div className="flex">
          <Link
            className="block hover:bg-blue-600 p-2 rounded-md cursor-pointer bg-blue-500 text-white font-medium"
            to="/projects/add"
          >
            Utwórz projekt
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
