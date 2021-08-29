export class Subject {
  constructor(
    public subject_name:string,
    public expanded:boolean,
    public files: {
      title:string,
      href:string
    }){}
}
