export enum RefundPolicy {
  DAY_30 = '30-day',
  DAY_14 = '14-day',
  DAY_7 = '7-day',
  DAY_3 = '3-day',
  DAY_1 = '1-day',
  NO_REFUND = 'no-refund',
}

export const refundPolicyList = [
  {
    value: RefundPolicy.DAY_30,
    label: RefundPolicy.DAY_30.toUpperCase(),
  },
  {
    value: RefundPolicy.DAY_14,
    label: RefundPolicy.DAY_14.toUpperCase(),
  },
  {
    value: RefundPolicy.DAY_7,
    label: RefundPolicy.DAY_7.toUpperCase(),
  },
  {
    value: RefundPolicy.DAY_3,
    label: RefundPolicy.DAY_3.toUpperCase(),
  },
  {
    value: RefundPolicy.DAY_1,
    label: RefundPolicy.DAY_1.toUpperCase(),
  },
  {
    value: RefundPolicy.NO_REFUND,
    label: RefundPolicy.NO_REFUND.toUpperCase(),
  },
];
