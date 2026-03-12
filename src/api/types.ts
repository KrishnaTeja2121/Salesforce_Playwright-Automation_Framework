export type SalesforceOAuthResponse = {
  access_token: string;
  instance_url: string;
};

export type SalesforceLeadPayload = {
  FirstName: string;
  LastName: string;
  Company: string;
  Email: string;
};

export type SalesforceCreateResponse = {
  id: string;
  success: boolean;
  errors: string[];
};

export type SalesforceQueryResponse<TRecord> = {
  totalSize: number;
  done: boolean;
  records: TRecord[];
};

export type LeadQueryRecord = {
  Id: string;
  FirstName?: string;
  LastName?: string;
  Company?: string;
  Status?: string;
  IsConverted?: boolean;
  ConvertedOpportunityId?: string | null;
};

export type OpportunityQueryRecord = {
  Id: string;
  Name: string;
};
