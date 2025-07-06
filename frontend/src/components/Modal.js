// src/components/Modal.js
import React, { useState } from 'react';

function Modal({ isOpen, onClose, onSave, record }) {
  const [name, setName] = useState(record ? record.name : '');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({ ...record, name });
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>{record ? '编辑记录' : '添加记录'}</h2>
        <input
          type="text"
          placeholder="输入名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSubmit} style={saveButtonStyle}>
          保存
        </button>
        <button onClick={onClose} style={cancelButtonStyle}>
          关闭
        </button>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  width: '300px',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '10px 0',
};

const saveButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const cancelButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px',
};

export default Modal;
