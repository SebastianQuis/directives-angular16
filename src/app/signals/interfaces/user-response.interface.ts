export interface UserReponse {
  data: User;
  support: Support;
  _meta: Meta;
}

export interface Meta {
  powered_by: string;
  docs_url: string;
  upgrade_url: string;
  example_url: string;
  variant: string;
  message: string;
  cta: Cta;
  context: string;
}

export interface Cta {
  label: string;
  url: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}
