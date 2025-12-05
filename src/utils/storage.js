export const getBookings = () => {
  return JSON.parse(localStorage.getItem("bookings")) || [];
};

export const saveBooking = (booking) => {
  const existing = getBookings();
  existing.push(booking);
  localStorage.setItem("bookings", JSON.stringify(existing));
};

export const deleteBooking = (id) => {
  const existing = getBookings();
  const updated = existing.filter((b) => b.id !== id);
  localStorage.setItem("bookings", JSON.stringify(updated));
};
