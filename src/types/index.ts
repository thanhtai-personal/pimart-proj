export type SystemSummary = {};

export type TermDTO = {
  collateralAddress: string;
  collateralTokenId: number;
  collateralNonce: number;
  interest: number;
  principal: number;
  durationSecs: number;
  payableCurrency: string;
  signatureExpiredAt: number;
  signature?: string;
};

export type TransferLoanOferDTO = {
  loanId: number;
  payableCurrency: string;
  payableCurrencyAmount: number;
  expiredAt: number;
  signature?: string;
};
