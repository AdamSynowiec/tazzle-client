import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const statusOptions = {
  Open: ["Open", "In Progress"],
  "In Progress": ["In Progress", "Review", "Blocked", "Reject"],
  Review: ["Review", "Completed", "Reopened"],
  Blocked: ["Blocked", "In Progress"],
  Completed: ["Completed", "Reopened"],
  Reopened: ["Reopened", "In Progress"],
  Reject: ["Reject", "Close"],
  Close: ["Close"]
};

const ProjectBrowse = () => {
  const { id } = useParams();
  const [browse, setBrowse] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [status, setStatus] = useState("Open");
  const [error, setError] = useState(null);

  useEffect(()=>{
    console.log('browse',browse)
  },[browse])

  useEffect(() => {
    const fetchBrowse = async () => {
      try {
        const res = await fetch(`http://localhost:3001/v1/browse/${id}`);
        const result = await res.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          const mappedData = result.data.map(item => ({
            ticketId: item.ticket_id,
            ticketNumber: item.ticket_number,
            ticketTitle: item.ticket_title,
            ticketDescription: item.ticket_description,
            statusName: item.status_name,
            priorityName: item.priority_name,
            projectKey: item.project_key,
            projectName: item.project_name,
            assigneeId: item.assignee_id,
            assigneeName: item.assignee_username, 
            reporterId: item.created_by,
            reporterName: item.reporter_username, 
            createdAt: item.created_at,
            updatedAt: item.updated_at
          }));
          setBrowse(mappedData[0]);
          setStatus(mappedData[0].statusName);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3001/v1/comment/${id}`);
        const result = await res.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          setComments(result.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBrowse();
    fetchComments();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:3001/v1/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: browse.ticketId,
          userId: 1, // dynamicznie zalogowany użytkownik
          commentText: newComment
        })
      });
      const result = await res.json();
      if (result.status === "success") {
        setComments(prev => [...prev, result.data]); // dodaj nowy komentarz
        setNewComment("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!browse) return <>Ładowanie...</>;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <span className="text-blue-600 font-poppins text-xs">
          {browse.projectName} / {browse.projectKey} - {browse.ticketNumber}
        </span>
      </div>
      <div className="col-span-8">
        <h2 className="font-poppins text-2xl font-normal hover:bg-slate-100 rounded-md cursor-pointer">
          {browse.ticketTitle}
        </h2>
      </div>

      <div className="col-span-12 flex gap-2 my-2">
        <select value={status} onChange={handleStatusChange} className="bg-slate-100 p-1 rounded-md border font-poppins text-xs text-slate-600 font-normal">
          {statusOptions["Open"]?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="col-span-8">
        <h3 className="font-poppins font-normal my-4">Opis</h3>
        <p className="font-poppins font-light text-sm hover:bg-slate-100 rounded-md cursor-pointer line-height-4 leading-6">
          {browse.ticketDescription}
        </p>

        <h3 className="font-poppins font-normal my-4">Aktywność</h3>
        <div className="flex items-center gap-4">
          <div className="min-w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-poppins text-sm font-light">AS</div>
          <input
            className="w-full border border-gray-300 p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Dodaj komentarz..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment} className="bg-blue-500 text-white p-1 rounded-md">Dodaj</button>
        </div>

        <div className="mt-6 space-y-4">
          {comments.map((c, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="min-w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-poppins text-sm font-light">
                KP
              </div>
              <div>
                <p className="font-poppins font-medium text-sm text-gray-700">{c.userID}</p>
                <p className="font-poppins font-light text-xs text-gray-500">{c.CreatedAt}</p>
                <p className="font-poppins font-light text-sm mt-2">{c.ticketComments}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-4">
        <div className="grid grid-cols-2 mb-4">
          <span className="font-poppins font-normal text-sm text-gray-700 text-left">Przypisany:</span>
          <span className="font-poppins font-normal text-sm text-gray-700">{browse.assigneeName}</span>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <span className="font-poppins font-normal text-sm text-gray-700 text-left">Zgłaszający:</span>
          <span className="font-poppins font-normal text-sm text-gray-700">{browse.reporterName}</span>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <span className="font-poppins font-normal text-sm text-gray-700 text-left">Utworzono:</span>
          <span className="font-poppins font-normal text-sm text-gray-700">{browse.createdAt}</span>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <span className="font-poppins font-normal text-sm text-gray-700 text-left">Zaktualizowano:</span>
          <span className="font-poppins font-normal text-sm text-gray-700">{browse.updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectBrowse;
