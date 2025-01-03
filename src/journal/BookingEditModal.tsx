// src/journal/BookingEditModal.tsx
import React, { useEffect, useState } from "react";
import { BookingModel } from "./BookingModel";
import CustomButton from "../components/CustomButton";
import Headline from "../components/Headline";
import Modal from "../components/Modal";

interface BookingEditModalProps {
  booking: BookingModel | null;
  onClose: () => void;
  onSave: (updatedBooking: BookingModel) => void;
}

const BookingEditModal: React.FC<BookingEditModalProps> = ({
  booking,
  onClose,
  onSave,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (booking) {
      setStartTime(formatDateTime(booking.startTime));
      setEndTime(formatDateTime(booking.endTime || ""));
    }
  }, [booking]);

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  if (!booking) return null;

  const handleSave = () => {
    onSave({ ...booking, startTime, endTime });
  };

  return (
    <Modal isOpen={!!booking}>
      <Headline preset="h2">Edit Booking</Headline>
      <div className="mb-4">
        <label className="block mb-2">Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-400 dark:bg-gray-500 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-400 dark:bg-gray-500 rounded"
        />
      </div>
      <div className="flex justify-end">
        <div className="mr-2">
          <CustomButton preset="secondary" onClick={onClose}>
            Cancel
          </CustomButton>
        </div>
        <CustomButton preset="success" onClick={handleSave}>
          Save
        </CustomButton>
      </div>
    </Modal>
  );
};

export default BookingEditModal;