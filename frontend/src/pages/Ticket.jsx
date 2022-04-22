import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import {
  getNotes,
  createNote,
  reset as notesReset
} from '../features/notes/noteSlice';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';
import Spinner from '../components/Spinner';

/// Custom style for react modal
const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
    position: 'relative'
  }
};

Modal.setAppElement('#root');

const Ticket = () => {
  /// modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  /// Get ticket from global state
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

  /// Change name if duplicate below
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ticketId = params.ticketId;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  /// CLose ticket
  const handleOnClick = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket closed successfully');
    navigate('/tickets');
  };

  /// Open or Close modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date submitted: {new Date(ticket.createdAt).toLocaleString('vi-VN')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {/* Check modal */}
      {ticket.status !== 'closed' && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add note
        </button>
      )}

      {/* Display modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add note"
      >
        {/* body content */}
        <h2>Add note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              cols="30"
              rows="5"
              className="form-control"
              placeholder="Enter note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}

      {ticket.status !== 'closed' && (
        <button onClick={handleOnClick} className="btn btn-block btn-danger">
          Close this ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
