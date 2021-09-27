import {ConfigStrings} from "../interfaces/config-strings";
import {Userdata} from "../interfaces/userdata";

export class Strings {
  static user_id: string;
  static username: string;
  static iin: string;
  static email: string;
  static telephone: string;
  static user_lang: string = 'ru';
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
  static authFormText: string = 'Форма авторизации';
  static emptyText: string = 'пустое';
  static incorrectText: string = 'некорректное';
  static passwordText: string = 'Пароль';
  static loginbuttonText: string = 'Войти';
  static createaccountText: string = 'Создать аккаунт';
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
  static simpleLoaderText: string = 'Загрузка';
  static customLoaderText: string = 'Загрузка данных';
  static successText: string = 'Удачно';
  static errorText: string = 'Ошибка';
  static errorserverText: string = 'Сервер недоступен, попробуйте позже';
  static loadingformText: string = 'Загрузка формы';
  static errorloginText: string = 'Email или пароль не правильный';
  static sendFormErrorText: string;
  static gotMessageText: string;
  static gotoText: string;
  static hideText: string;
  static successSendFormText: string = 'Заявка отправлена на рассмотрение';
  static contactSupportText: string;
  static confirmationText: string;
  static confirmResetUniverText: string;
  static noText: string;
  static yesText: string;
  static writeProblemText: string;
  static cancelText: string = 'Отмена';
  static tryitlaterText: string = 'Услуга в стадии разработки, попробуйте позже';
  static resetPasswordMobileText: string = 'Восстановить пароль';
  static incorrectIINText: string = 'Не корректный ИИН, попробуйте ввести заново';
  static warningText: string = 'Внимание';
  static enterIINandOkText: string = 'Для сброса пароля введите свой ИИН и нажмите ОК';

  static setString(x: ConfigStrings) {
    Object.keys(x).forEach(key => {
      Strings[key] = x[key];
    });
  }
  static setUser(x: Userdata) {
    Object.keys(x).forEach(key => {
      Strings[key] = x[key];
    });
  }
  static deleteUser() {
    Strings.username = '';
    Strings.iin = '';
    Strings.email = '';
    Strings.telephone = '';
    Strings.user_lang = 'ru';
    Strings.token_firebase = '';
    Strings.user_id = '0';
    Strings.sex = 0;
  }
}
