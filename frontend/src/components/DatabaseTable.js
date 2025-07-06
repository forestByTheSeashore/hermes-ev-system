// src/components/DatabaseTable.js
import React from 'react';

function DatabaseTable({ records, onEdit, onDelete }) {
  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>
                <button onClick={() => onEdit(record)} style={actionButtonStyle}>编辑</button>
                <button onClick={() => onDelete(record.id)} style={actionButtonStyle}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableContainerStyle = {
  padding: '20px',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const actionButtonStyle = {
  padding: '6px 12px',
  margin: '0 5px',
  backgroundColor: '#FF9800',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default DatabaseTable;
