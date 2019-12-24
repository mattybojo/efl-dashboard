import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export class MenuItem {
  label: string;
  link: string;
  queryParams?: Record<string, string>;
  icon: IconDefinition;
}
