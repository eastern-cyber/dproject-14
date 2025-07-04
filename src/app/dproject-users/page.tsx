'use client';

import React, { useEffect, useState } from 'react';

interface User {
  userId: string;
  referrerId: string;
  email: string;
  name: string;
  tokenId: string;
  userCreated: string;
  planA: {
    dateTime: string;
    POL: number;
  };
}

const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/eastern-cyber/dproject-admin-1.0.2/main/public/dProjectUsers.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch JSON file');
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
        setLoading(false);
      });
  }, []);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    });
  };

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
  const pages = [];
  const maxVisible = 10;
  let start = Math.max(1, currentPage - 5);
  let end = Math.min(totalPages, start + maxVisible - 1);
  for (let i = start; i <= end; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-2 py-1 text-sm border rounded ${
          i === currentPage ? 'bg-gray-300' : 'hover:bg-gray-100'
        }`}
      >
        {i}
      </button>
    );
  }
  return pages; // ✅ THIS LINE
}; // ✅ YOU NEED THIS CLOSING BRACE HERE!

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontWeight: 'bold', margin: '10px' }}>DProject Users</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto', padding: '0 10px' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: '900px', border: '1px solid #ccc', textAlign: 'left' }}>
            <thead>
              <tr>
                <th rowSpan={2} style={{ width: '80px', textAlign: 'right' }}>Token ID</th>
                <th rowSpan={2} style={{ width: '180px', textAlign: 'right' }}>User ID</th>
                <th rowSpan={2} style={{ width: '180px', textAlign: 'right' }}>Referrer ID</th>
                <th rowSpan={2} style={{ width: '250px', textAlign: 'center' }}>Email</th>
                <th rowSpan={2} style={{ width: '150px', textAlign: 'center' }}>Name</th>
                <th rowSpan={2} style={{ width: '180px', textAlign: 'center' }}>User Created</th>
                <th colSpan={2} style={{ width: '80px', textAlign: 'center' }}>Plan A</th>
              </tr>
              <tr>
                <th style={{ width: '100px', textAlign: 'center' }}>Date/Time</th>
                <th style={{ width: '80px', textAlign: 'center' }}>POL</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={index}>
                  <td style={{ width: '80px', textAlign: 'right', margin: '5px' }}>
                    {user.tokenId}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span>{shortenAddress(user.userId)}</span>
                    <button
                      onClick={() => copyToClipboard(user.userId)}
                      title="Copy full address"
                      style={{ marginLeft: '5px', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                    >
                      <img src="/icons/CopyIcon-274.png" alt="Copy" style={{ width: '16px', height: '16px', verticalAlign: 'middle' }} />
                    </button>
                    {copiedAddress === user.userId && <span style={{ color: 'green', marginLeft: '4px' }}>Copied!</span>}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span>{shortenAddress(user.referrerId)}</span>
                    <button
                      onClick={() => copyToClipboard(user.referrerId)}
                      title="Copy full address"
                      style={{ marginLeft: '5px', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                    >
                      <img src="/icons/CopyIcon-274.png" alt="Copy" style={{ width: '16px', height: '16px', verticalAlign: 'middle' }} />
                    </button>
                    {copiedAddress === user.referrerId && <span style={{ color: 'green', marginLeft: '4px' }}>Copied!</span>}
                  </td>
                  <td style={{ textAlign: 'center' }}>{user.email}</td>
                  <td style={{ textAlign: 'center' }}>{user.name}</td>
                  <td  style={{ textAlign: 'center' }}>{user.userCreated}</td>
                  <td style={{ textAlign: 'center' }}>{user.planA.dateTime}</td>
                  <td style={{ textAlign: 'center' }}>{user.planA.POL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>{'|<'}</button>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{'<<'}</button>

          {/* Center Pages */}
          {currentPage > 2 && (
            <>
              <button onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</button>
            </>
          )}
          <button style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{currentPage}</button>
          {currentPage < totalPages - 1 && (
            <>
              <button onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</button>
            </>
          )}

          {/* Ellipsis if there’s a gap */}
          {currentPage < totalPages - 4 && <span>...</span>}

          {/* Last 3 Pages */}
          {Array.from({ length: 3 }).map((_, i) => {
            const page = totalPages - 2 + i;
            if (page > currentPage + 1 && page <= totalPages) {
              return (
                <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
              );
            }
            return null;
          })}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>{'>>'}</button>
          <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>{'>|'}</button>
        </div>
      )}

      <div style={{ marginBottom: '10px', marginTop: '10px' }}>
        <label htmlFor="rowsPerPage">Show&nbsp;</label>
        <select style={{ margin: '10px', padding: '5px', backgroundColor: '#010101' }}
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
        </select>
        &nbsp;rows per page
      </div>

    </div>
  );
};

export default Page;
