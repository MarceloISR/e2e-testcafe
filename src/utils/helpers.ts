import { InitAPI } from "./initializer";


export interface iUserCredentials {
  user? : string,
  password? : string,
  database? : string,
  warehouse? : string,
  version? : string,
  port? : string, 
  license? : string,
  url? :string,
  authorization? : string,
  type? : CredentialType,
  language? : CredentialLanguage
}

// export enum credentialProperties {
//   user = "User",
//   Password = "Password",
//   Database = "Database",
//   Warehouse = "Warehouse",
//   Version = "Version",
//   Port = "Port", 
//   License = "License",
//   Url = "Url",
//   Authorization ="Authorization",
//   Type = "Type",
//   Language = "Language"
// } 

export enum CredentialLanguage {
  English= "1",
  Espanol= "2"
}

export enum CredentialType {
  UI = "UI",
  RF = "RF",
  API = "API"
}

export enum StringOptions {
  contains = 1,
  equal = 2,
}

export enum Keys {
  ESC = '\u001b',
  SPACE = '\u0020',
  ENTER = '\u000D',
  TAB = '\u0009',
  BACKSPACE = '\u0008',
  DELETE = '\u007F'
}

export const setPrefix = (text: string) => {
  const now = new Date();
  return `${now.getMonth()}${now.getDay()}${now.getFullYear().toString().substring(1, 3)}`;

}

interface UniqueValueProps {
  suffix?: boolean,
  text?: string,
  separator?: string,
} 

//export const UniqueValue = (text: string="", suffix: boolean = true, separator: string='') => {
/**
* @example UniqueValue( {text: 'text1', suffix: true, separator: '-'} )
* @argument text is mandatory
* @argument suffix is optional, true=generated text will be suffix; false=generated text will be postfix
* @argument separator separator are optional, separate the mandatory text from the suffix/postfix
*/
export const UniqueValue = (props?: UniqueValueProps) => {
  const now = new Date();
  let output : string = "";
  const uniqueVal = `${now.getMonth()}${now.getDay()}${now.getFullYear().toString().substring(1, 3)}${now.getMilliseconds()}`;
  if(props)
  {
    if(props.suffix){
      output = `${uniqueVal}${props.separator??''}${props.text}`;
    }else{
      output = `${props.text}${props.separator?? ''}${uniqueVal}`;
    }
  }else{
    output = uniqueVal;
  }
  
  return output

}

