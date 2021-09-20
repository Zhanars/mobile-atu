import {ConfigStrings} from "../interfaces/config-strings";
import {SendServiceDataService} from "../services/send-service-data.service";
import {Userdata} from "../interfaces/userdata";

export class Strings {
  static user_id: number;
  static username: string;
  static iin: string;
  static email: string;
  static telephone: string;
  static lang: string = 'ru';
  static sex: number;
  static token_firebase: string;
  static documentText: string;
  static transcriptText: string;
  static schedule_subjectText: string;
  static schedule_examText: string;
  static umkdText: string;
  static homeText: string;
  static QRText: string;
  static QRIONText: string;
  static QRbuttonText: string;
  static authFormText: string;
  static emptyText: string;
  static incorrectText: string;
  static passwordText: string;
  static loginbuttonText: string;
  static createaccountText: string;
  static notificationText: string;
  static profileText: string;
  static reseeIntroText: string;
  static resetpasswordUniverText: string;
  static logoutText: string;
  static changelanguageText: string;
  static registrationText: string;
  static iinText: string;
  static phonenumberText: string;
  static servicesText: string;
  static sendText: string;
  static simpleLoaderText: string;
  static customLoaderText: string;
  static successText: string;
  static errorText: string;
  static errorserverText: string;
  static loadingformText: string;
  static errorloginText: string;
  static sendFormErrorText: string;
  static gotMessageText: string;
  static gotoText: string;
  static hideText: string;
  static successSendFormText: string;

  static setString(x: ConfigStrings) {
    Object.keys(x).forEach(key => {
      Strings[key] = x[key];
    });
  }
  static setUser(x: Userdata) {
    Strings.username = x.username;
    Strings.iin = x.iin;
    Strings.email = x.email;
    Strings.telephone = x.telephone;
    Strings.user_id = x.user_id;
    Strings.sex = x.sex;
    Strings.lang = x.lang;
    Strings.token_firebase = x.token_firebase;
  }

  static deleteUser() {
    Strings.username = '';
    Strings.iin = '';
    Strings.email = '';
    Strings.telephone = '';
    Strings.lang = '';
    Strings.token_firebase = '';
    Strings.user_id = 0;
    Strings.sex = 0;
    return true;
  }
}
