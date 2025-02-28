import { EXAMPLE1, EXAMPLE1_NAME, EXAMPLE1_DESCRIPTION } from "./example1";
import { EXAMPLE2, EXAMPLE2_NAME, EXAMPLE2_DESCRIPTION } from "./example2";
import { EXAMPLE3, EXAMPLE3_NAME, EXAMPLE3_DESCRIPTION } from "./example3";
import { EXAMPLE4, EXAMPLE4_NAME, EXAMPLE4_DESCRIPTION } from "./example4";
import { EXAMPLE5, EXAMPLE5_NAME, EXAMPLE5_DESCRIPTION } from "./example5";

export type TemplateInfo = {
  id: string;
  name: string;
  description: string;
  content: string;
};

export const TEMPLATES: TemplateInfo[] = [
  {
    id: "example1",
    name: EXAMPLE1_NAME,
    description: EXAMPLE1_DESCRIPTION,
    content: EXAMPLE1,
  },
  {
    id: "example2",
    name: EXAMPLE2_NAME,
    description: EXAMPLE2_DESCRIPTION,
    content: EXAMPLE2,
  },
  {
    id: "example3",
    name: EXAMPLE3_NAME,
    description: EXAMPLE3_DESCRIPTION,
    content: EXAMPLE3,
  },
  {
    id: "example4",
    name: EXAMPLE4_NAME,
    description: EXAMPLE4_DESCRIPTION,
    content: EXAMPLE4,
  },
  {
    id: "example5",
    name: EXAMPLE5_NAME,
    description: EXAMPLE5_DESCRIPTION,
    content: EXAMPLE5,
  },
];
