export class Array_inputs {
  constructor(
    public input_label: string,
    public control_name: string,
    public input_type: string,
    public input_value: string,
    public input_validation: string
  ){}
}
export class Array_File_Inputs {
  constructor(
    public file_label: string,
    public file_accept: string,
    public control_name: string,
    public input_value: string,
    public input_validation: string
  ){}
}
export class Array_selects {
  constructor(
    public select_label: string,
    public control_name: string,
    public select_placeholder: string,
    public select_options: Array<{
      id: string;
      value: string;
    }>,
    public input_value: string,
    public input_validation: string
  ){}
}
