require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 578,
    secure: false, // true for 465, false for other ports
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <kuriyamamirai230904@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    // text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.patientName}</h3>
    <p>Ban nhan duoc email nay vi da dat lich kham benh online tren hoi dan it channel</p>
    <p>Thong tin dat lich kham benh:</p>
    <div><b>Thoi gian: ${dataSend.time}</b></div>, 
    <div><b>Bac si: ${dataSend.doctorName}</b></div>
    <p>Neu cac thong tin tren la dung su that, vui long click vao duong link ben duoi de xac nhan va hoan tat thu tuc dat lich kham benh</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
    <div>Xin chan thanh cam on</div>`;
  }

  if (dataSend.language === "en") {
    result = `<h3>Hello ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online consultation on hoi dan it channels</p>
    <p>Medical appointment booking information:</p>
    <div><b>Time: ${dataSend.time}</b></div>,
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is true, please click on the link below to confirm and complete the procedure for booking a medical examination</p>
    <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
    <div>Thank you very much</div>`;
  }

  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<h3>Xin chào ${dataSend.patientName}</h3>
    <p>Ban nhan duoc email nay vi da dat lich kham benh online tren hoi dan it channel</p>
    <p>Prescription/invoice information is sent in the attachment</p>
    <div>Xin chan thanh cam on</div>`;
  } else {
    result = `<h3>Hello ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online consultation on hoi dan it channels</p>
    <p></p>
    <div>Thank you very much</div>`;
  }

  return result;
};

let sendAttachment = (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <kuriyamamirai230904@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        // text: "Hello world?", // plain text body
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64")[1],
            encoding: "base64",
          },
        ],
      });

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  sendSimpleEmail,
  sendAttachment,
};
