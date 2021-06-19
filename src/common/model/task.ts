export interface Task {
  uuid: string;
  label: string;
  priority: number;
  children: string[];
  parents: string[];
  tags: string[];
  createdDate: Date;
  modifiedDate: Date;
}
