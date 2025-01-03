import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { fetchMembers, deleteMember } from "../services/api";
import EditMemberModal from "./EditMemberModal";
import AddMemberModal from "./AddMemberModal";

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageLimit, setPageLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const response = await fetchMembers();
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteMember(id);
        Swal.fire("Deleted!", "Member has been deleted.", "success");
        loadMembers();
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.age.toString().includes(searchTerm) ||
      member.parent_id.toString().includes(searchTerm)
  );

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageLimit,
    currentPage * pageLimit
  );

  const columns = [
    { name: "ID", selector: (row) => row._id, sortable: true },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => <span style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)}>{row.name}</span>,
    },
    { name: "Email", selector: (row) => row.Email, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    { name: "Parent ID", selector: (row) => row.parent_id, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-5">Members List</h2>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="form-control d-inline-block me-2"
            style={{ width: "200px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-select d-inline-block"
            style={{ width: "100px" }}
            value={pageLimit}
            onChange={(e) => {
              setPageLimit(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
          >
            {[5, 10, 15, 20].map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
        >
          Add Member
        </button>
      </div>
      <DataTable
        columns={columns}
        data={paginatedMembers}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={filteredMembers.length}
        paginationPerPage={pageLimit}
        onChangePage={(page) => setCurrentPage(page)}
      />
      {showAddModal && (
        <AddMemberModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          reload={loadMembers}
        />
      )}
      {showEditModal && (
        <EditMemberModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          member={selectedMember}
          reload={loadMembers}
        />
      )}
    </div>
  );
};

export default MembersList;
