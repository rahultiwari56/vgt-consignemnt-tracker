import mongoose from "mongoose";

const FormDataSchema = new mongoose.Schema({
  demurrageChargeable: String,
  daysFromToday: String,
  insuranceCompany: String,
  policyNo: String,
  date: String,
  amount: String,
  risk: String,
  addressOfDeliveryOffice: String,
  uniqueNumber: String,
  uniqueDate: String,
  consignorNameAddress: String,
  consigneeNameAddress: String,
  from: String,
  to: String,
  packages: String,
  description: String,
  weightActual: String,
  weightCharged: String,
  rate: String,
  amountToPayasRs: String,
  amountToPayasP: String,
  totalAmountasRs: String,
  totalAmountasP: String,
  ewayBillNo: String,
  validUpto: String,
  addressOfIssuingOffice: String,
  truckNo: String,
  gstNoConsignor: String,
  gstNoConsignee: String,
  gstPayable: String,
  value: String,
});

export default mongoose.models.transportReceipts ||
  mongoose.model("transportReceipts", FormDataSchema);
