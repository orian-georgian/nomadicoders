export type Booking = {
  customerName: string;
  pricePerNight: number;
  nights: number;
  includesBreakfast: boolean;
  active: boolean;
};

export type BookingTotalResult = {
  total: number;
  customers: string;
};

